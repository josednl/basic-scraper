export interface ScrapeResult {
  title: string;
  url: string;
  data: any;
  timestamp: string;
}

export interface ScraperOptions {
  timeout?: number;
  headers?: Record<string, string>;
  respectRobotsTxt?: boolean;
  userAgent?: string;
}
