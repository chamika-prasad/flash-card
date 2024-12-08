import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../src/components/atoms/Input/input';
import { describe, it, expect } from 'vitest';
import React, { ChangeEvent } from 'react';

describe('Input Component', () => {
  it('should render the input with the provided placeholder', () => {
    render(<Input placeHolder="Enter text" value="" onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeTruthy();
  });

  it('should render the input with the provided value', () => {
    render(<Input placeHolder="Enter text" value="Test value" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue('Test value');
    expect(inputElement).toBeTruthy();
  });
});
