import * as cheerio from 'cheerio';
import { HttpClient } from './http-client.js';
import type { ScrapeResult, ScraperOptions } from './types.js';

export abstract class BaseScraper {
  protected httpClient: HttpClient;

  constructor(options?: ScraperOptions) {
    this.httpClient = new HttpClient(options);
  }

  async scrape(url: string): Promise<ScrapeResult> {
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
