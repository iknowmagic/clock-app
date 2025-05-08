import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuoteSection from './QuoteSection'
import { mockQuote } from '@/test/test-utils'

describe('QuoteSection', () => {
  it('should render the component with quote', () => {
    const mockRefresh = vi.fn()

    render(
      <QuoteSection
        quote={mockQuote}
        loaded={true}
        refreshing={false}
        onRefresh={mockRefresh}
        visible={true}
      />,
    )

    // Use a more flexible way to find text since quotes may be rendered with HTML entities
    expect(
      screen.getByText((content) => content.includes(mockQuote.text)),
    ).toBeInTheDocument()
    expect(screen.getByText(mockQuote.author)).toBeInTheDocument()
  })

  it('should call refresh function when refresh button is clicked', () => {
    const mockRefresh = vi.fn()

    render(
      <QuoteSection
        quote={mockQuote}
        loaded={true}
        refreshing={false}
        onRefresh={mockRefresh}
        visible={true}
      />,
    )

    // Find and click the refresh button
    const refreshButton = screen.getByRole('button')
    fireEvent.click(refreshButton)

    // Verify the refresh function was called
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('should not render content when not visible', () => {
    render(
      <QuoteSection
        quote={mockQuote}
        loaded={true}
        refreshing={false}
        onRefresh={() => {}}
        visible={false}
      />,
    )

    // Use a more flexible way to check absence of text
    expect(
      screen.queryByText((content) => content.includes(mockQuote.text)),
    ).not.toBeInTheDocument()
  })
})
