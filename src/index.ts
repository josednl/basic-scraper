/**
 * Main entry point for the basic scraper CLI.
 */
import { SimpleScraper } from './simple-scraper.js';

/**
 * Entry point function that parses arguments and executes the scraper.
 */
async function main() {
  const args = process.argv.slice(2);
  const urlArg = args.find(arg => arg.startsWith('http'));
  const renderJs = args.includes('--render-js');

  if (!urlArg) {
    console.error('Usage: npm start -- <url> [--render-js]');
    process.exit(1);
  }

  const scraper = new SimpleScraper({
    timeout: 15000,
    respectRobotsTxt: true,
    renderJs,
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
  } finally {
    await scraper.close();
  }
}

main();
