import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders Skate Route Planner title', () => {
  render(<App />);
  expect(screen.getAllByText(/Skate Route Planner/i)[0]).toBeInTheDocument();
});

test('renders difficulty slider', () => {
  render(<App />);
  expect(screen.getByLabelText(/Difficulty: 50%/i)).toBeInTheDocument();
});

test('changes difficulty value', () => {
  render(<App />);
  const slider = screen.getByLabelText(/Difficulty: 50%/i);
  fireEvent.change(slider, { target: { value: 75 } });
  expect(slider.value).toBe('75');
});

test('renders Go button', () => {
  render(<App />);
  expect(screen.getByText(/Go/i)).toBeInTheDocument();
});
