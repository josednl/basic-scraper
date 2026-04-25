# Basic Scraper (TypeScript)

A modular and extensible web scraper built with TypeScript, Axios, and Cheerio. Designed for simplicity and ease of use when extracting data from static HTML pages.

## Features

- **TypeScript Native**: Full type safety and modern ESM support.
- **Modular Architecture**: Base classes to easily create specialized scrapers.
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

> **Note**: The `--` is necessary to pass arguments through npm to the underlying script.

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
  - `http-client.ts`: Axios wrapper for HTML fetching.
  - `simple-scraper.ts`: Example implementation.
- `tests/`: Unit tests.
- `dist/`: Compiled JavaScript output (generated after build).

## License

ISC
