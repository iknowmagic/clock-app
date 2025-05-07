import { useState, useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout'
import { motion, AnimatePresence } from 'framer-motion'

// Import loader images
import loaderLight from '@/assets/images/loader-light.gif'

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
          <img src={loaderLight} alt="Loading..." className="loader-image" />
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
