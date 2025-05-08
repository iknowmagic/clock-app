import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// CSS classes are used instead of direct imports
// Remove unused imports
const ClockApp = () => {
  // State management
  const [timeLoaded, setTimeLoaded] = useState(false)
  const [quoteLoaded, setQuoteLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [quote, setQuote] = useState({ text: '', author: '' })
  const [timeObj, setTimeObj] = useState({
    timezone: '',
    datetime: '',
    city: '',
    country: '',
    day_of_year: 0,
    day_of_week: 0,
    week_number: 0,
  })
  const [clock, setClock] = useState({
    hour: '00',
    minute: '00',
    timezone: '',
  })
  const [greetingTime, setGreetingTime] = useState('')

  // Update time immediately without waiting for interval
  const updateTimeImmediate = useCallback(() => {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Update the clock
    setClock({
      hour: hours,
      minute: minutes,
      timezone: timeObj.timezone.replace('_', ' '),
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
  }, [timeObj.timezone])

  // Update time
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
        timezone: newTimeObj.timezone.replace(/_/g, ' '),
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

  // Get time data
  const getTime = useCallback(async () => {
    try {
      // In a real app, this would fetch from a timezone API
      const date = new Date()

      // Using optional chaining to handle potential undefined
      const timezone =
        Intl.DateTimeFormat()?.resolvedOptions()?.timeZone || 'UTC'

      setTimeObj({
        timezone,
        datetime: date.toISOString(),
        city: 'New York', // Match city and timezone consistently
        country: 'US',
        day_of_year: Math.ceil(
          (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
            86400000,
        ),
        day_of_week: date.getDay(),
        week_number: Math.ceil(
          (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
            604800000,
        ),
      })

      // Update clock immediately
      updateTimeImmediate()

      setTimeLoaded(true)
    } catch (error) {
      console.error('Error getting time:', error)
      setTimeLoaded(true) // Still set loaded so UI doesn't hang
    }
  }, [updateTimeImmediate])

  // Get quote data
  const getQuote = async () => {
    setQuoteLoaded(false)
    try {
      // Hardcoded quote for demo
      const quoteData = {
        text: 'The journey of a thousand miles begins with one step.',
        author: 'Lao Tzu',
      }
      setQuote(quoteData)
      setQuoteLoaded(true)
    } catch (error) {
      console.error('Error getting quote:', error)
      setQuote({ text: 'Failed to load quote', author: 'Error' })
      setQuoteLoaded(true)
    }
  }

  // Initialize and load data
  useEffect(() => {
    getTime()
    getQuote()

    return () => {
      // Cleanup if needed
    }
  }, [getTime]) // Added getTime to dependencies

  // Update time every second
  useEffect(() => {
    if (timeLoaded) {
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }
  }, [timeLoaded, updateTime]) // Added updateTime to dependencies

  // Refresh quote
  const refreshQuote = () => {
    if (refreshing) return

    setRefreshing(true)
    getQuote().then(() => {
      setTimeout(() => setRefreshing(false), 500)
    })
  }

  // Toggle footer
  const toggleFooter = () => {
    setShowFooter(!showFooter)
  }

  if (!timeLoaded) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-blue-100 text-gray-800">
        <div className="text-center">
          <div className="mx-auto mb-4 border-4 border-gray-800 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          <div className="text-lg">Loading your time data...</div>
        </div>
      </div>
    )
  }

  const isEvening = greetingTime === 'evening'

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen"
      style={{
        // Use direct relative paths instead of @/ alias
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                         url('/src/assets/images/${isEvening ? 'desktop/bg-image-nighttime.jpg' : 'desktop/bg-image-daytime.jpg'}')`,
        transition: 'background-image 1s ease',
      }}
    >
      {/* Content container */}
      <div className="relative mx-auto px-4 md:px-8 lg:px-16 py-8 max-w-screen-xl text-white">
        {/* Quote Section */}
        <AnimatePresence>
          {!showFooter && quoteLoaded && quote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12 md:mb-20"
            >
              <div className="flex justify-between items-start">
                <div className="max-w-[80%]">
                  <p className="drop-shadow-md mb-2 text-lg">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="drop-shadow-md font-bold">
                    {quote.author || 'Unknown'}
                  </p>
                </div>
                <button
                  onClick={refreshQuote}
                  className={`p-2 rounded-full ${refreshing ? 'animate-spin' : 'hover:bg-opacity-20 hover:bg-gray-500'}`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow"
                  >
                    <path
                      d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
                      fill="currentColor"
                      fillRule="nonzero"
                      opacity=".5"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clock Section */}
        <div className="mb-8 md:mb-16">
          <div className="flex items-center gap-3 mb-2">
            {isEvening ? (
              <svg
                width="23"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow w-6 h-6"
              >
                <path
                  d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z"
                  fill="currentColor"
                  fillRule="nonzero"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow w-6 h-6"
              >
                <path
                  d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z"
                  fill="currentColor"
                  fillRule="nonzero"
                />
              </svg>
            )}
            <h2 className="drop-shadow-md text-white text-lg uppercase tracking-widest">
              Good {greetingTime}{' '}
              <span className="hidden md:inline">It&apos;s currently</span>
            </h2>
          </div>

          <div className="flex md:flex-row flex-col md:items-end gap-2 md:gap-6">
            <div className="drop-shadow-lg font-bold text-[8rem] text-white md:text-[10rem] lg:text-[12rem] leading-none tracking-tighter">
              {clock.hour}:{clock.minute}
            </div>
            <div className="drop-shadow-md mb-2 md:mb-8 text-white text-xl md:text-3xl lg:text-4xl uppercase">
              {timeObj.timezone.replace('_', ' ')}
            </div>
          </div>

          <div className="drop-shadow-md mt-4 font-bold text-white text-lg md:text-xl uppercase tracking-widest">
            In {timeObj.city}, {timeObj.country}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center md:justify-start mt-8">
          <button
            onClick={toggleFooter}
            className="flex items-center gap-4 bg-white/80 hover:bg-white/100 shadow-lg px-6 py-3 rounded-full font-semibold text-gray-800 uppercase tracking-widest transition-all duration-300"
          >
            <span>{showFooter ? 'Less' : 'More'}</span>
            <span
              className={`transition-transform duration-300 ${showFooter ? 'rotate-180' : ''}`}
            >
              <svg width="14" height="9" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l6 6 6-6"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Footer Section - No changes needed as it already has light background */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {showFooter && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  mass: 1,
                }}
                className="bg-white bg-opacity-90 shadow-lg mt-8 p-6 md:p-10 rounded-lg text-gray-800"
              >
                <div className="gap-6 md:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                      Current timezone
                    </h3>
                    <p className="font-bold text-xl md:text-2xl">
                      {timeObj.timezone.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                      Day of the year
                    </h3>
                    <p className="font-bold text-xl md:text-2xl">
                      {timeObj.day_of_year}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                      Day of the week
                    </h3>
                    <p className="font-bold text-xl md:text-2xl">
                      {timeObj.day_of_week}
                    </p>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                      Week number
                    </h3>
                    <p className="font-bold text-xl md:text-2xl">
                      {timeObj.week_number}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ClockApp
