import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Contact from '../components/Contact';
import { ThemeProvider } from '../context';

describe('Contact Component Form Validation', () => {
  it('displays error messages when required fields are empty', async () => {
    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument();
      expect(screen.getByText('Subject is required.')).toBeInTheDocument();
      expect(screen.getByText('Email is required.')).toBeInTheDocument();
      expect(screen.getByText('Message is required.')).toBeInTheDocument();
    });
  });

  it('validates email format correctly', async () => {
    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText('John Doe');
    const subjectInput = screen.getByPlaceholderText('Project Inquiry / Job Opportunity');
    const emailInput = screen.getByPlaceholderText('john@example.com');
    const messageInput = screen.getByPlaceholderText('Tell me about your project details or message...');

    fireEvent.change(nameInput, { target: { value: 'Parth' } });
    fireEvent.change(subjectInput, { target: { value: 'Inquiry' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email-string' } });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });
  });

  it('triggers honeypot protection when bot field is populated', async () => {
    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText('John Doe');
    const subjectInput = screen.getByPlaceholderText('Project Inquiry / Job Opportunity');
    const emailInput = screen.getByPlaceholderText('john@example.com');
    const messageInput = screen.getByPlaceholderText('Tell me about your project details or message...');
    const botInput = screen.getByLabelText('Website');

    fireEvent.change(nameInput, { target: { value: 'Spam Bot' } });
    fireEvent.change(subjectInput, { target: { value: 'Spam Subject' } });
    fireEvent.change(emailInput, { target: { value: 'bot@spam.com' } });
    fireEvent.change(messageInput, { target: { value: 'Spam text' } });
    fireEvent.change(botInput, { target: { value: 'http://spam-site.com' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank you! Your message has been sent successfully./i)).toBeInTheDocument();
    });
  });
});
