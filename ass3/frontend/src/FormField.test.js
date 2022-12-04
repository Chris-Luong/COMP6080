import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormField from './components/FormField';

describe('Formfield', () => {
  it('renders default form field', () => {
    render(<FormField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // screen.getByRole('');
    screen.debug();
    screen.logTestingPlaygroundURL();
  })
  it('renders formfield with default margin', () => {
    render(<FormField />);
    expect(screen.getByRole('textbox', { margin: /normal/i })).toBeInTheDocument();
  });
  it('renders formfield with required as true', () => {
    render(<FormField required="true" />);
    expect(screen.getByRole('textbox', { required: /true/i })).toBeInTheDocument();
  });
  it('renders formfield with required as false', () => {
    render(<FormField required="false" />);
    expect(screen.getByRole('textbox', { required: /false/i })).toBeInTheDocument();
  });
  it('renders formfield with label: form', () => {
    render(<FormField label="form" />);
    expect(screen.getByRole('textbox', { label: /form/i })).toBeInTheDocument();
  });
  it('renders formfield with type: text', () => {
    render(<FormField type="text" />);
    expect(screen.getByRole('textbox', { type: /text/i })).toBeInTheDocument();
  });
  it('renders formfield with id: mui -2', () => {
    render(<FormField id="mui -2" />);
    expect(screen.getByRole('textbox', { id: /mui -2/i })).toBeInTheDocument();
  });
  // it('triggers onClick when clicked', () => {
  //   const onClick = jest.fn();
  //   render(<FormField onClick={onClick} />);
  //   userEvent.click(screen.getByRole('textbox'));
  //   expect(onClick).toHaveBeenCalledTimes(1);
  // });
})
