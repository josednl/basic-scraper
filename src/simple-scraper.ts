import * as cheerio from 'cheerio';
import { BaseScraper } from './base-scraper.js';

export class SimpleScraper extends BaseScraper {
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
