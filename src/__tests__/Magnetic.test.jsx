import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Magnetic from '../components/Magnetic';

describe('Magnetic Component', () => {
  it('renders children correctly and handles mouse movement without error', () => {
    render(
      <Magnetic strength={0.3} className="test-magnetic">
        <button data-testid="magnetic-btn">Click Me</button>
      </Magnetic>
    );

    const button = screen.getByTestId('magnetic-btn');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Click Me');

    // Simulate mouse interaction
    const container = button.parentElement;
    fireEvent.mouseMove(container, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(container);
  });
});
