import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { ThemeProvider } from '../context';

describe('App Component', () => {
  it('renders portfolio sections correctly', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    // Check header brand logo
    expect(screen.getAllByText('Parth')[0]).toBeInTheDocument();

    // Check main hero section content
    expect(screen.getAllByText(/Darji/i).length).toBeGreaterThan(0);

    // Check section headings
    expect(screen.getByText(/Professional Background/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills &/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Let's Discuss/i)).toBeInTheDocument();
  });
});
