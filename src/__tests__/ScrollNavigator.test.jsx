import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { motionValue } from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import ScrollNavigator from '../components/ScrollNavigator';
import { navigateToSection } from '../utils/scroll';

vi.mock('../utils/scroll', () => ({
  navigateToSection: vi.fn(),
}));

describe('ScrollNavigator', () => {
  it('exposes accessible section links and shares the current section state', () => {
    render(
      <ScrollNavigator
        activeSection="skills"
        scrollProgress={motionValue(0.4)}
      />
    );

    const navigator = screen.getByRole('navigation', { name: 'Section navigation' });
    expect(navigator).toHaveClass('hidden', 'min-[1440px]:flex');

    const skillsLink = screen.getByRole('link', { name: 'Go to Skills section' });
    expect(skillsLink).toHaveAttribute('href', '#skills');
    expect(skillsLink).toHaveAttribute('aria-current', 'location');
    expect(screen.getByRole('link', { name: 'Go to Experience section' })).not.toHaveAttribute('aria-current');

    fireEvent.click(skillsLink);
    expect(navigateToSection).toHaveBeenCalledWith('skills');
  });
});
