import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Experience from '../components/Experience';
import { ThemeProvider } from '../context';

describe('Experience Component', () => {
  it('renders career and academic journey timeline correctly', () => {
    const { container } = render(
      <ThemeProvider>
        <Experience />
      </ThemeProvider>
    );

    const heading = screen.getByText('Career & Academic Journey');
    expect(heading).toBeInTheDocument();
    expect(heading.closest('section')).toHaveAttribute('data-section-accent', 'cyan');
    expect(screen.getByText('TechnoBrains')).toBeInTheDocument();
    expect(screen.getByText('CAA National (Canadian Automobile Association)')).toBeInTheDocument();
    expect(screen.getByText('Conestoga College')).toBeInTheDocument();
    expect(screen.getByText('Gujarat Technological University')).toBeInTheDocument();

    const entries = container.querySelectorAll('.experience-timeline > [role="listitem"]');
    expect(entries).toHaveLength(4);
    expect(entries[0]).toHaveTextContent('TechnoBrains');
    expect(entries[1]).toHaveTextContent('CAA National');
    expect(entries[2]).toHaveTextContent('Conestoga College');
    expect(entries[3]).toHaveTextContent('Gujarat Technological University');
    expect(screen.getByRole('list', { name: 'Career and education timeline' })).toBeInTheDocument();
  });
});
