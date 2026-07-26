import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Experience from '../components/Experience';
import { ThemeProvider } from '../context';

describe('Experience Component', () => {
  it('renders career and academic journey timeline correctly', () => {
    render(
      <ThemeProvider>
        <Experience />
      </ThemeProvider>
    );

    expect(screen.getByText('Career & Academic Journey')).toBeInTheDocument();
    expect(screen.getByText('TechnoBrains')).toBeInTheDocument();
    expect(screen.getByText('CAA National (Canadian Automobile Association)')).toBeInTheDocument();
    expect(screen.getByText('Conestoga College')).toBeInTheDocument();
    expect(screen.getByText('Gujarat Technological University')).toBeInTheDocument();
  });
});
