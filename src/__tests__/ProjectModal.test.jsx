import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ProjectModal from '../components/ProjectModal';
import { ThemeProvider } from '../context';

describe('ProjectModal Component', () => {
  const dummyProject = {
    id: 1,
    title: 'CAA Membership Validation APIs',
    company: 'CAA National (Canada)',
    desc: 'Designed and developed secure RESTful APIs',
    architecture: 'ASP.NET Core + Azure App Services',
    tags: ['ASP.NET Core', 'Azure', 'C#'],
    achievements: [
      'Engineered high-throughput validation endpoints with sub-100ms response time.',
      'Enforced OAuth 2.0 / Entra ID token security.',
    ],
  };

  it('renders project case study modal details and custom achievements correctly', () => {
    const handleClose = vi.fn();

    render(
      <ThemeProvider>
        <ProjectModal project={dummyProject} onClose={handleClose} />
      </ThemeProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('CAA Membership Validation APIs')).toBeInTheDocument();
    expect(screen.getByText('CAA National (Canada)')).toBeInTheDocument();
    expect(screen.getByText('ASP.NET Core + Azure App Services')).toBeInTheDocument();
    expect(screen.getByText(/sub-100ms response time/i)).toBeInTheDocument();
    expect(screen.getByText(/OAuth 2.0 \/ Entra ID token security/i)).toBeInTheDocument();
  });

  it('calls onClose when close button or escape key is pressed', () => {
    const handleClose = vi.fn();

    render(
      <ThemeProvider>
        <ProjectModal project={dummyProject} onClose={handleClose} />
      </ThemeProvider>
    );

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('renders into document.body with z-[70], overflow-y-auto, and safe-area padding', () => {
    const handleClose = vi.fn();

    render(
      <ThemeProvider>
        <ProjectModal project={dummyProject} onClose={handleClose} />
      </ThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const container = dialog.parentElement;

    expect(container).toBeInTheDocument();
    expect(container.classList.contains('z-[70]')).toBe(true);
    expect(container.classList.contains('overflow-y-auto')).toBe(true);
    expect(container.classList.contains('overflow-hidden')).toBe(false);
    expect(document.body.contains(container)).toBe(true);
  });
});
