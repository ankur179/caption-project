import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReservationsContent from '../components/ReservationsContent'; // Adjust the import path accordingly

  test('renders the form with all fields and labels', () => {
    render(<ReservationsContent />);
    expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Telephone/i)).toBeInTheDocument();
    expect(screen.getByText(/Occasion \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Guests/i)).toBeInTheDocument();
    expect(screen.getByText(/Date & Time/i)).toBeInTheDocument();
  });

  test('shows error messages when form is submitted with empty required fields', () => {
    // const { getByAltText, getByText, getByTestId } = render(<ReservationsContent />);
    render(<ReservationsContent />);
    fireEvent.click(screen.getByRole('button', { name: /Reserve/i }));
    expect(screen.getByText('* Full name required!')).toBeInTheDocument();
    expect(screen.getByText('* Email required!')).toBeInTheDocument();
    expect(screen.getByText('* Phone number required!')).toBeInTheDocument();
    expect(screen.getByText('* Please specify number of guests!')).toBeInTheDocument();
    expect(screen.getByText('* Please specify date and time!')).toBeInTheDocument();
  });