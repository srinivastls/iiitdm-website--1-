"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Teaching",
    href: "/teaching",
    subItems: [
      { label: "Overview", href: "/teaching/overview" },
      { label: "Curriculum", href: "https://www.iiitdm.ac.in/students/existing-students/curriculum-info",target:"__blank" },
      { label: "Online Electives", href: "/teaching/online-electives" },
      { label: "Time Table", href: "https://www.iiitdm.ac.in/students/existing-students/time-table",target:"__blank" },
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
      { label: "Research Scholars", href: "https://www.iiitdm.ac.in/people/research-scholars/cse" ,target:"__blank"},
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
 // { label: "Gallery", href: "/gallery" },
  { label: "Clubs", 
    href: "/clubs",
    subItems: [
      { label: "CS Club", href: "https://www.cse.iiitdm.ac.in/csclub.html", target: "__blank" },
      { label: "Developers Club", href: "https://www.devclub.iiitdm.ac.in", target: "__blank" },
    ],
  },
  { label: "CSE Moodle", href: "http://172.16.1.173/moodle/", target: "__blank" },
]

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const handleDropdownToggle = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(label)
    }
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

  // Check if a path is active, including partial matches for subpaths
  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const NavItem = ({ item, mobile = false, level = 0 }) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isActive = isActivePath(item.href)

    // Check if any subitem is active
    const hasActiveChild =
      hasSubItems &&
      item.subItems.some(
        (subItem) =>
          isActivePath(subItem.href) ||
          (subItem.subItems && subItem.subItems.some((grandChild) => isActivePath(grandChild.href))),
      )

    // Determine if dropdown should be open based on parent item or activity
    const isDropdownOpen = activeDropdown === item.label || (hasActiveChild && level === 0 && !mobile)

    return (
      <li className={`relative ${mobile ? "w-full" : ""}`}>
        {hasSubItems ? (
          <div className="w-full">
            <button
              onClick={() => handleDropdownToggle(item.label)}
              className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium ${
                isActive || hasActiveChild
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              } rounded-md transition-colors ${mobile ? "px-4" : ""}`}
            >
              {item.label}
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
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
                    <NavItem key={subItem.label} item={subItem} mobile={mobile} level={level + 1} />
                  ))}
                </motion.ul>
              </AnimatePresence>
            )}
          </div>
        ) : (
          // Check if the item has a target and if it's a valid external link
          item.target === "__blank" ? (
            <a
              href={item.href}
              target={item.target}
              rel="noopener noreferrer"
              className={`block px-3 py-2 text-sm font-medium ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              } rounded-md transition-colors ${mobile ? "px-4" : ""}`}
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.href}
              className={`block px-3 py-2 text-sm font-medium ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              } rounded-md transition-colors ${mobile ? "px-4" : ""}`}
            >
              {item.label}
            </Link>
          )
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
              className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg overflow-hidden max-h-[80vh] overflow-y-auto"
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
