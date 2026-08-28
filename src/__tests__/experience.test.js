import { describe, it, expect } from 'vitest';
import { getYearsOfExperience } from '../utils/experience';

describe('getYearsOfExperience utility', () => {
  it('returns a formatted string with minimum 2+ Years', () => {
    const result = getYearsOfExperience();
    expect(result).toMatch(/\d+\+ Years/);
    const years = parseInt(result, 10);
    expect(years).toBeGreaterThanOrEqual(2);
  });
});
