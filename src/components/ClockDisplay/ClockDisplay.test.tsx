import { render, screen } from '@testing-library/react'
import ClockDisplay from './ClockDisplay'
import { mockClockData, mockTimeData } from '@/test/test-utils'

describe('ClockDisplay', () => {
  it('should render the component', () => {
    render(
      <ClockDisplay
        clockData={mockClockData}
        timeData={mockTimeData}
        greetingTime="morning"
        isFooterExpanded={false}
      />,
    )

    // Check for the time display
    expect(
      screen.getByText(`${mockClockData.hour}:${mockClockData.minute}`),
    ).toBeInTheDocument()

    // Check for the greeting
    expect(screen.getByText(/Good morning/i)).toBeInTheDocument()

    // Check for the location
    expect(
      screen.getByText(`In ${mockTimeData.city}, ${mockTimeData.country}`),
    ).toBeInTheDocument()
  })
})
