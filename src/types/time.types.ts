export interface TimeData {
  timezone: string
  datetime: string
  city: string
  country: string
  day_of_year: number
  day_of_week: number
  week_number: number
}

export interface ClockData {
  hour: string
  minute: string
  timezone: string
}

export type GreetingTime = 'morning' | 'afternoon' | 'evening'
