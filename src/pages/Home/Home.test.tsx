import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('should render the component', () => {
    render(<Home />)
    expect(screen.getByTestId('home')).toBeInTheDocument()
  })
})
