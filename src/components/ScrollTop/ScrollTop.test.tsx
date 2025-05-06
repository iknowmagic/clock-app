import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'
import { vi } from 'vitest'
import ScrollTop from './ScrollTop'

describe('ScrollTop', () => {
  // Save the original window.scroll and window.scrollY
  const originalScroll = window.scroll
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')
  const originalPageYOffset = Object.getOwnPropertyDescriptor(
    window,
    'pageYOffset',
  )

  beforeEach(() => {
    // Mock window.scrollY to simulate scrolling
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })

    // Mock window.scroll with a proper spy
    window.scroll = vi.fn()

    // Also mock window.pageYOffset for the scroll animation
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 1500,
    })
  })

  afterEach(() => {
    // Restore original methods
    window.scroll = originalScroll

    if (originalScrollY) {
      Object.defineProperty(window, 'scrollY', originalScrollY)
    }

    if (originalPageYOffset) {
      Object.defineProperty(window, 'pageYOffset', originalPageYOffset)
    }
  })

  it('should not be visible initially', () => {
    render(<ScrollTop>Scroll to top</ScrollTop>)

    expect(screen.queryByTestId('scroll-top')).not.toBeInTheDocument()
  })

  it('should become visible when scrolled down enough', () => {
    render(<ScrollTop>Scroll to top</ScrollTop>)

    // Simulate scrolling down
    act(() => {
      window.scrollY = 1001
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('scroll-top')).toBeInTheDocument()
    expect(screen.getByText('Scroll to top')).toBeInTheDocument()
  })

  it('should trigger scrollTop when clicked', async () => {
    render(<ScrollTop>Scroll to top</ScrollTop>)

    // Simulate scrolling down
    act(() => {
      window.scrollY = 1500
      window.dispatchEvent(new Event('scroll'))
    })

    // Wait for component to appear
    await waitFor(() => {
      expect(screen.getByTestId('scroll-top')).toBeInTheDocument()
    })

    // Find and click the button
    fireEvent.click(screen.getByTestId('scroll-top'))

    // Use waitFor to account for the timeouts in the scrollTop function
    await waitFor(
      () => {
        expect(window.scroll).toHaveBeenCalled()
      },
      { timeout: 100 },
    )
  })

  test('should hide when scrolled back up', async () => {
    render(<ScrollTop>Scroll to top</ScrollTop>)

    // Simulate scrolling down
    act(() => {
      window.scrollY = 1500
      window.dispatchEvent(new Event('scroll'))
    })

    // Verify it's visible
    await waitFor(() => {
      expect(screen.getByTestId('scroll-top')).toBeInTheDocument()
    })

    // Simulate scrolling back up
    act(() => {
      window.scrollY = 500
      window.dispatchEvent(new Event('scroll'))
    })

    // The component is completely removed from the DOM due to AnimatePresence
    // so we should check that it's not in the document after the animation
    await waitFor(
      () => {
        expect(screen.queryByTestId('scroll-top')).not.toBeInTheDocument()
      },
      { timeout: 500 },
    )
  })
})
