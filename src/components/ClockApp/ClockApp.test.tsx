import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ClockApp from './ClockApp'

// Mock the hooks
vi.mock('@/hooks/useTime', () => ({
  useTime: () => ({
    timeLoaded: true,
    timeData: {
      timezone: 'America/New_York',
      datetime: '2023-05-08T14:30:00.000Z',
      city: 'New York',
      country: 'US',
      day_of_year: 128,
      day_of_week: 1,
      week_number: 19,
    },
    clockData: {
      hour: '10',
      minute: '30',
      timezone: 'EST',
    },
    greetingTime: 'morning',
  }),
}))

vi.mock('@/hooks/useQuote', () => ({
  useQuote: () => ({
    quote: {
      text: 'The journey of a thousand miles begins with one step.',
      author: 'Lao Tzu',
    },
    quoteLoaded: true,
    refreshing: false,
    refreshQuote: vi.fn(),
  }),
}))

// Mock the utils
vi.mock('@/utils/backgroundSelector', () => ({
  getResponsiveBackground: () => '/test-path/bg-image.jpg',
}))

describe('ClockApp', () => {
  it('should render the component', () => {
    render(<ClockApp />)

    // Check if main components are rendered
    expect(screen.getByText(/Good morning/i)).toBeInTheDocument()
    expect(screen.getByText('10:30')).toBeInTheDocument()
    expect(screen.getByText(/In New York, US/i)).toBeInTheDocument()
  })
})
