import React from 'react'
import { render, screen } from '@testing-library/react'
import ToggleButton from './ToggleButton'

describe('ToggleButton', () => {
  it('should render the component', () => {
    render(<ToggleButton />)
    expect(screen.getByTestId('toggle-button')).toBeInTheDocument()
  })
})
