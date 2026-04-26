import * as cheerio from 'cheerio';
import { HttpClient } from './http-client.js';
import { RobotsService } from './robots-service.js';
import { UserAgentService } from './user-agent-service.js';
import type { ScrapeResult, ScraperOptions } from './types.js';

/**
 * Base abstract class for all scrapers.
 * Provides common functionality for fetching HTML and respecting robots.txt.
 */
export abstract class BaseScraper {
  protected httpClient: HttpClient;
  protected robotsService: RobotsService;
  protected userAgentService: UserAgentService;
  protected options: ScraperOptions;

  /**
   * @param options - Configuration options for the scraper.
   */
  constructor(options?: ScraperOptions) {
    this.options = options || {};
    this.httpClient = new HttpClient(this.options);
    this.robotsService = new RobotsService(this.httpClient);
    this.userAgentService = new UserAgentService();
  }

  /**
   * Main method to scrape a URL.
   * @param url - The URL to scrape.
   * @returns A promise that resolves to the scrape result.
   * @throws Error if robots.txt disallows scraping or if fetching fails.
   */
  async scrape(url: string): Promise<ScrapeResult> {
    const userAgent = this.options.userAgent || 
                     this.options.headers?.['User-Agent'] || 
                     this.userAgentService.getRandom();

    if (this.options.respectRobotsTxt) {
      const allowed = await this.robotsService.isAllowed(url, userAgent);
      if (!allowed) {
        throw new Error(`Scraping disallowed by robots.txt for URL: ${url}`);
      }
    }

    const html = await this.httpClient.fetchHtml(url, { 'User-Agent': userAgent });
    const $ = cheerio.load(html);
    
    return {
      title: this.extractTitle($),
      url,
      data: this.extractData($),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Extracts the page title from the HTML.
   * @param $ - Cheerio instance of the loaded HTML.
   * @returns The page title or "No title" if not found.
   */
  protected extractTitle($: cheerio.CheerioAPI): string {
    return $('title').text().trim() || 'No title';
  }

  /**
   * Abstract method to extract specific data from the HTML.
   * Must be implemented by concrete scraper classes.
   * @param $ - Cheerio instance of the loaded HTML.
   * @returns The extracted data.
   */
  protected abstract extractData($: cheerio.CheerioAPI): any;
}
