import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Intro from '../components/Intro';
import { ThemeProvider } from '../context';

describe('Intro Component', () => {
  it('renders developer name, hero heading, and status badge', () => {
    const { container } = render(
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
    expect(screen.getByRole('group', { name: 'Social profiles' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Professional highlights' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(container.querySelector('[data-avatar-frame]')).toBeInTheDocument();
  });
});
