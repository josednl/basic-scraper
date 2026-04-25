import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ScraperOptions } from './types.js';

export class HttpClient {
  private client: AxiosInstance;

  constructor(options?: ScraperOptions) {
    this.client = axios.create({
      timeout: options?.timeout || 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ...options?.headers,
      },
    });
  }

  async fetchHtml(url: string): Promise<string> {
    try {
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch HTML from ${url}: ${error.message}`);
      }
      throw error;
    }
  }
}
