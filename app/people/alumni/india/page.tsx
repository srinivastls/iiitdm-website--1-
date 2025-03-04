"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, MapPin, Calendar, GraduationCap, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react"
import Image from "next/image"

// Alumni data
const alumniData = [
  {
    id: 1,
    name: "Amala Thambi",
    graduatingYear: 2014,
    currentPosition: "M.Tech, IIT Roorkee, currently at Oracle",
    institution: "IIT Roorkee",
    company: "Oracle",
    image: "/placeholder.svg?height=400&width=400",
    location: "Bangalore",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Krishna Chaurasia",
    graduatingYear: 2015,
    currentPosition: "M.Tech, IIT Khargpur",
    institution: "IIT Kharagpur",
    image: "/placeholder.svg?height=400&width=400",
    location: "Kharagpur",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Mohit S",
    graduatingYear: 2015,
    currentPosition: "M.Tech, ISI Kolkata",
    institution: "ISI Kolkata",
    image: "/placeholder.svg?height=400&width=400",
    location: "Kolkata",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "Kavya P",
    graduatingYear: 2015,
    currentPosition: "PGDM, IIM Calcutta",
    institution: "IIM Calcutta",
    image: "/placeholder.svg?height=400&width=400",
    location: "Kolkata",
    degree: "PGDM",
    field: "Management",
    linkedin: "https://linkedin.com",
  },
  {
    id: 5,
    name: "Rashmitha J",
    graduatingYear: 2016,
    currentPosition: "M.Tech, IIT Bombay",
    institution: "IIT Bombay",
    image: "/placeholder.svg?height=400&width=400",
    location: "Mumbai",
    degree: "M.Tech",
    field: "Computer Science",
    achievements: "AIR 56 in GATE",
    linkedin: "https://linkedin.com",
  },
  {
    id: 6,
    name: "C Naveen",
    graduatingYear: 2016,
    currentPosition: "M.Tech, IIT Bombay",
    institution: "IIT Bombay",
    image: "/placeholder.svg?height=400&width=400",
    location: "Mumbai",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 7,
    name: "Deepanshu G",
    graduatingYear: 2016,
    currentPosition: "M.Tech, IIT Bombay",
    institution: "IIT Bombay",
    image: "/placeholder.svg?height=400&width=400",
    location: "Mumbai",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 8,
    name: "Pranjal C",
    graduatingYear: 2016,
    currentPosition: "M.Tech, IIT Kanpur",
    institution: "IIT Kanpur",
    image: "/placeholder.svg?height=400&width=400",
    location: "Kanpur",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 9,
    name: "Nitin Vivek Bharti",
    graduatingYear: 2016,
    currentPosition: "M.Tech, IIT Kanpur",
    institution: "IIT Kanpur",
    image: "/placeholder.svg?height=400&width=400",
    location: "Kanpur",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 10,
    name: "Nada P",
    graduatingYear: 2016,
    currentPosition: "MS by research, IIT Madras",
    institution: "IIT Madras",
    image: "/placeholder.svg?height=400&width=400",
    location: "Chennai",
    degree: "MS by research",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 11,
    name: "Kapil Gupta",
    graduatingYear: 2016,
    currentPosition: "MSc, IIT Delhi",
    institution: "IIT Delhi",
    image: "/placeholder.svg?height=400&width=400",
    location: "Delhi",
    degree: "MSc",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 12,
    name: "Sudheer Surendran",
    graduatingYear: 2017,
    currentPosition: "Ashoka University",
    institution: "Ashoka University",
    image: "/placeholder.svg?height=400&width=400",
    location: "Sonipat",
    degree: "Masters",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 13,
    name: "Sarathi",
    graduatingYear: 2017,
    currentPosition: "MS, IIT Madras",
    institution: "IIT Madras",
    image: "/placeholder.svg?height=400&width=400",
    location: "Chennai",
    degree: "MS",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 14,
    name: "Sushma Macharla",
    graduatingYear: 2017,
    currentPosition: "MBA, University of Hyderabad",
    institution: "University of Hyderabad",
    image: "/placeholder.svg?height=400&width=400",
    location: "Hyderabad",
    degree: "MBA",
    field: "Management",
    linkedin: "https://linkedin.com",
  },
  {
    id: 15,
    name: "Bhanu",
    graduatingYear: 2017,
    currentPosition: "PhD, IIIT Hyderabad",
    institution: "IIIT Hyderabad",
    image: "/placeholder.svg?height=400&width=400",
    location: "Hyderabad",
    degree: "PhD",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 16,
    name: "Banu Prakash",
    graduatingYear: 2017,
    currentPosition: "Direct Ph.D, IIIT Hyderabad",
    institution: "IIIT Hyderabad",
    image: "/placeholder.svg?height=400&width=400",
    location: "Hyderabad",
    degree: "PhD",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 17,
    name: "Kiran kumar",
    graduatingYear: 2017,
    currentPosition: "PGDM, XLRI, Jamshedpur",
    institution: "XLRI",
    image: "/placeholder.svg?height=400&width=400",
    location: "Jamshedpur",
    degree: "PGDM",
    field: "Management",
    linkedin: "https://linkedin.com",
  },
  {
    id: 18,
    name: "Chetan Rohit",
    graduatingYear: 2017,
    currentPosition: "IIFT, Kolkata",
    institution: "IIFT",
    image: "/placeholder.svg?height=400&width=400",
    location: "Kolkata",
    degree: "MBA",
    field: "International Business",
    linkedin: "https://linkedin.com",
  },
  {
    id: 19,
    name: "Vamshi Gangadhar Chiluka",
    graduatingYear: 2018,
    currentPosition: "M.Tech, IIT Bombay",
    institution: "IIT Bombay",
    image: "/placeholder.svg?height=400&width=400",
    location: "Mumbai",
    degree: "M.Tech",
    field: "Computer Science",
    achievements: "AIR 62 in GATE",
    linkedin: "https://linkedin.com",
  },
  {
    id: 20,
    name: "Sangamalika Rajakumar",
    graduatingYear: 2018,
    currentPosition: "Ashoka University",
    institution: "Ashoka University",
    image: "/placeholder.svg?height=400&width=400",
    location: "Sonipat",
    degree: "Masters",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 21,
    name: "M Jeevan Kumar",
    graduatingYear: 2018,
    currentPosition: "M.Tech, IIT Jodhpur",
    institution: "IIT Jodhpur",
    image: "/placeholder.svg?height=400&width=400",
    location: "Jodhpur",
    degree: "M.Tech",
    field: "Computer Science",
    linkedin: "https://linkedin.com",
  },
  {
    id: 22,
    name: "Inchara K M",
    graduatingYear: 2018,
    currentPosition: "IIM Tiruchirappalli",
    institution: "IIM Tiruchirappalli",
    image: "/placeholder.svg?height=400&width=400",
    location: "Tiruchirappalli",
    degree: "MBA",
    field: "Management",
    linkedin: "https://linkedin.com",
  },
  {
    id: 23,
    name: "Nikhila Pinninti",
    graduatingYear: 2019,
    currentPosition: "MBA, IIM SBP",
    institution: "IIM Sambalpur",
    image: "/placeholder.svg?height=400&width=400",
    location: "Sambalpur",
    degree: "MBA",
    field: "Management",
    linkedin: "https://linkedin.com",
  },
]

// Get unique years for filtering
const years = [...new Set(alumniData.map((alumni) => alumni.graduatingYear))].sort((a, b) => b - a)

// Get unique institutions for filtering
const institutions = [...new Set(alumniData.map((alumni) => alumni.institution))].sort()

// Get unique degrees for filtering
const degrees = [...new Set(alumniData.map((alumni) => alumni.degree))].sort()

export default function AlumniIndia() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null)
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedAlumni, setSelectedAlumni] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isStatsVisible, setIsStatsVisible] = useState(false)

  const statsRef = useRef<HTMLDivElement>(null)

  // Filter alumni based on search term and filters
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.institution.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesYear = selectedYear ? alumni.graduatingYear === selectedYear : true
    const matchesInstitution = selectedInstitution ? alumni.institution === selectedInstitution : true
    const matchesDegree = selectedDegree ? alumni.degree === selectedDegree : true

    return matchesSearch && matchesYear && matchesInstitution && matchesDegree
  })

  // Calculate statistics
  const totalAlumni = alumniData.length
  const alumniByYear = years.map((year) => ({
    year,
    count: alumniData.filter((a) => a.graduatingYear === year).length,
  }))

  const alumniByInstitution = institutions
    .map((institution) => ({
      institution,
      count: alumniData.filter((a) => a.institution === institution).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const alumniByDegree = degrees
    .map((degree) => ({
      degree,
      count: alumniData.filter((a) => a.degree === degree).length,
    }))
    .sort((a, b) => b.count - a.count)

  // Check if stats section is visible on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStatsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
        </div>

        {/* Animated Circles */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-400 opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-indigo-400 opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Our Alumni in India
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              The first batch of Computer Science and Engineering graduated in the year 2013. Ever since 2013, our
              alumni are doing exceptionally well in corporates and many of our alumni are pursuing M.Tech/MS/PhD in
              leading academia and research institutes of national repute.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 text-center"
              >
                <p className="text-3xl font-bold">{totalAlumni}+</p>
                <p className="text-sm text-blue-100">Alumni in India</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 text-center"
              >
                <p className="text-3xl font-bold">{institutions.length}+</p>
                <p className="text-sm text-blue-100">Institutions</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 text-center"
              >
                <p className="text-3xl font-bold">{years.length}</p>
                <p className="text-sm text-blue-100">Graduating Batches</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-[50px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#ffffff"
              opacity="0.25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              fill="#ffffff"
              opacity="0.5"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search alumni by name, position, or institution..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                >
                  <Filter size={18} />
                  Filters
                  {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduating Year</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedYear || ""}
                        onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
                      >
                        <option value="">All Years</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedInstitution || ""}
                        onChange={(e) => setSelectedInstitution(e.target.value || null)}
                      >
                        <option value="">All Institutions</option>
                        {institutions.map((institution) => (
                          <option key={institution} value={institution}>
                            {institution}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedDegree || ""}
                        onChange={(e) => setSelectedDegree(e.target.value || null)}
                      >
                        <option value="">All Degrees</option>
                        {degrees.map((degree) => (
                          <option key={degree} value={degree}>
                            {degree}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => {
                        setSelectedYear(null)
                        setSelectedInstitution(null)
                        setSelectedDegree(null)
                        setSearchTerm("")
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAlumni.length}</span> alumni
              {selectedYear && (
                <span>
                  {" "}
                  from <span className="font-semibold text-gray-900">{selectedYear}</span>
                </span>
              )}
              {selectedInstitution && (
                <span>
                  {" "}
                  at <span className="font-semibold text-gray-900">{selectedInstitution}</span>
                </span>
              )}
              {selectedDegree && (
                <span>
                  {" "}
                  pursuing <span className="font-semibold text-gray-900">{selectedDegree}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Grid/List Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {filteredAlumni.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAlumni.map((alumni, index) => (
                  <motion.div
                    key={alumni.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-600">
                      <Image
                        src={alumni.image || "/placeholder.svg"}
                        alt={alumni.name}
                        fill
                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm font-medium">Class of {alumni.graduatingYear}</p>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{alumni.name}</h3>
                      <p className="text-gray-600 mb-3">{alumni.currentPosition}</p>

                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin size={14} className="mr-1" />
                        <span>{alumni.location}</span>
                      </div>

                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <GraduationCap size={14} className="mr-1" />
                        <span>
                          {alumni.degree} in {alumni.field}
                        </span>
                      </div>

                      {alumni.achievements && (
                        <div className="mb-3">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {alumni.achievements}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedAlumni(alumni.id)}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        View Profile
                        <ArrowUpRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAlumni.map((alumni, index) => (
                  <motion.div
                    key={alumni.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 lg:w-1/5 relative h-40 md:h-auto bg-gradient-to-br from-blue-400 to-indigo-600">
                        <Image
                          src={alumni.image || "/placeholder.svg"}
                          alt={alumni.name}
                          fill
                          className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </div>

                      <div className="p-6 md:w-3/4 lg:w-4/5">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{alumni.name}</h3>
                            <p className="text-gray-600 mb-3">{alumni.currentPosition}</p>

                            <div className="flex flex-wrap gap-4 mb-3">
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar size={14} className="mr-1" />
                                <span>Class of {alumni.graduatingYear}</span>
                              </div>

                              <div className="flex items-center text-gray-500 text-sm">
                                <MapPin size={14} className="mr-1" />
                                <span>{alumni.location}</span>
                              </div>

                              <div className="flex items-center text-gray-500 text-sm">
                                <GraduationCap size={14} className="mr-1" />
                                <span>
                                  {alumni.degree} in {alumni.field}
                                </span>
                              </div>
                            </div>

                            {alumni.achievements && (
                              <div className="mb-3">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  {alumni.achievements}
                                </span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => setSelectedAlumni(alumni.id)}
                            className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            View Profile
                            <ArrowUpRight size={14} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="bg-blue-50 inline-block p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No alumni found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any alumni matching your search criteria. Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSelectedYear(null)
                  setSelectedInstitution(null)
                  setSelectedDegree(null)
                  setSearchTerm("")
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Statistics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our alumni have made significant contributions across various prestigious institutions in India. Here's a
              breakdown of our alumni distribution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Alumni by Year */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni by Graduating Year</h3>
              <div className="space-y-3">
                {alumniByYear.map(({ year, count }) => (
                  <div key={year} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Class of {year}</span>
                      <span className="text-gray-600">{count} alumni</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isStatsVisible ? { width: `${(count / totalAlumni) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Alumni by Top Institutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Institutions</h3>
              <div className="space-y-3">
                {alumniByInstitution.map(({ institution, count }) => (
                  <div key={institution} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{institution}</span>
                      <span className="text-gray-600">{count} alumni</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isStatsVisible ? { width: `${(count / totalAlumni) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Alumni by Degree */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni by Degree</h3>
              <div className="space-y-3">
                {alumniByDegree.map(({ degree, count }) => (
                  <div key={degree} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{degree}</span>
                      <span className="text-gray-600">{count} alumni</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isStatsVisible ? { width: `${(count / totalAlumni) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Are you an IIITDM Kancheepuram Alumni?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our alumni network to stay connected with your alma mater and fellow alumni. Update your information
              and help us keep track of your achievements.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Update Your Information
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 bg-blue-500 bg-opacity-20 text-white font-medium rounded-lg border border-white border-opacity-30 hover:bg-opacity-30 transition-colors"
              >
                Join Alumni Network
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alumni Detail Modal */}
      <AnimatePresence>
        {selectedAlumni && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlumni(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const alumni = alumniData.find((a) => a.id === selectedAlumni)
                if (!alumni) return null

                return (
                  <>
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-600">
                      <Image src={alumni.image || "/placeholder.svg"} alt={alumni.name} fill className="object-cover" />
                      <button
                        onClick={() => setSelectedAlumni(null)}
                        className="absolute top-4 right-4 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>

                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{alumni.name}</h2>
                      <p className="text-gray-600 mb-6">{alumni.currentPosition}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Education</h3>
                          <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-medium text-gray-900">
                                {alumni.degree} in {alumni.field}
                              </p>
                              <p className="text-gray-600">{alumni.institution}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-medium text-gray-900">B.Tech in Computer Science</p>
                              <p className="text-gray-600">IIITDM Kancheepuram</p>
                              <p className="text-gray-500 text-sm">Class of {alumni.graduatingYear}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <MapPin size={16} className="text-gray-400 mr-2" />
                              <span className="text-gray-600">{alumni.location}, India</span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400 mr-2"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              <a href="#" className="text-blue-600 hover:underline">
                                {alumni.name.toLowerCase().replace(/\s+/g, ".")}@example.com
                              </a>
                            </div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400 mr-2"
                              >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </svg>
                              <a
                                href={alumni.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                LinkedIn Profile
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {alumni.achievements && (
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Achievements</h3>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-blue-800">{alumni.achievements}</p>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">About</h3>
                        <p className="text-gray-600">
                          {alumni.name} graduated from IIITDM Kancheepuram in {alumni.graduatingYear} and is currently
                          pursuing {alumni.degree} in {alumni.field} at {alumni.institution}.
                          {alumni.company && ` Currently working at ${alumni.company}.`}
                        </p>
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

