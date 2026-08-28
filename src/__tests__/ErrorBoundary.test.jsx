import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test rendering explosion');
};

const SafeChild = () => {
  return <div data-testid="safe-content">All systems operational</div>;
};

describe('ErrorBoundary Component', () => {
  it('renders child components normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('safe-content')).toBeInTheDocument();
    expect(screen.getByText('All systems operational')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback UI', () => {
    // Suppress console.error in Vitest output for the expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();

    spy.mockRestore();
  });
});
