import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SimpleScraper } from '../src/simple-scraper.js';
import { HttpClient } from '../src/http-client.js';
import { z } from 'zod';

vi.mock('../src/http-client.js');

describe('Schema Validation', () => {
  let scraper: SimpleScraper;
  const mockHtml = `
    <html>
      <head><title>Test Page</title></head>
      <body>
        <a href="https://example.com">Example</a>
        <meta name="description" content="Test description">
      </body>
    </html>
  `;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should pass validation when data matches schema', async () => {
    const schema = z.object({
      links: z.array(z.object({
        text: z.string(),
        href: z.string()
      })),
      meta: z.object({
        description: z.string().optional(),
        keywords: z.string().optional()
      })
    });

    scraper = new SimpleScraper({ schema });
    vi.spyOn((scraper as any).httpClient, 'fetchHtml').mockResolvedValue(mockHtml);
    
    const result = await scraper.scrape('https://example.com');

    expect(result.data.links[0].text).toBe('Example');
    expect(result.data.meta.description).toBe('Test description');
  });

  it('should throw error when validation fails', async () => {
    const schema = z.object({
      links: z.array(z.object({
        text: z.string(),
        href: z.string().url()
      })),
      requiredField: z.string()
    });

    scraper = new SimpleScraper({ schema });
    vi.spyOn((scraper as any).httpClient, 'fetchHtml').mockResolvedValue(mockHtml);
    
    await expect(scraper.scrape('https://example.com')).rejects.toThrow('Schema validation failed');
  });

  it('should transform data using zod transform', async () => {
    const schema = z.object({
      links: z.array(z.any()).transform(links => links.length),
      meta: z.any()
    });

    scraper = new SimpleScraper({ schema });
    vi.spyOn((scraper as any).httpClient, 'fetchHtml').mockResolvedValue(mockHtml);
    
    const result = await scraper.scrape('https://example.com');

    expect(result.data.links).toBe(1);
  });
});
