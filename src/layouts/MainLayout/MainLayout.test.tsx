import React from 'react' // Required for JSX
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import axios from 'axios'
import MainLayout from './MainLayout'
import { useAppStore } from '@/store/appStore'

// Mock dependencies
vi.mock('axios')
vi.mock('@/store/appStore', () => ({
  useAppStore: vi.fn(),
}))
vi.mock('@/components/VButton', () => ({
  default: () => <div data-testid="v-button-mock">VButton Mock</div>,
}))

// Enhanced Framer Motion mock for better animation testing
vi.mock('framer-motion', () => {
  const actual = vi.importActual('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({
        children,
        ...props
      }: {
        children: React.ReactNode
        [key: string]: any
      }) => {
        // Extract the animate and exit props for test assertions
        const { initial, animate, exit, ...otherProps } = props
        return (
          <div
            data-initial={JSON.stringify(initial)}
            data-animate={JSON.stringify(animate)}
            data-exit={JSON.stringify(exit)}
            {...otherProps}
          >
            {children}
          </div>
        )
      },
    },
  }
})

describe('MainLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock app store
    vi.mocked(useAppStore).mockReturnValue({
      showFooter: false,
      setShowFooter: vi.fn(),
    })

    // Mock API responses
    vi.mocked(axios.get).mockImplementation((url) => {
      if (url.includes('api.ipgeolocation.io')) {
        return Promise.resolve({
          data: {
            time_zone: {
              name: 'America/New_York',
              current_time: '2023-04-01T12:00:00-04:00',
            },
            city: 'New York',
            country_code2: 'US',
          },
        })
      } else if (url.includes('/api/quote')) {
        return Promise.resolve({
          data: {
            text: 'Test quote',
            author: 'Test author',
          },
        })
      }

      return Promise.reject(new Error('Not found'))
    })
  })

  it('should render a loader initially', () => {
    render(<MainLayout />)

    // Initially should show a loader
    expect(document.querySelector('.lds-dual-ring')).toBeInTheDocument()
  })

  it.skip('should render the time and quote after loading', async () => {
    render(<MainLayout />)

    // Wait for the data to load
    await waitFor(() => {
      expect(document.querySelector('.lds-dual-ring')).not.toBeInTheDocument()
    })

    // Check if time components are rendered
    await waitFor(() => {
      expect(screen.getByText(/good/i)).toBeInTheDocument()
    })
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'div' &&
          element?.classList.contains('greeting-text') &&
          content.includes('Good')
        )
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('New York, US')).toBeInTheDocument()

    // Check if quote is rendered
    expect(screen.getByText('Test quote')).toBeInTheDocument()
    expect(screen.getByText('Test author')).toBeInTheDocument()

    // Check if VButton is rendered
    expect(screen.getByTestId('v-button-mock')).toBeInTheDocument()
  })

  it('should render the footer when showFooter is true', async () => {
    // Update the mock to return showFooter as true
    vi.mocked(useAppStore).mockReturnValue({
      showFooter: true,
      setShowFooter: vi.fn(),
    })

    render(<MainLayout />)

    // Wait for the data to load
    await waitFor(() => {
      expect(document.querySelector('.lds-dual-ring')).not.toBeInTheDocument()
    })

    // Check if the footer is visible
    expect(screen.getByText('Current timezone')).toBeInTheDocument()
    expect(screen.getByText('Day of the year')).toBeInTheDocument()
    expect(screen.getByText('Day of the week')).toBeInTheDocument()
    expect(screen.getByText('Week number')).toBeInTheDocument()
  })

  it('should apply evening class when appropriate', async () => {
    // Mock a time in the evening
    vi.mocked(axios.get).mockImplementation((url) => {
      if (url.includes('api.ipgeolocation.io')) {
        return Promise.resolve({
          data: {
            time_zone: {
              name: 'America/New_York',
              current_time: '2023-04-01T20:00:00-04:00', // 8 PM, evening time
            },
            city: 'New York',
            country_code2: 'US',
          },
        })
      }
      return Promise.resolve({ data: { text: 'Test', author: 'Test' } })
    })

    render(<MainLayout />)

    // Wait for the data to load
    await waitFor(() => {
      expect(document.querySelector('.lds-dual-ring')).not.toBeInTheDocument()
    })

    await waitFor(
      () => {
        // Wait for time processing to complete
        expect(document.querySelector('.greeting-text')).toBeInTheDocument()
      },
      { timeout: 2000 },
    )

    // Also ensure that the test waits for the evening class to be applied:
    await waitFor(
      () => {
        const mainElement = document.querySelector('.main')
        expect(mainElement).not.toBeNull()
        if (mainElement) {
          expect(mainElement.classList.contains('evening')).toBe(true)
        }
      },
      { timeout: 2000 },
    )
  })
})
