import { useState, useEffect } from 'react'
import { QuoteResponse } from '../types/api.types'

export function useQuote() {
  const [quoteLoaded, setQuoteLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [quote, setQuote] = useState<QuoteResponse>({ text: '', author: null })

  // Fetch a new quote from the API
  const fetchQuote = async () => {
    setQuoteLoaded(false)

    try {
      const response = await fetch('/api/quote')

      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }

      const quoteData = await response.json()

      // Small delay for smooth animation
      await new Promise((resolve) => setTimeout(resolve, 300))

      setQuote(quoteData)
      setQuoteLoaded(true)
    } catch (error) {
      console.error('Error getting quote:', error)

      // Fallback quotes
      const fallbackQuotes = [
        {
          text: 'The journey of a thousand miles begins with one step.',
          author: 'Lao Tzu',
        },
        {
          text: 'If you have knowledge, let others light their candles in it.',
          author: 'Margaret Fuller',
        },
        {
          text: 'There is only one success to be able to spend your life in your own way.',
          author: 'Christopher Morley',
        },
      ]

      const randomQuote =
        fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]

      setQuote(randomQuote)

      // Small delay for consistent animation
      await new Promise((resolve) => setTimeout(resolve, 300))

      setQuoteLoaded(true)
    }
  }

  // Function to refresh the quote
  const refreshQuote = () => {
    if (refreshing) return

    setRefreshing(true)
    fetchQuote().then(() => {
      setTimeout(() => setRefreshing(false), 500)
    })
  }

  // Load quote on initial mount
  useEffect(() => {
    // Short delay before fetching for consistent animation
    const timer = setTimeout(() => {
      fetchQuote()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return {
    quote,
    quoteLoaded,
    refreshing,
    refreshQuote,
  }
}
