import { SimpleScraper } from './simple-scraper.js';

async function main() {
  const scraper = new SimpleScraper({
    timeout: 10000,
  });

  const targetUrl = 'https://example.com';
  
  try {
    console.log(`Starting scrape of: ${targetUrl}...`);
    const result = await scraper.scrape(targetUrl);
    
    console.log('\n--- Scrape Result ---');
    console.log(`Title: ${result.title}`);
    console.log(`URL: ${result.url}`);
    console.log(`Timestamp: ${result.timestamp}`);
    console.log('\nLinks found:');
    console.table(result.data.links);
    
  } catch (error) {
    console.error('Error during scraping:', error instanceof Error ? error.message : error);
  }
}

main();
