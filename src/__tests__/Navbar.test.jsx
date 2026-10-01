import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../context';

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

  it('updates the active link from cached section positions while scrolling', async () => {
    const offsets = {
      home: 0,
      experience: 500,
      skills: 1000,
      'code-showcase': 1500,
      projects: 2000,
      contact: 2500,
    };
    const offsetSpy = vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get')
      .mockImplementation(function getOffsetTop() {
        return offsets[this.id] ?? 0;
      });
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true });

    render(
      <ThemeProvider>
        <Navbar />
        <main>
          {Object.keys(offsets).map((id) => <section id={id} key={id} />)}
        </main>
      </ThemeProvider>
    );

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: 'Experience' })[0]).toHaveAttribute('aria-current', 'location');
    });

    offsetSpy.mockRestore();
    window.scrollY = 0;
  });
});
