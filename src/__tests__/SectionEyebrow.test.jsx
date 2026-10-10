import React from 'react';
import { render, screen } from '@testing-library/react';
import { Terminal } from 'lucide-react';
import SectionEyebrow from '../components/SectionEyebrow';

describe('SectionEyebrow', () => {
  it('renders its label and keeps its decorative icon hidden from assistive technology', () => {
    const { container } = render(
      <SectionEyebrow icon={Terminal} number="02">Technical Toolkit</SectionEyebrow>
    );

    expect(screen.getByText('Technical Toolkit')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('section-chapter-marker');
    expect(container.querySelector('.section-eyebrow')).toBeInTheDocument();
    expect(container.querySelector('.section-chapter-number')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
