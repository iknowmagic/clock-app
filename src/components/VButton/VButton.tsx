import React from 'react'
import { useAppStore } from '../../store/appStore'
import type { VButtonProps } from './VButton.types'

export const VButton: React.FC<VButtonProps> = () => {
  const { showFooter, setShowFooter } = useAppStore()

  const handleClick = () => {
    setShowFooter(!showFooter)
  }

  return (
    <div
      className={`btn-more ${showFooter ? 'btn-open' : ''}`}
      onClick={handleClick}
      data-testid="v-button"
    >
      <div className="btn-text">
        <div>{!showFooter ? 'more' : 'less'}</div>
      </div>
      <div className="btn-caret">
        <img src="/src/assets/images/desktop/icon-arrow-up.svg" alt="caret" />
      </div>
    </div>
  )
}

export default VButton
