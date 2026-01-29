import { describe, it, expect, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextInput from './TextInput'

describe('TextInput', () => {
  const name = 'firstName'
  afterEach(() => cleanup())

  it('renders label and input', () => {
    render(
      <TextInput
        label="First Name"
        name={name}
        value=""
        onChange={vi.fn()}
        validateInput={vi.fn().mockReturnValue(true)}
      />
    )

    expect(screen.getByTestId(`${name}-label`)).toBeTruthy()
    expect(screen.getByTestId(`${name}-input`)).toBeTruthy()
  })

  it('marks input as invalid when validation fails', async () => {
    const user = userEvent.setup()

    render(
      <TextInput
        label="First Name"
        name={name}
        value=""
        onChange={vi.fn()}
        validateInput={vi.fn().mockReturnValue(false)}
      />
    )

    const input = screen.getByTestId(`${name}-input`)

    await user.click(input)
    await user.tab()

    expect(input.ariaInvalid).toBe('true')
  })

  it('renders UI notification when email fails validation', async () => {
    const user = userEvent.setup()
    render(
      <TextInput
        label="Email Address"
        name="email"
        type="email"
        value=""
        onChange={vi.fn()}
        validateInput={vi.fn().mockReturnValue(false)}
      />
    )
    const input = screen.getByTestId(`email-input`)
    
    await user.click(input)
    await user.tab()  
    
    const errorMessage = screen.getByTestId(`email-error`)
    expect(errorMessage).toBeTruthy()
  })
})
