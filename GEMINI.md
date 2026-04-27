# Project Context: Basic Scraper

This document serves as the foundational mandate for Gemini CLI when working on this project.

## Technical Stack
- **Runtime**: Node.js (ESM)
- **Language**: TypeScript
- **Runner**: `tsx` (preferred over `ts-node`)
- **HTTP Client**: Axios
- **Parsing**: Cheerio
- **Testing**: Vitest
- **Git**: Conventional Commits

## Architecture
- **Object-Oriented & Modular**: Follow the established pattern of `HttpClient` -> `BaseScraper` -> `ConcreteScraper`.
- **Robots.txt**: Always use `RobotsService` to validate URLs if `respectRobotsTxt` is enabled.
- **Service Injection**: `BaseScraper` injects `HttpClient` and `RobotsService` automatically.

## Coding Standards
- **Imports**: Always include the `.js` extension in local imports (ESM requirement).
- **Types**: Use `import type` for type-only imports to satisfy `verbatimModuleSyntax`.
- **Naming**: Use PascalCase for classes, camelCase for methods and variables.
- **Language**: Source code and documentation in English. CLI messages in English. Comments in English.

## Key Workflows
- **PowerShell Commands**: Use `;` as a command separator or run commands sequentially. Do not use `&&` as it is not supported in all PowerShell versions. To simulate `&&`, use the pattern `command1; if ($?) { command2 }`.
- **Pre-commit**: Always run `npm run precommit` before any commit. This ensures:
  1. No TypeScript errors (`tsc --noEmit`).
  2. All tests pass (`vitest --run`).
- **Documentation**: Always update `GEMINI.md` (roadmap, evolution notes, or rules) and `README.md` after significant changes or when new patterns are established. This doesn't need to be explicitly mentioned in commit messages.
- **CLI**: The entry point `src/index.ts` accepts a URL and an optional `--render-js` flag.

## Skills & Principles
- **Node.js Best Practices**: Follow modular architecture and async patterns.
- **Web Scraping Methodology**: Implement multiple extraction strategies and anti-bot handling.
- **Advanced Types**: Leverage TypeScript for robust data structures and API responses.

## Roadmap
- [x] **UA Rotation**: Implement a dynamic `UserAgentProvider` to cycle through real browser strings.
- [x] **JS Rendering**: Integrate `Playwright` to handle SPA and dynamic content.
- [x] **Schema Validation**: Use `Zod` to validate scraped data and ensure structural integrity.

## Evolution Notes
- [2026-04-25]: Migrated from `ts-node` to `tsx` due to ESM loader deprecation warnings and performance.
- [2026-04-25]: Project transitioned to pure ESM (`type: module`).
- [2026-04-25]: Added `robots-parser` and logic to respect `robots.txt` rules.
- [2026-04-26]: Added JSDoc documentation to all main components.
- [2026-04-26]: Integrated specialized skills for Node.js, TypeScript, and Web Scraping.
- [2026-04-26]: Implemented User-Agent rotation service and integrated it into the base scraper.
- [2026-04-26]: Integrated Playwright for JavaScript rendering and added BrowserService.
- [2026-04-27]: Integrated Zod for schema validation and added generic type support to scrapers.
