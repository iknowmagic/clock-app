import React from 'react'
import type { HomeProps } from './Home.types'
import Navbar from '@/components/Navbar'
import { FaReact, FaBolt, FaPaintBrush } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss } from 'react-icons/si'
import { GiBearHead } from 'react-icons/gi'
import { motion } from 'framer-motion'

export const Home: React.FC<HomeProps> = (_props) => {
  return (
    <div data-testid="home">
      <Navbar />

      <section className="bg-base-200 min-h-screen hero">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-bold text-5xl">ReactCraft</h1>
              <p className="py-6">
                A modern React toolkit for building beautiful, responsive web
                applications. Start your next project with a solid foundation.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 px-4 py-16">
        <h2 className="mb-12 font-bold text-3xl text-center">
          Powerful Features, Ready to Use
        </h2>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-6xl">
          <div className="bg-base-200 shadow-md hover:shadow-lg transition-all card">
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <FaReact className="w-12 h-12 text-primary" />
              </div>
              <h3 className="justify-center card-title">React 19</h3>
              <p className="text-center">
                Built with the latest React features including improved
                rendering performance and hooks.
              </p>
            </div>
          </div>

          <div className="bg-base-200 shadow-md hover:shadow-lg transition-all card">
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <SiTypescript className="w-12 h-12 text-primary" />
              </div>
              <h3 className="justify-center card-title">TypeScript</h3>
              <p className="text-center">
                Full type safety for more reliable code and better developer
                experience.
              </p>
            </div>
          </div>

          <div className="bg-base-200 shadow-md hover:shadow-lg transition-all card">
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <FaBolt className="w-12 h-12 text-primary" />
              </div>
              <h3 className="justify-center card-title">Vite</h3>
              <p className="text-center">
                Lightning-fast development with HMR and optimized production
                builds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-300 px-4 py-16">
        <h2 className="mb-8 font-bold text-2xl text-center">
          Styling & State Management
        </h2>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl">
          <div className="bg-base-100 shadow-md hover:shadow-lg transition-all card">
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <SiTailwindcss className="w-12 h-12 text-secondary" />
              </div>
              <h3 className="justify-center card-title">Tailwind & DaisyUI</h3>
              <p className="text-center">
                Utility-first CSS framework with themeable components. Try
                changing the theme with the toggle in the navbar!
              </p>
            </div>
          </div>

          <div className="bg-base-100 shadow-md hover:shadow-lg transition-all card">
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <GiBearHead className="w-12 h-12 text-secondary" />
              </div>
              <h3 className="justify-center card-title">Zustand</h3>
              <p className="text-center">
                Simple state management without boilerplate. Perfect for shared
                application state.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 px-4 py-16">
        <h2 className="mb-8 font-bold text-2xl text-center">
          Developer Experience
        </h2>
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-4">
            <FaPaintBrush className="w-12 h-12 text-accent" />
          </div>
          <p className="mb-8">
            ReactCraft is designed with developer experience in mind. Generate
            components with Plop, use standardized commits with Commitizen, and
            ensure code quality with ESLint and Prettier.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="badge badge-primary">ESLint</span>
            <span className="badge badge-secondary">Prettier</span>
            <span className="badge badge-accent">Husky</span>
            <span className="badge badge-info">Vitest</span>
            <span className="badge badge-success">Storybook</span>
            <span className="badge badge-warning">Plop</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
