import React from 'react'
import { render, screen } from '@testing-library/react'
import QuoteSection from './QuoteSection'

describe('QuoteSection', () => {
  it('should render the component', () => {
    render(<QuoteSection />)
    expect(screen.getByTestId('quote-section')).toBeInTheDocument()
  })
})
