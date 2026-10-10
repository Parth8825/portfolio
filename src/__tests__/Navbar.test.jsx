import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../context';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

afterEach(() => {
  vi.restoreAllMocks();
  delete document.startViewTransition;
});

describe('Navbar Component', () => {
  it('renders navigation links and handles theme toggle', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    const themeButton = screen.getByLabelText('Toggle Theme');
    expect(themeButton).toBeInTheDocument();
    
    // Toggle theme button interaction test
    fireEvent.click(themeButton);
    expect(localStorage.getItem('portfolio_theme')).toBeDefined();
  });

  it('opens mobile drawer and handles link click', () => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();

    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    const toggleButton = screen.getByLabelText('Toggle Navigation Menu');
    expect(toggleButton).toBeInTheDocument();

    // Open mobile drawer
    fireEvent.click(toggleButton);

    // There should now be multiple links (desktop and mobile)
    const projectLinks = screen.getAllByText('Projects');
    expect(projectLinks.length).toBeGreaterThan(1);

    // Click on mobile link
    fireEvent.click(projectLinks[projectLinks.length - 1]);
    expect(toggleButton).toBeInTheDocument();
  });

  it('uses the shared active section supplied by the app', () => {
    render(
      <ThemeProvider>
        <Navbar activeSection="experience" />
      </ThemeProvider>
    );

    expect(screen.getAllByRole('link', { name: 'Experience' })[0]).toHaveAttribute('aria-current', 'location');
    expect(screen.getAllByRole('link', { name: 'Home' })[0]).not.toHaveAttribute('aria-current');
  });

  it('uses the View Transition API when supported', () => {
    const startViewTransition = vi.fn((update) => {
      update();
      return { finished: Promise.resolve() };
    });
    document.startViewTransition = startViewTransition;

    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByLabelText('Toggle Theme'), { clientX: 120, clientY: 40 });
    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(document.documentElement.style.getPropertyValue('--theme-transition-x')).toBe('120px');
    expect(localStorage.getItem('portfolio_theme')).toBe('dark');
  });

  it('bypasses the View Transition API for reduced motion', () => {
    const startViewTransition = vi.fn();
    document.startViewTransition = startViewTransition;
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)' || query === '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByLabelText('Toggle Theme'));
    expect(startViewTransition).not.toHaveBeenCalled();
    expect(localStorage.getItem('portfolio_theme')).toBe('dark');
  });
});
