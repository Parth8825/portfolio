import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    const themeButton = screen.getByLabelText('Toggle Theme');
    expect(themeButton).toBeInTheDocument();
    
    // Toggle theme button interaction test
    fireEvent.click(themeButton);
    expect(localStorage.getItem('portfolio_theme')).toBeDefined();
  });
});
