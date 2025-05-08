import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DetailsPanelProps } from './DetailsPanel.types'

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  timeData,
  expanded,
}) => {
  return (
    <div className="right-0 bottom-0 left-0 absolute w-full">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="bg-white bg-opacity-90 shadow-lg p-6 md:p-10 rounded-t-lg text-gray-800"
          >
            <div className="gap-6 md:gap-8 grid grid-cols-2 md:grid-cols-4 max-h-[40vh] overflow-auto">
              <div>
                <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                  Current timezone
                </h3>
                <p className="font-bold text-xl md:text-2xl">
                  {timeData.timezone.replace(/_/g, ' ')}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                  Day of the year
                </h3>
                <p className="font-bold text-xl md:text-2xl">
                  {timeData.day_of_year}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                  Day of the week
                </h3>
                <p className="font-bold text-xl md:text-2xl">
                  {timeData.day_of_week}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-gray-500 text-xs uppercase tracking-widest">
                  Week number
                </h3>
                <p className="font-bold text-xl md:text-2xl">
                  {timeData.week_number}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DetailsPanel
