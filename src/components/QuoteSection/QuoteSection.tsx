import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuoteSectionProps } from './QuoteSection.types'

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  quote,
  loaded,
  refreshing,
  onRefresh,
  visible,
}) => {
  return (
    <div className="mb-auto pb-8" data-testid="quote-section">
      <AnimatePresence>
        {visible && loaded && quote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-between items-start"
          >
            <div className="max-w-[80%]">
              <p className="drop-shadow-md mb-2 text-lg">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="drop-shadow-md font-bold">
                {quote.author || 'Unknown'}
              </p>
            </div>
            <button
              onClick={onRefresh}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuoteSection
