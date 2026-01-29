import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders label and input', () => {
    const name = 'firstName'
    render(
      <TextInput 
        label='First Name'
        name={name}
        value=''
        onChange={vi.fn()}
        validateInput={vi.fn().mockReturnValue(true)}
      />
    )

    const label = screen.getByTestId(`${name}-label`)
    const input = screen.getByTestId(`${name}-input`)
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  })
})