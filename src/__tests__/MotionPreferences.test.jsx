import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
import useReducedMotion, { getScrollBehavior } from '../hooks/useReducedMotion';
import Intro from '../components/Intro';
import { ThemeProvider } from '../context';

afterEach(() => vi.restoreAllMocks());

describe('Motion preferences', () => {
  it('responds to preference changes and removes its listener on unmount', () => {
    let reduced = false;
    let listener;
    const removeEventListener = vi.fn();
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      get matches() { return reduced; },
      addEventListener: (_event, callback) => { listener = callback; },
      removeEventListener,
    }));
    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    expect(getScrollBehavior()).toBe('smooth');
    act(() => { reduced = true; listener(); });
    expect(result.current).toBe(true);
    expect(getScrollBehavior()).toBe('auto');
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', listener);
  });

  it('shows a complete hero role and final counters with reduced motion', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    render(<ThemeProvider><Intro /></ThemeProvider>);
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
  });

  it('keeps the LCP description visible without a motion entrance and prioritizes the avatar', () => {
    render(<ThemeProvider><Intro /></ThemeProvider>);
    const description = screen.getByText(/Result-driven Azure/);
    expect(description.tagName).toBe('P');
    expect(description.style.opacity).toBe('');
    expect(description.style.transform).toBe('');
    const avatar = screen.getByAltText('Parth Darji - Software Developer');
    expect(avatar).toHaveAttribute('fetchpriority', 'high');
    expect(avatar).toHaveAttribute('decoding', 'async');
  });
});
