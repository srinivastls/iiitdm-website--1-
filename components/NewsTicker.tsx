"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const news = [
  "CS Department receives $5M grant for AI research",
  "New Quantum Computing course launched for Fall 2023",
  "Students win first place in national coding competition",
  "Professor Johnson elected to National Academy of Engineering",
]

export default function NewsTicker() {
  const [currentNews, setCurrentNews] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % news.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="font-bold mr-4">Latest:</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNews}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {news[currentNews]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

