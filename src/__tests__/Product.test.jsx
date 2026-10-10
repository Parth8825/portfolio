import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Product from '../components/Product';
import { ThemeProvider } from '../context';

afterEach(() => vi.restoreAllMocks());

describe('Product Component', () => {
  const dummyProps = {
    title: 'CAA Membership Validation APIs',
    company: 'CAA National (Canada)',
    desc: 'Real-time membership validation service',
    architecture: 'ASP.NET Core + Azure SQL',
    tags: ['C#', 'ASP.NET Core', 'Azure'],
    onOpenModal: vi.fn(),
    index: 0,
  };

  it('renders project card details, architecture, and technology badges', () => {
    render(
      <ThemeProvider>
        <Product {...dummyProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('CAA National (Canada)')).toBeInTheDocument();
    expect(screen.getByText('CAA Membership Validation APIs')).toBeInTheDocument();
    expect(screen.getByText('Real-time membership validation service')).toBeInTheDocument();
    expect(screen.getByText('ASP.NET Core + Azure SQL')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('ASP.NET Core')).toBeInTheDocument();
    expect(screen.getByText('Azure')).toBeInTheDocument();
    expect(screen.getByText(/View Architecture Details/i)).toBeInTheDocument();
    expect(screen.getAllByText('01').length).toBeGreaterThan(0);
  });

  it('triggers onOpenModal when card is clicked', () => {
    const onOpenModal = vi.fn();
    render(
      <ThemeProvider>
        <Product {...dummyProps} onOpenModal={onOpenModal} />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });
    fireEvent.click(card);

    expect(onOpenModal).toHaveBeenCalledTimes(1);
  });

  it('triggers onOpenModal when Enter key is pressed', () => {
    const onOpenModal = vi.fn();
    render(
      <ThemeProvider>
        <Product {...dummyProps} onOpenModal={onOpenModal} />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(onOpenModal).toHaveBeenCalledTimes(1);
  });

  it('triggers onOpenModal when Space key is pressed', () => {
    const onOpenModal = vi.fn();
    render(
      <ThemeProvider>
        <Product {...dummyProps} onOpenModal={onOpenModal} />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });
    fireEvent.keyDown(card, { key: ' ' });

    expect(onOpenModal).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onOpenModal on other key presses', () => {
    const onOpenModal = vi.fn();
    render(
      <ThemeProvider>
        <Product {...dummyProps} onOpenModal={onOpenModal} />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });
    fireEvent.keyDown(card, { key: 'ArrowDown' });
    fireEvent.keyDown(card, { key: 'Tab' });
    fireEvent.keyDown(card, { key: 'Escape' });

    expect(onOpenModal).not.toHaveBeenCalled();
  });

  it('updates CSS variables for mouse spotlight on mouse movement', () => {
    render(
      <ThemeProvider>
        <Product {...dummyProps} />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });

    // Mock getBoundingClientRect
    card.getBoundingClientRect = () => ({
      left: 100,
      top: 100,
      width: 400,
      height: 300,
      bottom: 400,
      right: 500,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    fireEvent.mouseMove(card, { clientX: 150, clientY: 180 });

    expect(card.style.getPropertyValue('--mouse-x')).toBe('50px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('80px');
    expect(card.style.getPropertyValue('--project-rotate-x')).toBeTruthy();
    expect(card.style.getPropertyValue('--project-rotate-y')).toBeTruthy();
  });

  it('applies its project identity as CSS data without changing accessible activation', () => {
    render(
      <ThemeProvider>
        <Product {...dummyProps} projectNumber="04" accentRgb="244 63 94" />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });
    expect(card.closest('[data-project-number]')).toHaveAttribute('data-project-number', '04');
    expect(card.style.getPropertyValue('--project-accent-rgb')).toBe('244 63 94');
  });

  it('disables pointer tracking when reduced motion is requested', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <Product {...dummyProps} />
      </ThemeProvider>
    );

    const card = screen.getByRole('button', {
      name: /View architecture details for CAA Membership Validation APIs/i,
    });
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    expect(card).toHaveAttribute('data-reduced-motion', 'true');
    expect(card.style.getPropertyValue('--mouse-x')).toBe('');
  });
});
