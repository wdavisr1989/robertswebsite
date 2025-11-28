import { expect, test, describe } from 'vitest';

describe('Basic Test Suite', () => {
  test('basic math test', () => {
    expect(2 + 2).toBe(4);
  });

  test('string test', () => {
    expect('hello world').toContain('world');
  });
});