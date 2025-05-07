import React from 'react'
import { render, screen } from '@testing-library/react'
import ClockApp from './ClockApp'

describe('ClockApp', () => {
  it.skip('should render the component', () => {
    render(<ClockApp />)
    expect(screen.getByTestId('clock-app')).toBeInTheDocument()
  })
})
