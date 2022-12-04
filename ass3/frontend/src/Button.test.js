import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Btn from './components/Btn';

describe('Button', () => {
  it('renders default button with no props', () => {
    render(<Btn />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    // screen.getByRole('');
    // screen.debug();
    // screen.logTestingPlaygroundURL();
  })
  it('renders button with default primary colour', () => {
    render(<Btn />);
    expect(screen.getByRole('button', { color: /primary/i })).toBeInTheDocument();
  });
  it('renders button with custom colour', () => {
    render(<Btn color="grey" />);
    expect(screen.getByRole('button', { color: /grey/i })).toBeInTheDocument();
  });
  it('renders button with default variant', () => {
    render(<Btn />);
    expect(screen.getByRole('button', { variant: /contained/i })).toBeInTheDocument();
  });
  it('renders button with custom variant', () => {
    render(<Btn variant="outlined" />);
    expect(screen.getByRole('button', { variant: /outlined/i })).toBeInTheDocument();
  });
  it('renders button with default size', () => {
    render(<Btn />);
    expect(screen.getByRole('button', { size: /medium/i })).toBeInTheDocument();
  });
  it('renders button with custom size', () => {
    render(<Btn size="large" />);
    expect(screen.getByRole('button', { size: /large/i })).toBeInTheDocument();
  });
  it('renders button with display values', () => {
    render(<Btn DisplayValue="test" />);
    expect(screen.getByRole('button', { DisplayValue: /test/i })).toBeInTheDocument();
  });
  it('triggers onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Btn onClick={onClick} />);
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
})
