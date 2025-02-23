"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"

const heroImages = ["/assets/a1.jpg", "/assets/a2.jpeg", "/assets/a8.jpg"]

const imageDescriptions = [
  "IIITDM Kancheepuram Campus Building",
  "State-of-the-art Research Facilities",
  "Vibrant Student Life",
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }, [])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [nextImage])

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <div
      className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 overflow-hidden"
      {...handlers}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(29,78,216,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_600px,rgba(99,102,241,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.6)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-12 lg:pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Department Tag with enhanced styling */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-blue-700 font-medium text-sm shadow-sm border border-blue-100/50">
              <GraduationCap className="w-4 h-4" />
              Department of Computer Science & Engineering
            </span>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Department of Computer Science & Engineering
                </h1>

                <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                  Join IIITDM Kancheepuram's prestigious Computer Science program, where innovation meets academic
                  excellence in a world-class learning environment.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore Programs
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
                >
                  Research Areas
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Image Carousel */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white p-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={heroImages[currentImageIndex] || "/placeholder.svg"}
                      alt={imageDescriptions[currentImageIndex]}
                      fill
                      className="object-cover object-center rounded-xl"
                      priority={currentImageIndex === 0}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg">
                      {imageDescriptions[currentImageIndex]}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "w-6 bg-white shadow-lg" : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Show image ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
    </div>
  )
}

