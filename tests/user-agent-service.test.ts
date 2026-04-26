import { describe, it, expect } from 'vitest';
import { UserAgentService } from '../src/user-agent-service.js';

describe('UserAgentService', () => {
  const service = new UserAgentService();

  it('should return a random user agent', () => {
    const ua = service.getRandom();
    expect(ua).toBeDefined();
    expect(typeof ua).toBe('string');
    expect(service.getAll()).toContain(ua);
  });

  it('should return different user agents over multiple calls', () => {
    const uas = new Set();
    for (let i = 0; i < 100; i++) {
      uas.add(service.getRandom());
    }
    // With 6 UAs, it's statistically impossible to get the same one 100 times
    expect(uas.size).toBeGreaterThan(1);
  });
});
