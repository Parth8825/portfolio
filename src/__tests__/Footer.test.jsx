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

    const topBtn = screen.getByRole('button', { name: /scroll to top/i });
    expect(topBtn).toBeInTheDocument();

    fireEvent.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
