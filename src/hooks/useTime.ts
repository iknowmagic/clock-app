import { useState, useCallback, useEffect } from 'react'
import { TimeData, ClockData, GreetingTime } from '../types/time.types'
import { TimezoneResponse } from '../types/api.types'
import {
  calculateDayOfYear,
  calculateWeekNumber,
} from '@/utils/timeCalculations'

export function useTime() {
  const [timeLoaded, setTimeLoaded] = useState(false)
  const [timeData, setTimeData] = useState<TimeData>({
    timezone: '',
    datetime: '',
    city: 'Unknown',
    country: 'Unknown',
    day_of_year: 0,
    day_of_week: 0,
    week_number: 0,
  })
  const [clockData, setClockData] = useState<ClockData>({
    hour: '00',
    minute: '00',
    timezone: '',
  })
  const [greetingTime, setGreetingTime] = useState<GreetingTime>('morning')

  // Update time immediately based on current date
  const updateTimeImmediate = useCallback(() => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Update clock display
    setClockData({
      hour: hours,
      minute: minutes,
      timezone: timeData.timezone.replace('_', ' '),
    })

    // Update greeting based on hour
    const hourNum = parseInt(hours, 10)
    if (hourNum >= 5 && hourNum < 12) {
      setGreetingTime('morning')
    } else if (hourNum >= 12 && hourNum < 18) {
      setGreetingTime('afternoon')
    } else {
      setGreetingTime('evening')
    }
  }, [timeData.timezone])

  // Regular time update function
  const updateTime = useCallback(() => {
    if (!timeData.datetime) return

    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Update time data
    const newTimeData = {
      ...timeData,
      datetime: date.toISOString(),
      day_of_year: calculateDayOfYear(date),
      day_of_week: date.getDay(),
      week_number: calculateWeekNumber(date),
    }

    setTimeData(newTimeData)

    // Update clock display
    setClockData({
      hour: hours,
      minute: minutes,
      timezone: newTimeData.timezone.replace(/_/g, ' '),
    })

    // Update greeting
    const hourNum = parseInt(hours, 10)
    if (hourNum >= 5 && hourNum < 12) {
      setGreetingTime('morning')
    } else if (hourNum >= 12 && hourNum < 18) {
      setGreetingTime('afternoon')
    } else {
      setGreetingTime('evening')
    }
  }, [timeData])

  // Fetch time data from API
  const fetchTimeData = useCallback(async () => {
    try {
      const response = await fetch('/api/timezone')

      if (!response.ok) {
        throw new Error('Failed to fetch timezone data')
      }

      const data = (await response.json()) as TimezoneResponse

      const date = new Date()
      setTimeData({
        timezone:
          data.time_zone?.name ||
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: date.toISOString(),
        city: data.city || 'Unknown',
        country: data.country_code2 || 'Unknown',
        day_of_year: calculateDayOfYear(date),
        day_of_week: date.getDay(),
        week_number: calculateWeekNumber(date),
      })

      // Update clock immediately after getting time data
      updateTimeImmediate()
      setTimeLoaded(true)
    } catch (error) {
      console.error('Error getting time data:', error)

      // Fallback to browser time on error
      const date = new Date()
      setTimeData({
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: date.toISOString(),
        city: 'Unknown',
        country: 'Unknown',
        day_of_year: calculateDayOfYear(date),
        day_of_week: date.getDay(),
        week_number: calculateWeekNumber(date),
      })

      updateTimeImmediate()
      setTimeLoaded(true)
    }
  }, [updateTimeImmediate])

  // Initialize time data when component mounts
  useEffect(() => {
    fetchTimeData()

    return () => {
      // Any necessary cleanup
    }
  }, [fetchTimeData])

  // Update time every second once data is loaded
  useEffect(() => {
    if (timeLoaded) {
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }
  }, [timeLoaded, updateTime])

  return {
    timeLoaded,
    timeData,
    clockData,
    greetingTime,
  }
}
