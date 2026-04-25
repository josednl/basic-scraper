import robotsParser from 'robots-parser';
import { HttpClient } from './http-client.js';

export class RobotsService {
  private cache: Map<string, any> = new Map();
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

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
