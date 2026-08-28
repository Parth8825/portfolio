import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CommandPalette from '../components/CommandPalette';
import { ThemeProvider } from '../context';

describe('CommandPalette Component', () => {
  it('renders nothing when isOpen is false', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <ThemeProvider>
        <CommandPalette isOpen={false} onClose={handleClose} />
      </ThemeProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders command search and list when isOpen is true', () => {
    const handleClose = vi.fn();
    render(
      <ThemeProvider>
        <CommandPalette isOpen={true} onClose={handleClose} />
      </ThemeProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Go to Home / Hero')).toBeInTheDocument();
    expect(screen.getByText('Go to Enterprise Projects')).toBeInTheDocument();
  });

  it('filters command list based on user search query', () => {
    const handleClose = vi.fn();
    render(
      <ThemeProvider>
        <CommandPalette isOpen={true} onClose={handleClose} />
      </ThemeProvider>
    );

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Projects' } });

    expect(screen.getByText('Go to Enterprise Projects')).toBeInTheDocument();
    expect(screen.queryByText('Go to Home / Hero')).not.toBeInTheDocument();
  });

  it('navigates through items with ArrowDown and executes with Enter', () => {
    const handleClose = vi.fn();
    render(
      <ThemeProvider>
        <CommandPalette isOpen={true} onClose={handleClose} />
      </ThemeProvider>
    );

    // Initial state: first option is selected
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    // Arrow down
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    // Press Enter to trigger the second option (projects)
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <ThemeProvider>
        <CommandPalette isOpen={true} onClose={handleClose} />
      </ThemeProvider>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
