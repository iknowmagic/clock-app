import React from 'react'
import { render, screen } from '@testing-library/react'
import DetailsPanel from './DetailsPanel'

describe('DetailsPanel', () => {
  it('should render the component', () => {
    render(<DetailsPanel />)
    expect(screen.getByTestId('details-panel')).toBeInTheDocument()
  })
})
