import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Intro from '../components/Intro';
import { ThemeProvider } from '../context';

describe('Intro Component', () => {
  it('renders developer name, hero heading, and status badge', () => {
    render(
      <ThemeProvider>
        <Intro />
      </ThemeProvider>
    );

    expect(screen.getByText('Hello, my name is')).toBeInTheDocument();
    expect(screen.getByText('Parth')).toBeInTheDocument();
    expect(screen.getByText('Darji')).toBeInTheDocument();
    expect(screen.getByText(/TechnoBrains/i)).toBeInTheDocument();
    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });
});
