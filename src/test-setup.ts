import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/preact';
import { h } from 'preact';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock CSS modules
vi.mock('*.module.css', () => ({
  default: new Proxy({}, {
    get: (target, prop) => {
      return prop.toString();
    }
  })
}));

// Mock router for testing
vi.mock('preact-router/match', () => ({
  Link: ({ children, href, activeClassName, ...props }: any) => {
    return h('a', { href, ...props }, children);
  }
}));

// Extend Vitest matchers with Jest DOM
expect.extend({});