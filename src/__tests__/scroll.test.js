import { afterEach, describe, expect, it, vi } from 'vitest';
import { scrollToSection } from '../utils/scroll';

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('scrollToSection', () => {
  it('waits for preceding lazy content before calculating the destination', () => {
    const pending = document.createElement('div');
    pending.id = 'code-showcase';
    pending.dataset.lazyPending = 'true';
    Object.defineProperty(pending, 'offsetTop', { value: 500 });

    const target = document.createElement('section');
    target.id = 'projects';
    Object.defineProperty(target, 'offsetTop', { value: 1000 });
    target.getBoundingClientRect = () => ({ top: 900 });
    document.body.append(pending, target);

    const frames = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback);
      return frames.length;
    });
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    Object.defineProperty(window, 'pageYOffset', { value: 100, configurable: true });

    scrollToSection('projects');
    frames.shift()(0);
    expect(scrollTo).not.toHaveBeenCalled();

    pending.remove();
    frames.shift()(16);
    expect(scrollTo).toHaveBeenCalledWith({ top: 920, behavior: 'smooth' });
  });
});
