import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure async timeout for CI environments
configure({ asyncUtilTimeout: 5000 });

// Mock window.matchMedia for Vitest environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver for Framer Motion viewport animations and lazy loading in jsdom
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    if (this.callback) {
      this.callback([{ isIntersecting: true, target, intersectionRatio: 1 }]);
    }
  }
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// Mock window.scrollTo for jsdom
window.scrollTo = () => {};


