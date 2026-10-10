import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useActiveSection from '../hooks/useActiveSection';

afterEach(() => {
  document.body.innerHTML = '';
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  vi.restoreAllMocks();
});

describe('useActiveSection', () => {
  it('tracks one active section from cached offsets while scrolling', () => {
    const offsets = { home: 0, experience: 500, skills: 1000 };
    Object.keys(offsets).forEach((id) => {
      const section = document.createElement('section');
      section.id = id;
      document.body.append(section);
    });

    vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(function getOffsetTop() {
      return offsets[this.id] ?? 0;
    });

    const frames = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback);
      return frames.length;
    });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

    const { result } = renderHook(() => useActiveSection(Object.keys(offsets)));
    act(() => frames.shift()(0));
    expect(result.current).toBe('home');

    window.scrollY = 500;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      frames.shift()(16);
    });

    expect(result.current).toBe('experience');
  });
});
