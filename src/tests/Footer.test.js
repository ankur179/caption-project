import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer';

test('renders Footer component with correct content', () => {
  const { getByAltText, getByText, getByTestId } = render(<Footer />);

  // Check if the logo image is rendered
  expect(getByAltText(/Little Lemon logo/i)).toBeInTheDocument();

  // Check if the main description is rendered
  expect(getByText(/Little Lemon is a charming neighborhood bistro/i)).toBeInTheDocument();

  // Check if the locations section is rendered with correct locations
  const locations = getByTestId('locations');
  const locationsList = within(locations).getByText(/Accra/i);
  expect(locationsList).toBeInTheDocument();
  expect(within(locations).getByText(/Kumasi/i)).toBeInTheDocument();
  expect(within(locations).getByText(/Cape Coast/i)).toBeInTheDocument();
  expect(within(locations).getByText(/Tamale/i)).toBeInTheDocument();

  // Check if the opening times section is rendered with correct times
  const openingTimes = getByTestId('opening-times');
  expect(within(openingTimes).getByText(/Mon - Wed: 10:30AM - 12:00AM/i)).toBeInTheDocument();
  expect(within(openingTimes).getByText(/Fri: 12:00PM - 1:00AM/i)).toBeInTheDocument();
  expect(within(openingTimes).getByText(/Sat - Sun: 10:30AM - 12:00AM/i)).toBeInTheDocument();

  // Check if the contact section is rendered with correct contact info
  const contact = getByTestId('contact');
  expect(within(contact).getByText(/96 Abafom Road, North Ridge - Accra/i)).toBeInTheDocument();
  expect(within(contact).getByText(/Tel: 020 7928 0678/i)).toBeInTheDocument();
  expect(within(contact).getByText(/Email: info@littlelemon.com/i)).toBeInTheDocument();

  // Check if the copyright section is rendered
  expect(getByText(/© 2023 Little Lemon Ltd. All rights reserved./i)).toBeInTheDocument();
});
