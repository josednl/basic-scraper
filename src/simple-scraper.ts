import * as cheerio from 'cheerio';
import { BaseScraper } from './base-scraper.js';

/**
 * A simple implementation of a scraper that extracts links and meta information.
 */
export class SimpleScraper extends BaseScraper {
  /**
   * Extracts links and meta tags from the HTML.
   * @param $ - Cheerio instance of the loaded HTML.
   * @returns An object containing extracted links and meta data.
   */
  protected extractData($: cheerio.CheerioAPI): any {
    const links: { text: string; href: string | undefined }[] = [];
    
    $('a').each((_, element) => {
      const $el = $(element);
      links.push({
        text: $el.text().trim(),
        href: $el.attr('href'),
      });
    });

    return {
      links: links.filter(link => link.text && link.href),
      meta: {
        description: $('meta[name="description"]').attr('content'),
        keywords: $('meta[name="keywords"]').attr('content'),
      }
    };
  }
}
