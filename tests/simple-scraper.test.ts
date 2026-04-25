import { describe, it, expect, vi } from 'vitest';
import { SimpleScraper } from '../src/simple-scraper.js';

describe('SimpleScraper', () => {
  it('should extract title and links correctly', async () => {
    const scraper = new SimpleScraper();
    
    // Mock del HTML para evitar llamadas reales a red
    const mockHtml = `
      <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="Test Description">
        </head>
        <body>
          <a href="https://link1.com">Link 1</a>
          <a href="https://link2.com">Link 2</a>
        </body>
      </html>
    `;

    // Espiamos el fetchHtml del httpClient interno
    vi.spyOn((scraper as any).httpClient, 'fetchHtml').mockResolvedValue(mockHtml);

    const result = await scraper.scrape('https://fake-url.com');

    expect(result.title).toBe('Test Page');
    expect(result.data.meta.description).toBe('Test Description');
    expect(result.data.links).toHaveLength(2);
    expect(result.data.links[0]).toEqual({ text: 'Link 1', href: 'https://link1.com' });
  });

  it('should handle pages with no links', async () => {
    const scraper = new SimpleScraper();
    const mockHtml = '<html><head><title>No Links</title></head><body></body></html>';
    
    vi.spyOn((scraper as any).httpClient, 'fetchHtml').mockResolvedValue(mockHtml);

    const result = await scraper.scrape('https://fake-url.com');

    expect(result.title).toBe('No Links');
    expect(result.data.links).toHaveLength(0);
  });
});
