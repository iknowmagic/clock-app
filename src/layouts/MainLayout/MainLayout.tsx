import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import VButton from '@/components/VButton'
import type { MainLayoutProps } from './MainLayout.types'
import { FaMoon, FaSun } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import timeService from '@/services/TimeService'

export const MainLayout: React.FC<MainLayoutProps> = ({
  children: _children,
}) => {
  const { showFooter } = useAppStore()
  const [timeLoaded, setTimeLoaded] = useState(false)
  const [quoteLoaded, setQuoteLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null,
  )
  const [timeObj, setTimeObj] = useState<{
    timezone: string
    datetime: string
    city: string
    country: string
    day_of_year?: number
    day_of_week?: number
    week_number?: number
  }>({
    timezone: '',
    datetime: '',
    city: 'New York',
    country: 'US',
    day_of_year: 0,
    day_of_week: 0,
    week_number: 0,
  })
  const [clock, setClock] = useState<{
    hour: string
    minute: string
    timezone: string
  }>({
    hour: '00',
    minute: '00',
    timezone: 'UTC',
  })
  const [greetingTime, setGreetingTime] = useState<string>('')
  const [intervalId, setIntervalId] = useState<number | null>(null)

  const updateTime = useCallback(() => {
    if (!timeObj.datetime) return

    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Update the datetime
    const newTimeObj = {
      ...timeObj,
      datetime: date.toISOString(),
      day_of_year: Math.ceil(
        (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
          86400000,
      ),
      day_of_week: date.getDay(),
      week_number: Math.ceil(
        (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
          604800000,
      ),
    }

    setTimeObj(newTimeObj)

    // Update the clock
    if (newTimeObj.timezone) {
      setClock({
        hour: hours,
        minute: minutes,
        timezone: newTimeObj.timezone,
      })
    }

    // Update greeting based on hour
    const hourNum = parseInt(hours, 10)
    if (hourNum >= 5 && hourNum < 12) {
      setGreetingTime('morning')
    } else if (hourNum >= 12 && hourNum < 18) {
      setGreetingTime('afternoon')
    } else {
      setGreetingTime('evening')
    }
  }, [timeObj])

  const refreshQuote = () => {
    if (refreshing) return

    setRefreshing(true)
    timeService.getQuote().then((quoteData) => {
      setQuote(quoteData)
      setTimeout(() => setRefreshing(false), 500)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeData = await timeService.getTimeData()
        setTimeObj(timeData)
        setTimeLoaded(true)

        const quoteData = await timeService.getQuote()
        setQuote(quoteData)
        setQuoteLoaded(true)
      } catch (error) {
        console.error('Error fetching data:', error)
        setTimeLoaded(true) // Ensure UI doesn't hang
      }
    }

    fetchData()

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLoaded && !intervalId) {
      const id = setInterval(updateTime, 1000)
      setIntervalId(Number(id))
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [timeLoaded, intervalId, updateTime])

  if (!timeLoaded) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
        <div>Loading...</div>
      </div>
    )
  }

  const isEvening = greetingTime === 'evening'

  return (
    <div
      data-testid="main-layout"
      className={`main ${isEvening ? 'evening' : ''} ${
        showFooter ? 'main-open' : ''
      }`}
    >
      <div className="main-header">
        <AnimatePresence>
          {!showFooter && quoteLoaded && quote && (
            <motion.div
              className="quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="quote-text">&quot;{quote.text}&quot;</p>
              <p className="quote-author">{quote.author || 'Unknown'}</p>
              <MdRefresh
                className={`quote-refresh ${
                  refreshing ? 'animate__animated animate__rotateIn' : ''
                }`}
                onClick={refreshQuote}
                size="24px"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="main-body">
        <div className="greeting">
          {isEvening ? <FaMoon size="24px" /> : <FaSun size="24px" />}
          <h2 className="greeting-text">
            Good {greetingTime} <span>It&apos;s currently</span>
          </h2>
        </div>

        <div className="time">
          <div className="time-display">
            <span className="hour">{clock.hour}</span>
            <span>:</span>
            <span className="minute">{clock.minute}</span>
          </div>
          <div className="time-zone">{clock.timezone}</div>
        </div>

        <div className="location">
          In {timeObj.city}, {timeObj.country}
        </div>

        <VButton />
      </div>

      <AnimatePresence>
        {showFooter && (
          <motion.div
            className="main-footer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="footer-line current-timezone">
              <div className="footer-title">Current timezone</div>
              <div className="footer-value">{timeObj.timezone}</div>
            </div>
            <div className="footer-line day-of-the-year">
              <div className="footer-title">Day of the year</div>
              <div className="footer-value">{timeObj.day_of_year}</div>
            </div>
            <div className="footer-line day-of-the-week">
              <div className="footer-title">Day of the week</div>
              <div className="footer-value">{timeObj.day_of_week}</div>
            </div>
            <div className="footer-line week-number">
              <div className="footer-title">Week number</div>
              <div className="footer-value">{timeObj.week_number}</div>
            </div>
            <hr className="divider" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainLayout
