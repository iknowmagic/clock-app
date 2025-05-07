import React from 'react'
import { useAppStore } from '@/store/appStore'
import type { VButtonProps } from './VButton.types'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

export const VButton: React.FC<VButtonProps> = () => {
  const { showFooter, setShowFooter } = useAppStore()

  const handleClick = () => {
    setShowFooter(!showFooter)
  }

  return (
    <div
      data-testid="v-button"
      className={`btn-more ${showFooter ? 'btn-open' : ''}`}
      onClick={handleClick}
    >
      <div className="btn-text">{showFooter ? 'less' : 'more'}</div>
      <div className="btn-caret">
        {showFooter ? (
          <FaAngleDoubleUp size={32} />
        ) : (
          <FaAngleDoubleDown size={32} />
        )}
      </div>
    </div>
  )
}

export default VButton
