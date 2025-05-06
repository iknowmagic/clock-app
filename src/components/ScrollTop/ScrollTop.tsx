import React, { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollTopProps {
  children?: ReactNode
}

export const ScrollTop: React.FC<ScrollTopProps> = ({ children }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', scrollListener)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  const scrollListener = () => {
    setVisible(window.scrollY > 1000)
  }

  const scrollTop = () => {
    const scrollStep = 50
    const scrollInterval = 5

    const scrollAnimation = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(scrollAnimation)
      }
      window.scroll(0, window.pageYOffset - scrollStep)
    }, scrollInterval)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="scroll-top"
          onClick={scrollTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="scroll-top"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollTop
