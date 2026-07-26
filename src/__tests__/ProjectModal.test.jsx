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
  };

  it('renders project case study modal details correctly', () => {
    const handleClose = vi.fn();

    render(
      <ThemeProvider>
        <ProjectModal project={dummyProject} onClose={handleClose} />
      </ThemeProvider>
    );

    expect(screen.getByText('CAA Membership Validation APIs')).toBeInTheDocument();
    expect(screen.getByText('CAA National (Canada)')).toBeInTheDocument();
    expect(screen.getByText('ASP.NET Core + Azure App Services')).toBeInTheDocument();
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
});
