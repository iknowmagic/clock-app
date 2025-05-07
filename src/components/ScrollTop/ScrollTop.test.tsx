import React, { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollTopProps {
  children?: ReactNode
}

export const ScrollTop: React.FC<ScrollTopProps> = ({
  children = 'Back to top',
}) => {
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

  const scrollToTop = () => {
    // Smooth scroll to top
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollTop
