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
- **Pre-commit**: Always run `npm run precommit` before any commit. This ensures:
  1. No TypeScript errors (`tsc --noEmit`).
  2. All tests pass (`vitest --run`).
- **CLI**: The entry point `src/index.ts` accepts a URL as the first argument.

## Evolution Notes
- [2026-04-25]: Migrated from `ts-node` to `tsx` due to ESM loader deprecation warnings and performance.
- [2026-04-25]: Project transitioned to pure ESM (`type: module`).
- [2026-04-25]: Added `robots-parser` and logic to respect `robots.txt` rules.
