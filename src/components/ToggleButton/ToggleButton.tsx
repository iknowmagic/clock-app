import React from 'react'
import { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  expanded,
  onToggle,
}) => {
  return (
    <div className="flex justify-center md:justify-end mt-auto mb-12">
      <button
        onClick={onToggle}
        className="flex items-center gap-4 bg-white/80 hover:bg-white/100 shadow-lg px-6 py-3 rounded-full font-semibold text-gray-800 uppercase tracking-widest transition-all duration-300"
      >
        <span>{expanded ? 'Less' : 'More'}</span>
        <span
          className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
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
  )
}

export default ToggleButton
