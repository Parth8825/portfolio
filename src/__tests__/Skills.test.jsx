import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Skills from '../components/Skills';
import { ThemeProvider } from '../context';

describe('Skills Component', () => {
  it('renders technical skill categories and key technologies', () => {
    render(
      <ThemeProvider>
        <Skills />
      </ThemeProvider>
    );

    expect(screen.getByText('Technical Toolkit')).toBeInTheDocument();
    expect(screen.getByText('Backend & Web APIs')).toBeInTheDocument();
    expect(screen.getByText('Databases & Architecture')).toBeInTheDocument();
    expect(screen.getByText('Frontend & Ecosystem')).toBeInTheDocument();
    expect(screen.getByText('Cloud, DevOps & CMS')).toBeInTheDocument();

    expect(screen.getByText('ASP.NET Core')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('Microsoft SQL Server')).toBeInTheDocument();
    expect(screen.getByText('Azure Cloud & App Services')).toBeInTheDocument();
  });
});
