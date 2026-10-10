import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../components/Footer';
import { ThemeProvider } from '../context';

describe('Footer Component', () => {
  it('renders brand name, developer title, copyright, and scroll to top button', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );

    expect(screen.getByText('Parth Darji')).toBeInTheDocument();
    expect(screen.getByText(/Software Developer/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /footer navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub Profile' })).toHaveAttribute('href', 'https://github.com/Parth8825');
    expect(screen.getByRole('link', { name: 'LinkedIn Profile' })).toHaveAttribute('href', 'https://www.linkedin.com/in/parthdarji8825');
    expect(screen.getByRole('link', { name: 'Email Me' })).toHaveAttribute('href', 'mailto:parthdarji8825@gmail.com');

    const topBtn = screen.getByRole('button', { name: /scroll to top/i });
    expect(topBtn).toBeInTheDocument();

    fireEvent.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
