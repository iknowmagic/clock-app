import React from 'react'
import { render, screen } from '@testing-library/react'
import ClockDisplay from './ClockDisplay'

describe('ClockDisplay', () => {
  it('should render the component', () => {
    render(<ClockDisplay />)
    expect(screen.getByTestId('clock-display')).toBeInTheDocument()
  })
})
