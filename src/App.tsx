import { useState, useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loader"
        >
          <div className="lds-dual-ring"></div>
          <div>Initializing...</div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MainLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
