import type { z } from 'zod';

/**
 * Represents the result of a scraping operation.
 */
export interface ScrapeResult<T = any> {
  /** The title of the page. */
  title: string;
  /** The URL of the scraped page. */
  url: string;
  /** The extracted data from the page. */
  data: T;
  /** ISO timestamp of when the scraping occurred. */
  timestamp: string;
}

/**
 * Configuration options for the scraper.
 */
export interface ScraperOptions<T = any> {
  /** Request timeout in milliseconds. Defaults to 10000. */
  timeout?: number;
  /** Custom HTTP headers for requests. */
  headers?: Record<string, string>;
  /** Whether to respect robots.txt rules. */
  respectRobotsTxt?: boolean;
  /** User-Agent string to use for requests. */
  userAgent?: string;
  /** Whether to render JavaScript using a headless browser. */
  renderJs?: boolean;
  /** Zod schema to validate the extracted data. */
  schema?: z.ZodSchema<T>;
}
