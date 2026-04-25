import * as cheerio from 'cheerio';
import { HttpClient } from './http-client.js';
import { RobotsService } from './robots-service.js';
import type { ScrapeResult, ScraperOptions } from './types.js';

export abstract class BaseScraper {
  protected httpClient: HttpClient;
  protected robotsService: RobotsService;
  protected options: ScraperOptions;
  protected defaultUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  constructor(options?: ScraperOptions) {
    this.options = options || {};
    this.httpClient = new HttpClient(this.options);
    this.robotsService = new RobotsService(this.httpClient);
  }

  async scrape(url: string): Promise<ScrapeResult> {
    if (this.options.respectRobotsTxt) {
      const userAgent = this.options.userAgent || this.options.headers?.['User-Agent'] || this.defaultUserAgent;
      const allowed = await this.robotsService.isAllowed(url, userAgent);
      if (!allowed) {
        throw new Error(`Scraping disallowed by robots.txt for URL: ${url}`);
      }
    }

    const html = await this.httpClient.fetchHtml(url);
    const $ = cheerio.load(html);
    
    return {
      title: this.extractTitle($),
      url,
      data: this.extractData($),
      timestamp: new Date().toISOString(),
    };
  }

  protected extractTitle($: cheerio.CheerioAPI): string {
    return $('title').text().trim() || 'No title';
  }

  protected abstract extractData($: cheerio.CheerioAPI): any;
}
