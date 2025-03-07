"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  BookOpen,
  Briefcase,
  MapPin,
  GraduationCap,
  User,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import MainNav from "@/components/MainNav"
import Link from "next/link"


// PhD graduate data
const phdGraduates = [
  {
    id: 1,
    name: "Kanjar De",
    supervisor: "Prof. V Masilamani",
    researchArea: "Image Processing",
    currentPosition: "ERCIM Research Fellow",
    currentAffiliation: "Berlin, Deutschland",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    thesis: "Advanced Techniques in Image Processing for Medical Applications",
    email: "kanjar.de@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 2,
    name: "Mohamed Asan Basiri",
    supervisor: "Dr. Noor Mahammad",
    researchArea: "VLSI for Signal Processing",
    currentPosition: "Assistant Professor",
    currentAffiliation: "IIITDM Kurnool",
    image: "/placeholder.svg?height=400&width=300",
    year: 2021,
    thesis: "VLSI Architectures for Efficient Signal Processing Applications",
    email: "asan.basiri@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 3,
    name: "Manikandan V M",
    supervisor: "Prof. V Masilamani",
    researchArea: "Image Watermarking, Image Forensics",
    currentPosition: "Assistant Professor",
    currentAffiliation: "SRM University AP",
    image: "/placeholder.svg?height=400&width=300",
    year: 2020,
    thesis: "Robust Image Watermarking Techniques for Digital Forensics",
    email: "manikandan.vm@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 4,
    name: "Renjith C",
    supervisor: "Dr. N Sadagopan",
    researchArea: "Graph Theory, Graph Algorithms",
    currentPosition: "Assistant Professor",
    currentAffiliation: "NIT Calicut",
    image: "/placeholder.svg?height=400&width=300",
    year: 2019,
    thesis: "Efficient Algorithms for Graph Theoretic Problems",
    email: "renjith.c@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 5,
    name: "Dr. Oswald C",
    supervisor: "Prof. B Sivaselvan",
    researchArea: "Data Mining, Human Computer Interaction",
    currentPosition: "Assistant Professor",
    currentAffiliation: "NIT Trichy",
    image: "/placeholder.svg?height=400&width=300",
    year: 2019,
    thesis: "Novel Data Mining Approaches for Human-Computer Interaction",
    email: "oswald.c@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 6,
    name: "Ayesha",
    supervisor: "Prof. V Masilamani",
    researchArea: "Image Processing",
    currentPosition: "Assistant Professor",
    currentAffiliation: "VIT Chennai",
    image: "/placeholder.svg?height=400&width=300",
    year: 2018,
    thesis: "Advanced Image Processing Techniques for Pattern Recognition",
    email: "ayesha@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 7,
    name: "Santosh Kumar U",
    supervisor: "Prof. B Sivaselvan",
    researchArea: "Social Media Analytics",
    currentPosition: "Assistant Professor",
    currentAffiliation: "Gitam University",
    image: "/placeholder.svg?height=400&width=300",
    year: 2018,
    thesis: "Social Media Analytics for Behavior Prediction",
    email: "santosh.kumar@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 8,
    name: "Veeramani S",
    supervisor: "Dr. Noor Mahammad",
    researchArea: "Computer Networks, Packet Processing",
    currentPosition: "Assistant Professor",
    currentAffiliation: "Shiv Nadar University",
    image: "/placeholder.svg?height=400&width=300",
    year: 2017,
    thesis: "Efficient Packet Processing Techniques for High-Speed Networks",
    email: "veeramani.s@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 9,
    name: "Subin Sahayam",
    supervisor: "Dr. J Umarani",
    researchArea: "Pattern Recognition",
    currentPosition: "Assistant Professor",
    currentAffiliation: "Shiv Nadar University",
    image: "/placeholder.svg?height=400&width=300",
    year: 2017,
    thesis: "Novel Approaches to Pattern Recognition in Image Analysis",
    email: "subin.sahayam@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 10,
    name: "Dr. Kiruthika S",
    supervisor: "Prof. V Masilamani",
    researchArea: "Image Processing",
    currentPosition: "Assistant Professor",
    currentAffiliation: "VIT Chennai",
    image: "/placeholder.svg?height=400&width=300",
    year: 2016,
    thesis: "Advanced Image Processing for Medical Diagnostics",
    email: "kiruthika.s@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 11,
    name: "Pratik Joshi",
    supervisor: "Prof. V Masilamani",
    researchArea: "Image Processing",
    currentPosition: "Sr Machine Learning Engineer",
    currentAffiliation: "Dolby Labs",
    image: "/placeholder.svg?height=400&width=300",
    year: 2016,
    thesis: "Machine Learning Approaches for Image Processing",
    email: "pratik.joshi@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 12,
    name: "Srinivasverma V",
    supervisor: "Dr. Noor Mahammad",
    researchArea: "Networks, Packet Classification",
    currentPosition: "Assistant Professor",
    currentAffiliation: "Shiv Nadar University",
    image: "/placeholder.svg?height=400&width=300",
    year: 2015,
    thesis: "Efficient Packet Classification Algorithms for Network Security",
    email: "srinivasverma.v@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 13,
    name: "Dhayalakumar M",
    supervisor: "Dr. Noor Mahammad",
    researchArea: "High Speed Packet Classification Arch.",
    currentPosition: "Technical Lead",
    currentAffiliation: "Mesiter Gen Technologies Pvt Ltd",
    image: "/placeholder.svg?height=400&width=300",
    year: 2015,
    thesis: "High-Speed Packet Classification Architectures for Network Security",
    email: "dhayalakumar.m@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 14,
    name: "Shanmuga Kumar M",
    supervisor: "Dr. Noor Mahammad",
    researchArea: "Packet Classification Architectures",
    currentPosition: "Adjunct Prof & Founder",
    currentAffiliation: "SNU Chennai & MATIC",
    image: "/placeholder.svg?height=400&width=300",
    year: 2014,
    thesis: "Novel Architectures for Packet Classification in Network Security",
    email: "shanmuga.kumar@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
  {
    id: 15,
    name: "Nilu R",
    supervisor: "Dr. J Umarani",
    researchArea: "Pattern Recognition",
    currentPosition: "Assistant Professor",
    currentAffiliation: "SSN Institutions",
    image: "/placeholder.svg?height=400&width=300",
    year: 2014,
    thesis: "Advanced Pattern Recognition Techniques for Image Analysis",
    email: "nilu.r@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      googleScholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/",
    },
  },
]

// Research areas for filtering
const researchAreas = Array.from(new Set(phdGraduates.map((grad) => grad.researchArea)))

// Supervisors for filtering
const supervisors = Array.from(new Set(phdGraduates.map((grad) => grad.supervisor)))

// Years for filtering
const years = Array.from(new Set(phdGraduates.map((grad) => grad.year))).sort((a, b) => b - a)

export default function PhDAwarded() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [areaFilter, setAreaFilter] = useState<string | null>(null)
  const [supervisorFilter, setSupervisorFilter] = useState<string | null>(null)
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGraduate, setSelectedGraduate] = useState<number | null>(null)

  const carouselRef = useRef<HTMLDivElement>(null)
  const featuredGraduates = phdGraduates.slice(0, 5) // Featured graduates for the hero section

  // Handle automatic slide change
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredGraduates.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, featuredGraduates.length])

  // Handle manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setAutoplay(false) // Pause autoplay when manually navigating

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % featuredGraduates.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + featuredGraduates.length) % featuredGraduates.length)
  }

  // Filter graduates based on search and filters
  const filteredGraduates = phdGraduates.filter((graduate) => {
    const matchesSearch =
      searchQuery === "" ||
      graduate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      graduate.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      graduate.researchArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      graduate.currentPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      graduate.currentAffiliation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesArea = areaFilter === null || graduate.researchArea.includes(areaFilter)
    const matchesSupervisor = supervisorFilter === null || graduate.supervisor === supervisorFilter
    const matchesYear = yearFilter === null || graduate.year === yearFilter

    return matchesSearch && matchesArea && matchesSupervisor && matchesYear
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Get research area color
  const getResearchAreaColor = (area: string) => {
    const colors = {
      "Image Processing": "bg-blue-100 text-blue-800",
      "VLSI for Signal Processing": "bg-purple-100 text-purple-800",
      "Image Watermarking, Image Forensics": "bg-indigo-100 text-indigo-800",
      "Graph Theory, Graph Algorithms": "bg-green-100 text-green-800",
      "Data Mining, Human Computer Interaction": "bg-yellow-100 text-yellow-800",
      "Social Media Analytics": "bg-orange-100 text-orange-800",
      "Computer Networks, Packet Processing": "bg-red-100 text-red-800",
      "Pattern Recognition": "bg-pink-100 text-pink-800",
      "Networks, Packet Classification": "bg-teal-100 text-teal-800",
      "High Speed Packet Classification Arch.": "bg-cyan-100 text-cyan-800",
      "Packet Classification Architectures": "bg-emerald-100 text-emerald-800",
    }

    // Default color if area not found
    return colors[area as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/assets/image.png" alt="IIITDM Kancheepuram Logo" width={50} height={50} />
              <div>
                <span className="font-bold text-xl text-blue-900 block">IIITDM Kancheepuram</span>
                <span className="text-sm text-gray-600">Department of Computer Science & Engineering</span>
              </div>
            </Link>
            <MainNav />
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-10"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 opacity-10"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500 opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PhD Graduates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet our accomplished PhD graduates who have made significant contributions to the field of Computer
              Science and Engineering.
            </p>
          </motion.div>

          {/* Featured PhD Graduates Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div
              ref={carouselRef}
              className="relative overflow-hidden rounded-2xl shadow-xl bg-white"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div className="aspect-[16/9] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
                  >
                    {/* Image */}
                    <div className="relative h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-6">
                      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={featuredGraduates[currentSlide].image || "/placeholder.svg"}
                          alt={featuredGraduates[currentSlide].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-6 md:p-10">
                      <div className="space-y-4">
                        <Badge className={`${getResearchAreaColor(featuredGraduates[currentSlide].researchArea)}`}>
                          {featuredGraduates[currentSlide].researchArea}
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                          {featuredGraduates[currentSlide].name}
                        </h2>

                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <User className="h-5 w-5 mr-2 text-blue-500" />
                            <span>Supervised by {featuredGraduates[currentSlide].supervisor}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                            <span>{featuredGraduates[currentSlide].currentPosition}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                            <span>{featuredGraduates[currentSlide].currentAffiliation}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                            <span>PhD Awarded in {featuredGraduates[currentSlide].year}</span>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            onClick={() => setSelectedGraduate(featuredGraduates[currentSlide].id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            View Profile
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md backdrop-blur-sm z-10 transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md backdrop-blur-sm z-10 transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {featuredGraduates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "w-8 bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PhD Graduates List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-gray-800">All PhD Graduates</h2>

              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search graduates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-64"
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Research Area</label>
                        <select
                          value={areaFilter || ""}
                          onChange={(e) => setAreaFilter(e.target.value || null)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">All Research Areas</option>
                          {researchAreas.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label>
                        <select
                          value={supervisorFilter || ""}
                          onChange={(e) => setSupervisorFilter(e.target.value || null)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">All Supervisors</option>
                          {supervisors.map((supervisor) => (
                            <option key={supervisor} value={supervisor}>
                              {supervisor}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                        <select
                          value={yearFilter || ""}
                          onChange={(e) => setYearFilter(e.target.value ? Number.parseInt(e.target.value) : null)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">All Years</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setAreaFilter(null)
                          setSupervisorFilter(null)
                          setYearFilter(null)
                          setSearchQuery("")
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Graduates Grid */}
            {filteredGraduates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No graduates found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filters to find more results.
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredGraduates.map((graduate) => (
                  <motion.div
                    key={graduate.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelectedGraduate(graduate.id)}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <Image
                            src={graduate.image || "/placeholder.svg"}
                            alt={graduate.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/30 to-transparent h-24"></div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <Badge className={`${getResearchAreaColor(graduate.researchArea)}`}>
                          {graduate.researchArea}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">{graduate.name}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <User className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Supervised by {graduate.supervisor}</span>
                        </div>

                        <div className="flex items-center text-gray-600 text-sm">
                          <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{graduate.currentPosition}</span>
                        </div>

                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{graduate.currentAffiliation}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">PhD {graduate.year}</span>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                          View Profile <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">PhD Program Statistics</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our PhD program has produced exceptional graduates who are making significant contributions in academia
                and industry.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{phdGraduates.length}</h3>
                <p className="text-gray-600">PhD Graduates</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{researchAreas.length}</h3>
                <p className="text-gray-600">Research Areas</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{supervisors.length}</h3>
                <p className="text-gray-600">Faculty Supervisors</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {phdGraduates.filter((g) => g.currentPosition.includes("Professor")).length}
                </h3>
                <p className="text-gray-600">In Academia</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduate Detail Modal */}
      <AnimatePresence>
        {selectedGraduate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGraduate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const graduate = phdGraduates.find((g) => g.id === selectedGraduate)
                if (!graduate) return null

                return (
                  <>
                    <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
                      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={graduate.image || "/placeholder.svg"}
                          alt={graduate.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    <div className="pt-20 px-6 pb-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{graduate.name}</h2>
                        <p className="text-gray-600">
                          {graduate.currentPosition} at {graduate.currentAffiliation}
                        </p>

                        <div className="flex justify-center gap-3 mt-4">
                          <a
                            href={graduate.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                          <a
                            href={graduate.socialLinks.googleScholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                            </svg>
                          </a>
                          <a
                            href={graduate.socialLinks.researchGate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93.043-.372.063-.864.063-1.457 0-.594-.02-1.084-.063-1.455-.042-.372-.101-.695-.177-.93-.234-.735-.603-1.261-1.174-1.652-.57-.39-1.306-.583-2.106-.583h-.001zM7.217 4.5c-1.209 0-2.445.363-3.57 1.07-.855.54-1.586 1.296-2.166 2.197-.543.847-.888 1.8-1.03 2.742-.064.427-.096.912-.096 1.452 0 .54.032 1.024.096 1.45.142.944.487 1.9 1.03 2.748.58.9 1.31 1.655 2.166 2.196 1.124.707 2.36 1.07 3.57 1.07.59 0 1.154-.078 1.706-.236.552-.156 1.07-.374 1.554-.662a7.695 7.695 0 0 0 1.682-1.471c.33-.376.594-.784.815-1.215.264-.54.466-1.144.604-1.81.138-.666.21-1.39.21-2.168 0-.777-.07-1.5-.21-2.168-.138-.666-.34-1.27-.604-1.81a7.89 7.89 0 0 0-.815-1.216 7.694 7.694 0 0 0-1.682-1.47 7.233 7.233 0 0 0-1.554-.664 7.098 7.098 0 0 0-1.706-.235z" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">PhD Information</h3>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Research Area</h4>
                              <p className="text-gray-800">{graduate.researchArea}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Supervisor</h4>
                              <p className="text-gray-800">{graduate.supervisor}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Year of Graduation</h4>
                              <p className="text-gray-800">{graduate.year}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Thesis Title</h4>
                              <p className="text-gray-800">{graduate.thesis}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Current Information
                          </h3>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Current Position</h4>
                              <p className="text-gray-800">{graduate.currentPosition}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Current Affiliation</h4>
                              <p className="text-gray-800">{graduate.currentAffiliation}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Email</h4>
                              <a href={`mailto:${graduate.email}`} className="text-blue-600 hover:underline">
                                {graduate.email}
                              </a>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Links</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <a
                                  href={graduate.socialLinks.googleScholar}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                                >
                                  Google Scholar
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                                <a
                                  href={graduate.socialLinks.researchGate}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"
                                >
                                  ResearchGate
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Publications</h3>

                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <h4 className="font-medium text-gray-800">Novel Approaches in {graduate.researchArea}</h4>
                            <p className="text-sm text-gray-600 mt-1">Journal of Computer Science, {graduate.year}</p>
                          </div>

                          <div className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <h4 className="font-medium text-gray-800">
                              Advancements in {graduate.researchArea} Techniques
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              International Conference on Computing, {graduate.year - 1}
                            </p>
                          </div>

                          <div className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <h4 className="font-medium text-gray-800">A Survey of {graduate.researchArea} Methods</h4>
                            <p className="text-sm text-gray-600 mt-1">IEEE Transactions, {graduate.year - 2}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <Button onClick={() => setSelectedGraduate(null)} variant="outline" className="text-gray-600">
                          Close
                        </Button>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

