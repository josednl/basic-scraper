import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import type { ScraperOptions } from './types.js';

/**
 * Service to handle JavaScript rendering using Playwright.
 */
export class BrowserService {
  private browser: Browser | null = null;

  /**
   * Fetches the rendered HTML content of a given URL.
   * @param url - The URL to fetch.
   * @param options - Scraper options including user agent and timeout.
   * @returns The rendered HTML content.
   */
  async fetchRenderedHtml(url: string, options: ScraperOptions): Promise<string> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
    }

    const contextOptions: any = {
      viewport: { width: 1280, height: 720 }
    };

    if (options.userAgent) contextOptions.userAgent = options.userAgent;
    if (options.headers) contextOptions.extraHTTPHeaders = options.headers;

    const context = await this.browser.newContext(contextOptions);

    const page: Page = await context.newPage();
    
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle', 
        timeout: options.timeout || 30000 
      });
      
      return await page.content();
    } finally {
      await context.close();
    }
  }

  /**
   * Closes the browser instance.
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
