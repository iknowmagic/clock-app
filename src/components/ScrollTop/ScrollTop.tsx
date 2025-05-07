import React, { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

interface ScrollTopProps {
  children?: ReactNode
}

export const ScrollTop: React.FC<ScrollTopProps> = ({
  children = <FaArrowUp size={24} />,
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="scroll-top-button"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#303030',
            color: 'white',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollTop
