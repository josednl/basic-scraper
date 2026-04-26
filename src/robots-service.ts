import robotsParser from 'robots-parser';
import { HttpClient } from './http-client.js';

/**
 * Service to handle and cache robots.txt rules.
 */
export class RobotsService {
  private cache: Map<string, any> = new Map();
  private httpClient: HttpClient;

  /**
   * @param httpClient - The HTTP client to use for fetching robots.txt files.
   */
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Checks if a URL is allowed to be crawled according to its robots.txt rules.
   * @param url - The URL to check.
   * @param userAgent - The user agent to check against.
   * @returns A promise that resolves to true if allowed, false otherwise.
   */
  async isAllowed(url: string, userAgent: string): Promise<boolean> {
    const parsedUrl = new URL(url);
    const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.host}/robots.txt`;

    let robots = this.cache.get(robotsUrl);

    if (!robots) {
      try {
        const robotsTxt = await this.httpClient.fetchHtml(robotsUrl);
        robots = (robotsParser as any)(robotsUrl, robotsTxt);
        this.cache.set(robotsUrl, robots);
      } catch (error) {
        // If robots.txt is not found or fails, we assume it's allowed
        return true;
      }
    }

    return robots.isAllowed(url, userAgent) ?? true;
  }
}
