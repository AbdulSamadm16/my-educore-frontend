/**
 * Basic unit tests for EduCore Frontend
 * Tests pure utility logic without requiring DOM or browser
 */

import { describe, test, expect } from 'vitest';

// ─── Test: String formatting ──────────────────────────────────────────────────
describe('String utilities', () => {
  test('capitalizes first letter of a name', () => {
    const name = 'abdul';
    const result = name.charAt(0).toUpperCase() + name.slice(1);
    expect(result).toBe('Abdul');
  });

  test('truncates long text to 50 characters', () => {
    const truncate = (str, limit) =>
      str.length > limit ? str.slice(0, limit) + '...' : str;
    const long = 'A'.repeat(60);
    expect(truncate(long, 50)).toHaveLength(53); // 50 + '...'
  });
});

// ─── Test: Price formatting ───────────────────────────────────────────────────
describe('Price formatting', () => {
  const formatPrice = (price) => `₹${price.toFixed(2)}`;

  test('formats price with rupee symbol', () => {
    expect(formatPrice(999)).toBe('₹999.00');
  });

  test('formats decimal price correctly', () => {
    expect(formatPrice(1499.5)).toBe('₹1499.50');
  });
});

// ─── Test: Email validation ───────────────────────────────────────────────────
describe('Email validation', () => {
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  test('valid email passes', () => {
    expect(isValidEmail('user@educore.com')).toBe(true);
  });

  test('invalid email without @ fails', () => {
    expect(isValidEmail('invalidemail.com')).toBe(false);
  });

  test('empty string is invalid email', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

// ─── Test: Course duration formatter ─────────────────────────────────────────
describe('Duration formatting', () => {
  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  test('formats 90 minutes as 1h 30m', () => {
    expect(formatDuration(90)).toBe('1h 30m');
  });

  test('formats 45 minutes as 45m', () => {
    expect(formatDuration(45)).toBe('45m');
  });

  test('formats 120 minutes as 2h 0m', () => {
    expect(formatDuration(120)).toBe('2h 0m');
  });
});
