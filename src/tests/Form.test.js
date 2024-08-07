import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../components/Form'; // Render Form Component

describe('Form Component', () => {
  test('renders form with all fields and submit button', () => {
    render(<Form />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telephone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date & Time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reserve/i })).toBeInTheDocument();
  });

  test('shows validation errors when required fields are not filled', async () => {
    render(<Form />);

    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));

    await waitFor(() => {
      expect(screen.getByText(/Full name is a required field!/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is a required field!/i)).toBeInTheDocument();
      expect(screen.getByText(/Telephone is a required field!/i)).toBeInTheDocument();
      expect(screen.getByText(/Please select date and time!/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid email format', async () => {
    render(<Form />);

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is not valid!/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid phone number format', async () => {
    render(<Form />);

    fireEvent.input(screen.getByLabelText(/Telephone/i), {
      target: { value: '12345' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));

    await waitFor(() => {
      expect(screen.getByText(/Phone number must match the form 233 00 000 0000/i)).toBeInTheDocument();
    });
  });

  test('submits the form when all fields are valid', async () => {
    render(<Form />);

    fireEvent.input(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/Telephone/i), {
      target: { value: '233 00 000 0000' },
    });
    fireEvent.input(screen.getByLabelText(/Guests/i), {
      target: { value: '2' },
    });
    fireEvent.input(screen.getByLabelText(/Date & Time/i), {
      target: { value: '2023-12-31T19:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));

    await waitFor(() => {
      // Check if no validation errors are displayed
      expect(screen.queryByText(/is a required field!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/is not valid!/i)).not.toBeInTheDocument();
    });
  });
});