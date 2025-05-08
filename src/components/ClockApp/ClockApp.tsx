import React, { useState } from 'react'
import { ClockAppProps } from './ClockApp.types'
import { useTime } from '@/hooks/useTime'
import { useQuote } from '@/hooks/useQuote'
import { getResponsiveBackground } from '@/utils/backgroundSelector'
import QuoteSection from '@/components/QuoteSection'
import ClockDisplay from '@/components/ClockDisplay'
import ToggleButton from '@/components/ToggleButton'
import DetailsPanel from '@/components/DetailsPanel'

const ClockApp: React.FC<ClockAppProps> = () => {
  const [showFooter, setShowFooter] = useState(false)
  const { timeLoaded, timeData, clockData, greetingTime } = useTime()
  const { quote, quoteLoaded, refreshing, refreshQuote } = useQuote()

  // Toggle footer visibility
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
  const bgImage = getResponsiveBackground(isEvening)

  return (
    <div
      className="relative bg-cover bg-no-repeat bg-center h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        transition: 'background-image 1s ease',
      }}
    >
      {/* Content container with transitions */}
      <div
        className={`h-full transition-all duration-500 ${
          showFooter ? 'transform translate-y-[-20vh]' : ''
        }`}
      >
        {/* Main content container */}
        <div className="relative flex flex-col mx-auto px-4 md:px-8 lg:px-16 py-8 max-w-screen-xl h-full text-white">
          {/* Quote Section */}
          <QuoteSection
            quote={quote}
            loaded={quoteLoaded}
            refreshing={refreshing}
            onRefresh={refreshQuote}
            visible={!showFooter}
          />

          {/* Clock Display */}
          <ClockDisplay
            clockData={clockData}
            timeData={timeData}
            greetingTime={greetingTime}
            isFooterExpanded={showFooter}
          />

          {/* Toggle Button */}
          <ToggleButton expanded={showFooter} onToggle={toggleFooter} />
        </div>
      </div>

      {/* Details Panel */}
      <DetailsPanel timeData={timeData} expanded={showFooter} />
    </div>
  )
}

export default ClockApp
