// import axios from 'axios'

// Type definitions
export interface TimeResponse {
  timezone: string
  datetime: string
  city: string
  country: string
  day_of_year?: number
  day_of_week?: number
  week_number?: number
}

export interface QuoteResponse {
  text: string
  author: string
}

class TimeService {
  // Fetch time data from geolocation API
  async getTimeData(): Promise<TimeResponse> {
    try {
      // In a real implementation, replace with your actual API key
      // We're simulating the API response here with a fallback mechanism
      // const API_KEY = import.meta.env.VITE_GEO_IP_KEY;
      // const { data } = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);

      // For development/demo purposes, we'll create a simulated response
      const date = new Date()
      return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: date.toISOString(),
        city: 'New York',
        country: 'US',
        day_of_year: this.calculateDayOfYear(date),
        day_of_week: date.getDay(),
        week_number: this.calculateWeekNumber(date),
      }
    } catch (error) {
      console.error('Error fetching time data:', error)
      // Fallback data in case of API error
      const date = new Date()
      return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: date.toISOString(),
        city: 'Unknown',
        country: 'Unknown',
        day_of_year: this.calculateDayOfYear(date),
        day_of_week: date.getDay(),
        week_number: this.calculateWeekNumber(date),
      }
    }
  }

  // Fetch inspirational quote
  async getQuote(): Promise<QuoteResponse> {
    try {
      // In a real implementation, this would call an actual API
      // const { data } = await axios.get('/api/quote');

      // For development/demo purposes, return a hardcoded quote
      return {
        text: 'The journey of a thousand miles begins with one step.',
        author: 'Lao Tzu',
      }
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error fetching quote:', error)
      return {
        text: 'Failed to load inspirational quote.',
        author: 'Error',
      }
    }
  }

  // Helper functions
  private calculateDayOfYear(date: Date): number {
    return Math.ceil(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
        86400000,
    )
  }

  private calculateWeekNumber(date: Date): number {
    return Math.ceil(
      (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
        604800000,
    )
  }
}

export const timeService = new TimeService()
export default timeService
