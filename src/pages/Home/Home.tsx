import React from 'react'
import type { HomeProps } from './Home.types'
import Navbar from '@/components/Navbar'
import ScrollTop from '@/components/ScrollTop'
import { motion } from 'framer-motion'

export const Home: React.FC<HomeProps> = (_props) => {
  return (
    <div data-testid="home">
      <Navbar />
      <ScrollTop />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero"
      >
        <h1>Clock App</h1>
        <p>Track time with real-time updates and location-based features</p>
      </motion.section>
    </div>
  )
}

export default Home
