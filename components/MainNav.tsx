"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "/", current: true },
  {
    label: "Teaching",
    href: "/teaching",
    subItems: [
      { label: "Overview", href: "/teaching/overview" },
      { label: "Curriculum", href: "/teaching/curriculum" },
      { label: "Online Electives", href: "/teaching/online-electives" },
      { label: "Time Table", href: "/teaching/time-table" },
      { label: "Lecture Notes", href: "/teaching/lecture-notes" },
      { label: "Best Projects", href: "/teaching/best-projects" },
    ],
  },
  {
    label: "People",
    href: "/people",
    subItems: [
      { label: "Faculty", href: "/people/faculty" },
      { label: "Staff", href: "/people/staff" },
      { label: "Research Scholars", href: "/people/research-scholars" },
      {
        label: "Alumni",
        href: "/people/alumni",
        subItems: [
          { label: "In Abroad", href: "/people/alumni/abroad" },
          { label: "In India", href: "/people/alumni/india" },
        ],
      },
    ],
  },
  {
    label: "Research",
    href: "/research",
    subItems: [
      { label: "Overview", href: "/research/overview" },
      { label: "Sponsored Research", href: "/research/sponsored" },
      { label: "Ph.D Awarded", href: "/research/phd-awarded" },
      { label: "Publication", href: "/research/publication" },
    ],
  },
  {
    label: "Outreach",
    href: "/outreach",
    subItems: [{ label: "Workshop", href: "/outreach/workshop" }],
  },
  { label: "Industrial Consultancy", href: "/industrial-consultancy" },
  { label: "Gallery", href: "/gallery" },
  { label: "CS Club", href: "/cs-club" },
  { label: "CSE Moodle", href: "/cse-moodle" },
]

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const NavItem = ({ item, mobile = false }) => {
    const hasSubItems = item.subItems && item.subItems.length > 0

    return (
      <li className={`relative ${mobile ? "w-full" : ""}`}>
        {hasSubItems ? (
          <button
            onClick={() => handleDropdownToggle(item.label)}
            className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium ${
              item.current ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            } rounded-md transition-colors ${mobile ? "px-4" : ""}`}
          >
            {item.label}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
            />
          </button>
        ) : (
          <Link
            href={item.href}
            className={`block px-3 py-2 text-sm font-medium ${
              item.current ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            } rounded-md transition-colors ${mobile ? "px-4" : ""}`}
          >
            {item.label}
          </Link>
        )}
        {hasSubItems && activeDropdown === item.label && (
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`${
                mobile ? "mt-1 ml-4" : "absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
              }`}
            >
              {item.subItems.map((subItem) => (
                <NavItem key={subItem.label} item={subItem} mobile={mobile} />
              ))}
            </motion.ul>
          </AnimatePresence>
        )}
      </li>
    )
  }

  return (
    <nav className="relative z-10" ref={navRef}>
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex space-x-1">
        {navItems.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg overflow-hidden"
            >
              <ul className="py-2">
                {navItems.map((item) => (
                  <NavItem key={item.label} item={item} mobile={true} />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

