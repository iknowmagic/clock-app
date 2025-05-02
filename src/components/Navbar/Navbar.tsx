import React from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import type { NavbarProps } from './Navbar.types'
import { HiX } from 'react-icons/hi'

const menuItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export const Navbar: React.FC<NavbarProps> = (_props) => {
  return (
    <div
      className="top-0 z-50 sticky bg-base-100 shadow-sm"
      data-testid="navbar"
    >
      {/* mobile drawer */}
      <div className="lg:hidden drawer">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="px-4 navbar">
            <div className="lg:hidden flex-none">
              <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <a className="text-xl btn btn-ghost" href="/">
                ReactCraft
              </a>
            </div>
            <div className="flex-none">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="z-50 drawer-side">
          <label htmlFor="nav-drawer" className="drawer-overlay" />

          {/* close icon next to the drawer panel */}
          <div className="lg:hidden top-4 left-64 z-50 fixed">
            <label
              htmlFor="nav-drawer"
              className="ml-4 p-0 w-8 h-8 text-xl btn btn-neutral btn-sm"
              aria-label="Close menu"
            >
              <HiX />
            </label>
          </div>

          <div className="bg-base-200 p-4 w-64 min-h-full text-base-content menu">
            <ul className="space-y-2">
              {menuItems.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* desktop navbar */}
      <div className="hidden lg:flex justify-between items-center px-8 h-16">
        <a className="font-bold text-xl" href="/">
          ReactCraft
        </a>
        <ul className="gap-6 text-base menu menu-horizontal">
          {menuItems.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar
