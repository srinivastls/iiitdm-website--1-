"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Grid,
  List,
  GraduationCap,
  MapPin,
  Briefcase,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Alumni data
const alumniData = [
  {
    id: 1,
    name: "B. Illambharathi",
    graduationYear: 2013,
    currentPosition: "MS at Columbia, currently at Yahoo Labs",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Yahoo Labs",
  },
  {
    id: 2,
    name: "R. Niveditha",
    graduationYear: 2013,
    currentPosition: "MS at Georgia Tech, currently at Facebook",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Facebook",
  },
  {
    id: 3,
    name: "Surabhi Jain",
    graduationYear: 2013,
    currentPosition: "MS at Ohio State, currently at Intel Inc",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Intel Inc",
  },
  {
    id: 4,
    name: "Suganth Krishna",
    graduationYear: 2013,
    currentPosition: "MS at Univ of California, San Diego",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "UC San Diego",
  },
  {
    id: 5,
    name: "Ramesh Krishnan",
    graduationYear: 2014,
    currentPosition: "Direct Ph.D at Pen State, currently at Boston University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Boston University",
  },
  {
    id: 6,
    name: "Anand Vijayaraghavan",
    graduationYear: 2014,
    currentPosition: "MS at North Carolina State University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "North Carolina State University",
  },
  {
    id: 7,
    name: "Varun Chandra",
    graduationYear: 2014,
    currentPosition: "MS-Ph.D at Arizona State University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Arizona State University",
  },
  {
    id: 8,
    name: "Gireesh S",
    graduationYear: 2014,
    currentPosition: "MS at Arizona State University, currently at Amazon",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Amazon",
  },
  {
    id: 9,
    name: "Sowmya Jain",
    graduationYear: 2014,
    currentPosition: "MS at Univ of California, Irvine, currently at Facebook",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Facebook",
  },
  {
    id: 10,
    name: "Noone Sowmya",
    graduationYear: 2014,
    currentPosition: "MS at University of Connecticut",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "University of Connecticut",
  },
  {
    id: 11,
    name: "Manogana V",
    graduationYear: 2015,
    currentPosition: "MS at Arizona State University, currently at Yahoo",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Yahoo",
  },
  {
    id: 12,
    name: "Madhu Illuri",
    graduationYear: 2015,
    currentPosition: "MS at Arizona State University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Arizona State University",
  },
  {
    id: 13,
    name: "Siddarth Agarwal",
    graduationYear: 2015,
    currentPosition: "MS at Univ of California, San Diego",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "UC San Diego",
  },
  {
    id: 14,
    name: "Krishna Mohan Reddy",
    graduationYear: 2015,
    currentPosition: "MS at Arizona, currently at Facebook",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Facebook",
  },
  {
    id: 15,
    name: "Iniyai T",
    graduationYear: 2016,
    currentPosition: "MS at University of Souther California",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "University of Southern California",
  },
  {
    id: 16,
    name: "Harikrishna M",
    graduationYear: 2016,
    currentPosition: "MS at North Carolina State University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "North Carolina State University",
  },
  {
    id: 17,
    name: "Avinash G",
    graduationYear: 2016,
    currentPosition: "MS at Univ california, Losangles",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "UCLA",
  },
  {
    id: 18,
    name: "Shubham K Singh",
    graduationYear: 2016,
    currentPosition: "MS at International Business, Maastricht University, Netherlands",
    image: "/placeholder.svg?height=150&width=150",
    country: "Netherlands",
    university: "Maastricht University",
  },
  {
    id: 19,
    name: "Hari Krishna",
    graduationYear: 2016,
    currentPosition: "Arizona State University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Arizona State University",
  },
  {
    id: 20,
    name: "Sai Hemanth Gantasala",
    graduationYear: 2016,
    currentPosition: "MS at Arizona State University",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Arizona State University",
  },
  {
    id: 21,
    name: "Neeraj",
    graduationYear: 2017,
    currentPosition: "University of Amsterdam",
    image: "/placeholder.svg?height=150&width=150",
    country: "Netherlands",
    university: "University of Amsterdam",
  },
  {
    id: 22,
    name: "Avinash Ranganathan",
    graduationYear: 2017,
    currentPosition: "EMS European Management School",
    image: "/placeholder.svg?height=150&width=150",
    country: "Europe",
    university: "EMS European Management School",
  },
  {
    id: 23,
    name: "Sai Teja",
    graduationYear: 2017,
    currentPosition: "Masters at Sweden",
    image: "/placeholder.svg?height=150&width=150",
    country: "Sweden",
    university: "Sweden University",
  },
  {
    id: 24,
    name: "Ashiq",
    graduationYear: 2017,
    currentPosition: "Cambridge",
    image: "/placeholder.svg?height=150&width=150",
    country: "UK",
    university: "Cambridge University",
  },
  {
    id: 25,
    name: "Dhayalan",
    graduationYear: 2017,
    currentPosition: "University of Amsterdam",
    image: "/placeholder.svg?height=150&width=150",
    country: "Netherlands",
    university: "University of Amsterdam",
  },
  {
    id: 26,
    name: "Shantanu K",
    graduationYear: 2017,
    currentPosition: "University of Colorado Boulder",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "University of Colorado Boulder",
  },
  {
    id: 27,
    name: "Seshu",
    graduationYear: 2017,
    currentPosition: "UT Dallas",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "UT Dallas",
  },
  {
    id: 28,
    name: "Seshuram S",
    graduationYear: 2017,
    currentPosition: "MS at Univ of Texas, Dallas",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "UT Dallas",
  },
  {
    id: 29,
    name: "Vijay Sri L",
    graduationYear: 2017,
    currentPosition: "MS at Georgia Tech",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Georgia Tech",
  },
  {
    id: 30,
    name: "Dileep Vemula",
    graduationYear: 2018,
    currentPosition: "MS at Australian National University",
    image: "/placeholder.svg?height=150&width=150",
    country: "Australia",
    university: "Australian National University",
  },
  {
    id: 31,
    name: "Dakshaja Uppalapati",
    graduationYear: 2018,
    currentPosition: "Emertxe",
    image: "/placeholder.svg?height=150&width=150",
    country: "International",
    company: "Emertxe",
  },
  {
    id: 32,
    name: "Nara Ashok Chakravarthy",
    graduationYear: 2018,
    currentPosition: "MS at Australian National University",
    image: "/placeholder.svg?height=150&width=150",
    country: "Australia",
    university: "Australian National University",
  },
  {
    id: 33,
    name: "Edwin Murari",
    graduationYear: 2018,
    currentPosition: "MS at University of Melbourne",
    image: "/placeholder.svg?height=150&width=150",
    country: "Australia",
    university: "University of Melbourne",
  },
  {
    id: 34,
    name: "Anuhya K",
    graduationYear: 2018,
    currentPosition: "MS at UNCC",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "UNCC",
  },
  {
    id: 35,
    name: "Vignesh Sairaj",
    graduationYear: 2018,
    currentPosition: "MS at University of Souther California, currently at Apple Inc",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    company: "Apple Inc",
  },
  {
    id: 36,
    name: "P Kowsika",
    graduationYear: 2019,
    currentPosition: "Ohio State, MS",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Ohio State University",
  },
  {
    id: 37,
    name: "Shiv Vidhyut",
    graduationYear: 2019,
    currentPosition: "Columbia University, Newyork, MS",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "Columbia University",
  },
  {
    id: 38,
    name: "Shreya Suresh",
    graduationYear: 2019,
    currentPosition: "University of Maryland, MS",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "University of Maryland",
  },
  {
    id: 39,
    name: "Aishwarya R",
    graduationYear: 2019,
    currentPosition: "University of Massachusetts, MS",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "University of Massachusetts",
  },
  {
    id: 40,
    name: "KS Ranjth Raj",
    graduationYear: 2019,
    currentPosition: "Australian National University, MS",
    image: "/placeholder.svg?height=150&width=150",
    country: "Australia",
    university: "Australian National University",
  },
  {
    id: 41,
    name: "Prashanth Reddy",
    graduationYear: 2019,
    currentPosition: "University of Davis, MS",
    image: "/placeholder.svg?height=150&width=150",
    country: "USA",
    university: "University of Davis",
  },
]

// Get unique graduation years for filtering
const graduationYears = [...new Set(alumniData.map((alumni) => alumni.graduationYear))].sort()

// Get unique countries for filtering
const countries = [...new Set(alumniData.map((alumni) => alumni.country))].sort()

export default function AlumniAbroad() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAlumni, setSelectedAlumni] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter alumni based on search query and filters
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.currentPosition.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesYear = selectedYear ? alumni.graduationYear === selectedYear : true
    const matchesCountry = selectedCountry ? alumni.country === selectedCountry : true

    return matchesSearch && matchesYear && matchesCountry
  })

  // Group alumni by graduation year for statistics
  const alumniByYear = graduationYears.map((year) => ({
    year,
    count: alumniData.filter((alumni) => alumni.graduationYear === year).length,
  }))

  // Group alumni by country for statistics
  const alumniByCountry = countries
    .map((country) => ({
      country,
      count: alumniData.filter((alumni) => alumni.country === country).length,
    }))
    .sort((a, b) => b.count - a.count)

  const openAlumniDialog = (alumni) => {
    setSelectedAlumni(alumni)
    setIsDialogOpen(true)
  }

  const closeAlumniDialog = () => {
    setIsDialogOpen(false)
    setTimeout(() => setSelectedAlumni(null), 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 opacity-50 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our International Alumni
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              The first batch of Computer Science and Engineering graduated in the year 2013. Ever since, our alumni
              have been making significant contributions globally at prestigious universities and leading tech
              companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Alumni by Year</h3>
              <div className="space-y-3">
                {alumniByYear.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.year}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(item.count / Math.max(...alumniByYear.map((i) => i.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Destinations</h3>
              <div className="space-y-3">
                {alumniByCountry.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.country}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: `${(item.count / Math.max(...alumniByCountry.map((i) => i.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Alumni Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Alumni at top tech companies like Apple, Facebook, Amazon</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Graduates pursuing advanced degrees at prestigious universities</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Global presence across USA, Europe, Australia and more</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Strong research contributions in various domains</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search alumni by name or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </button>

              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500"}`}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500"}`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedYear(null)}
                          className={`px-3 py-1 text-sm rounded-full ${
                            selectedYear === null
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          All
                        </button>
                        {graduationYears.map((year) => (
                          <button
                            key={year}
                            onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedYear === year
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCountry(null)}
                          className={`px-3 py-1 text-sm rounded-full ${
                            selectedCountry === null
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          All
                        </button>
                        {countries.map((country) => (
                          <button
                            key={country}
                            onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedCountry === country
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredAlumni.length}</span> of{" "}
              <span className="font-medium">{alumniData.length}</span> alumni
            </p>
          </div>

          {/* Alumni Grid/List View */}
          {filteredAlumni.length > 0 ? (
            <div
              className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}`}
            >
              {filteredAlumni.map((alumni, index) => (
                <motion.div
                  key={alumni.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`${
                    viewMode === "grid"
                      ? "bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                      : "bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 flex"
                  }`}
                  onClick={() => openAlumniDialog(alumni)}
                >
                  {viewMode === "grid" ? (
                    // Grid view
                    <>
                      <div className="p-4">
                        <div className="flex items-center justify-center mb-4">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-100">
                            <Image
                              src={alumni.image || "/placeholder.svg"}
                              alt={alumni.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">{alumni.name}</h3>
                        <div className="flex items-center justify-center text-sm text-gray-500 mb-3">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>Class of {alumni.graduationYear}</span>
                        </div>
                        <div className="text-sm text-gray-600 text-center mb-3">{alumni.currentPosition}</div>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{alumni.country}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 flex justify-center">
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
                          View Details
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </>
                  ) : (
                    // List view
                    <>
                      <div className="flex-shrink-0 w-16 sm:w-24 flex items-center justify-center p-2">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-100">
                          <Image
                            src={alumni.image || "/placeholder.svg"}
                            alt={alumni.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-grow p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{alumni.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>Class of {alumni.graduationYear}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{alumni.currentPosition}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{alumni.country}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center pr-4">
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
                          View
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No alumni found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our alumni are making significant contributions across the globe, from leading tech companies to
              prestigious academic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Briefcase className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Industry Leaders</h3>
                <p className="text-gray-600 mb-4">
                  Our alumni work at top tech companies like Facebook, Amazon, Apple, and more, contributing to
                  cutting-edge technologies and innovations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Facebook</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Amazon</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Apple</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Yahoo</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Intel</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Academic Excellence</h3>
                <p className="text-gray-600 mb-4">
                  Many of our alumni pursue advanced degrees at prestigious universities worldwide, contributing to
                  research and academic advancement.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Columbia</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Georgia Tech</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">UC San Diego</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Cambridge</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">ANU</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <MapPin className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Global Presence</h3>
                <p className="text-gray-600 mb-4">
                  Our alumni network spans across continents, with graduates making an impact in the USA, Europe,
                  Australia, and beyond.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">USA</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Netherlands</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">UK</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Australia</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Sweden</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alumni Detail Dialog */}
      <AnimatePresence>
        {isDialogOpen && selectedAlumni && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeAlumniDialog}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeAlumniDialog}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-100 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                      <Image
                        src={selectedAlumni.image || "/placeholder.svg"}
                        alt={selectedAlumni.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedAlumni.name}</h2>
                      <div className="flex items-center text-gray-500 mb-2">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        <span>Class of {selectedAlumni.graduationYear}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{selectedAlumni.currentPosition}</p>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedAlumni.country}</span>
                      </div>
                      <div className="flex space-x-3">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-gray-900 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Education</h3>
                    <div className="mb-6">
                      <div className="flex items-start mb-3">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-blue-600 text-xs">•</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">B.Tech in Computer Science and Engineering</p>
                          <p className="text-gray-600">IIITDM Kancheepuram, India</p>
                          <p className="text-sm text-gray-500">2009 - {selectedAlumni.graduationYear}</p>
                        </div>
                      </div>
                      {selectedAlumni.university && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-blue-600 text-xs">•</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">MS/PhD in Computer Science</p>
                            <p className="text-gray-600">{selectedAlumni.university}</p>
                            <p className="text-sm text-gray-500">{selectedAlumni.graduationYear} - Present</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedAlumni.company && (
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Experience</h3>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-green-600 text-xs">•</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Software Engineer</p>
                            <p className="text-gray-600">{selectedAlumni.company}</p>
                            <p className="text-sm text-gray-500">Present</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                      <p className="text-gray-600 mb-1">
                        <span className="font-medium">Email:</span>{" "}
                        {selectedAlumni.name.toLowerCase().replace(/\s/g, ".")}@alumni.iiitdm.ac.in
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">LinkedIn:</span> linkedin.com/in/
                        {selectedAlumni.name.toLowerCase().replace(/\s/g, "-")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">IIITDM Kancheepuram</h3>
              <p className="text-gray-400 mb-4">
                Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram, Chennai, India
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/people/faculty" className="text-gray-400 hover:text-white transition-colors">
                    Faculty
                  </Link>
                </li>
                <li>
                  <Link href="/people/staff" className="text-gray-400 hover:text-white transition-colors">
                    Staff
                  </Link>
                </li>
                <li>
                  <Link href="/people/alumni/india" className="text-gray-400 hover:text-white transition-colors">
                    Alumni in India
                  </Link>
                </li>
                <li>
                  <Link href="/people/alumni/abroad" className="text-gray-400 hover:text-white transition-colors">
                    Alumni Abroad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">IIITDM Kancheepuram, Vandalur-Kelambakkam Road, Chennai-600127</p>
              <p className="text-gray-400 mb-2">Email: office@iiitdm.ac.in</p>
              <p className="text-gray-400">Phone: +91-44-2747 6300</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} IIITDM Kancheepuram. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

