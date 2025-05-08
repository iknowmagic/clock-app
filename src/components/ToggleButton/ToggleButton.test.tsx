import { render, screen } from '@testing-library/react'
import ToggleButton from './ToggleButton'

describe('ToggleButton', () => {
  it('should render the component', () => {
    render(<ToggleButton expanded={false} onToggle={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should display "More" text when not expanded', () => {
    render(<ToggleButton expanded={false} onToggle={() => {}} />)
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  it('should display "Less" text when expanded', () => {
    render(<ToggleButton expanded={true} onToggle={() => {}} />)
    expect(screen.getByText('Less')).toBeInTheDocument()
  })
})
