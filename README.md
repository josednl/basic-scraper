# Basic Scraper (TypeScript)

A modular and extensible web scraper built with TypeScript, Axios, and Cheerio. Designed for simplicity and ease of use when extracting data from static HTML pages.

## Features

- **TypeScript Native**: Full type safety and modern ESM support.
- **Modular Architecture**: Base classes to easily create specialized scrapers.
- **JavaScript Rendering**: Powered by [Playwright](https://playwright.dev/) for scraping SPAs and dynamic content.
- **UA Rotation**: Automatic rotation of real browser User-Agent strings to avoid detection.
- **Robots.txt Respect**: Built-in support for checking crawling permissions.
- **Modern Tooling**: Powered by `tsx` for execution and `vitest` for testing.
- **Pre-configured**: Includes linting/type-checking and testing workflows.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

## Installation

```bash
git clone <repository-url>
cd basic-scraper
npm install
```

## Usage

To run the scraper against any URL:

```bash
npm start -- https://example.com
```

To enable JavaScript rendering:

```bash
npm start -- https://example.com --render-js
```

### Configuration

You can configure the scraper by passing options to the constructor:

```typescript
const scraper = new SimpleScraper({
  timeout: 10000,
  respectRobotsTxt: true,
  renderJs: true, // Use Playwright for dynamic content
});
```

### Creating your own scraper

Extend the `BaseScraper` class and implement the `extractData` method:

```typescript
import { BaseScraper } from './base-scraper.js';
import * as cheerio from 'cheerio';

export class MyScraper extends BaseScraper {
  protected extractData($: cheerio.CheerioAPI) {
    return {
      // Your custom extraction logic here
      headlines: $('h1').map((_, el) => $(el).text()).get()
    };
  }
}
```

## Development

### Scripts

- `npm start`: Runs the entry point (`src/index.ts`) using `tsx`.
- `npm test`: Runs the test suite using Vitest.
- `npm run precommit`: Runs type-checking and tests to ensure code quality.

## Project Structure

- `src/`: Source code.
  - `base-scraper.ts`: Abstract base class for all scrapers.
  - `browser-service.ts`: Playwright integration for JS rendering.
  - `http-client.ts`: Axios wrapper for static HTML fetching.
  - `robots-service.ts`: Robots.txt parsing and validation.
  - `user-agent-service.ts`: User-Agent rotation management.
  - `simple-scraper.ts`: Example implementation.
- `tests/`: Unit tests.

## License

ISC
