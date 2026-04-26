import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserService } from '../src/browser-service.js';

describe('BrowserService', () => {
  let service: BrowserService;

  beforeEach(() => {
    service = new BrowserService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // We won't run full playwright in CI unless configured, 
  // but we can test the close method doesn't throw if no browser
  it('should close without throwing if no browser launched', async () => {
    await expect(service.close()).resolves.not.toThrow();
  });
});
