import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import VButton from '@/components/VButton'
import type { MainLayoutProps } from './MainLayout.types'

export const MainLayout: React.FC<MainLayoutProps> = () => {
  const { showFooter } = useAppStore()
  const [timeLoaded, setTimeLoaded] = useState(false)
  const [quoteLoaded, setQuoteLoaded] = useState(false)
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null,
  )
  const [timeObj, setTimeObj] = useState<{
    timezone: string
    datetime: string
    city: string
    country: string
    day_of_year?: string
    day_of_week?: string
    week_number?: string
  }>({
    timezone: '',
    datetime: '',
    city: '',
    country: '',
  })
  const [clock, setClock] = useState<{
    hour: string
    minute: string
    timezone: string
  } | null>(null)
  const [greetingTime, setGreetingTime] = useState<string>('')
  // Setup time interval
  const [intervalId, setIntervalId] = useState<number | null>(null)

  const updateTime = useCallback(() => {
    if (!timeObj.datetime) return

    const date = new Date(timeObj.datetime)
    // Add one second to the current time
    date.setSeconds(date.getSeconds() + 1)

    // Update the datetime
    const newTimeObj = {
      ...timeObj,
      datetime: date.toISOString(),
      day_of_year: String(
        Math.floor(
          (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
            1000 /
            60 /
            60 /
            24,
        ),
      ),
      day_of_week: String(date.getDay()),
      week_number: String(
        Math.ceil(
          ((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
            86400000 +
            1) /
            7,
        ),
      ),
    }

    setTimeObj(newTimeObj)

    // Update the clock
    if (newTimeObj.timezone) {
      setClock({
        hour: date.getHours().toString(),
        minute: date.getMinutes().toString().padStart(2, '0'),
        timezone:
          Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
            .formatToParts(date)
            .find((part) => part.type === 'timeZoneName')?.value || '',
      })

      // Update greeting time
      const currentHour = date.getHours()
      if (currentHour >= 12 && currentHour < 17) {
        setGreetingTime('afternoon')
      } else if (currentHour >= 17) {
        setGreetingTime('evening')
      } else {
        setGreetingTime('morning')
      }
    }
  }, [timeObj])

  const getTime = async () => {
    setTimeLoaded(false)
    try {
      const { data } = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_GEO_IP_KEY}`,
      )

      setTimeObj({
        timezone: data.time_zone.name,
        datetime: data.time_zone.current_time,
        city: data.city,
        country: data.country_code2,
      })

      setTimeLoaded(true)
    } catch (error) {
      console.error('Error fetching time:', error)
      // Set a default time for development/testing
      const now = new Date()
      setTimeObj({
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        datetime: now.toISOString(),
        city: 'Unknown',
        country: 'US',
      })
      setTimeLoaded(true)
    }
  }

  const getQuote = async () => {
    setQuoteLoaded(false)
    try {
      const { data } = await axios.get('/api/quote')
      setQuote(data)
      setQuoteLoaded(true)
    } catch (error) {
      console.error('Error fetching quote:', error)
      // Set a default quote for development/testing
      setQuote({
        text: 'The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.',
        author: 'Ada Lovelace',
      })
      setQuoteLoaded(true)
    }
  }

  useEffect(() => {
    getTime()
    getQuote()

    return () => {
      // Clear any intervals when component unmounts
      if (intervalId) clearInterval(intervalId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLoaded && !intervalId) {
      updateTime()
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
      </div>
    )
  }

  return (
    <div
      className={`main ${showFooter ? 'main-open' : ''} ${greetingTime === 'evening' ? 'evening' : ''}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="header"
          className="main-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="quote">
            <div className="quote-text">
              {quoteLoaded ? (
                <div>{quote?.text}</div>
              ) : (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
            <div className="quote-author">{quoteLoaded && quote?.author}</div>
          </div>
          <div className="quote-refresh" onClick={getQuote}>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
                fill="#FFF"
                fillRule="nonzero"
                opacity=".5"
              />
            </svg>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="main-body">
        {timeLoaded ? (
          <>
            <div className="greeting">
              <div className="greeting-icon">
                <img
                  src={
                    greetingTime === 'evening'
                      ? '/src/assets/images/desktop/icon-moon.svg'
                      : '/src/assets/images/desktop/icon-sun.svg'
                  }
                  alt={greetingTime === 'evening' ? 'moon' : 'sun'}
                />
              </div>
              <div className="greeting-text">
                Good {greetingTime}
                <span>, it&apos;s currently</span>
              </div>
            </div>

            {clock && (
              <div className="time">
                <div className="time-display">
                  <div className="time-hour">{clock.hour}</div>
                  <div className="time-colon">:</div>
                  <div className="time-minute">{clock.minute}</div>
                </div>
                <div className="time-zone">{clock.timezone}</div>
              </div>
            )}

            <div className="location">
              In {timeObj.city}, {timeObj.country}
            </div>
            <VButton />
          </>
        ) : (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFooter && (
          <motion.div
            className="main-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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
            <div className="divider"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainLayout
