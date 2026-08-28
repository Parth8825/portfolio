import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CodeShowcase from '../components/CodeShowcase';
import { ThemeProvider } from '../context';

describe('CodeShowcase Component', () => {
  it('renders integrity notice and tab controls', () => {
    render(
      <ThemeProvider>
        <CodeShowcase />
      </ThemeProvider>
    );

    // Check Integrity notice
    expect(screen.getByText(/Integrity Notice:/i)).toBeInTheDocument();
    expect(screen.getByText(/synthetic, generic patterns/i)).toBeInTheDocument();

    // Check tabs render
    expect(screen.getByText('ASP.NET Core REST API')).toBeInTheDocument();
    expect(screen.getByText('OAuth 2.0 Auth Wrapper')).toBeInTheDocument();
    expect(screen.getByText('EF Core LINQ Pattern')).toBeInTheDocument();
    expect(screen.getByText('SQL Stored Procedure')).toBeInTheDocument();
    expect(screen.getByText('React Custom Hook')).toBeInTheDocument();
  });

  it('switches active snippet when tab is clicked', async () => {
    render(
      <ThemeProvider>
        <CodeShowcase />
      </ThemeProvider>
    );

    const sqlTab = screen.getByText('SQL Stored Procedure');
    fireEvent.click(sqlTab);
    expect(await screen.findByText(/sp_CalculateOrderDiscount/i)).toBeInTheDocument();

    const reactTab = screen.getByText('React Custom Hook');
    fireEvent.click(reactTab);
    expect(await screen.findByText(/useMembershipValidation/i)).toBeInTheDocument();
  });
});
