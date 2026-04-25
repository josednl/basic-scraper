import { SimpleScraper } from './simple-scraper.js';

async function main() {
  const urlArg = process.argv[2];

  if (!urlArg) {
    console.error('Usage: npm start -- <url>');
    process.exit(1);
  }

  const scraper = new SimpleScraper({
    timeout: 10000,
    respectRobotsTxt: true,
  });

  try {
    console.log(`Starting scrape of: ${urlArg}...`);
    const result = await scraper.scrape(urlArg);
    
    console.log('\n--- Scrape Result ---');
    console.log(`Title: ${result.title}`);
    console.log(`URL: ${result.url}`);
    console.log(`Timestamp: ${result.timestamp}`);
    
    if (result.data.links && result.data.links.length > 0) {
      console.log('\nLinks found (first 10):');
      console.table(result.data.links.slice(0, 10));
    } else {
      console.log('\nNo links found.');
    }
    
  } catch (error) {
    console.error('Error during scraping:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
