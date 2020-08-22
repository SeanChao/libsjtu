import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders titles', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/📖/i);
  expect(titleElement).toBeInTheDocument();
  const titleElement2 = getByText(/🍴/i);
  expect(titleElement2).toBeInTheDocument();
});
