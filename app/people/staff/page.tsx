"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Grid3X3,
  List,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Github,
  Mail,
  Phone,
  Building2,
} from "lucide-react"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import MainNav from "@/components/MainNav"

// Staff data
const staffData = [
  {
    id: 1,
    name: "Mr. Nagarajan R",
    position: "Technical Officer",
    department: "Computer Science",
    email: "nagarajan@iiitdm.ac.in",
    phone: "+91-9876543210",
    office: "CS Block, Room 101",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/nagarajan-r",
    github: "https://github.com/nagarajan-r",
    bio: "Mr. Nagarajan R is a Technical Officer with extensive experience in managing laboratory infrastructure and supporting academic activities.",
    responsibilities: [
      "Managing Computer Science laboratories",
      "Technical support for research projects",
      "Maintenance of department equipment",
      "Assisting faculty and students with technical requirements",
    ],
  },
  {
    id: 2,
    name: "Mr. Saravana Kumar K",
    position: "Technical Superintendent",
    department: "Computer Science",
    email: "saravanakumar@iiitdm.ac.in",
    phone: "+91-9876543211",
    office: "CS Block, Room 102",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/saravana-kumar-k",
    github: "https://github.com/saravana-kumar-k",
    bio: "Mr. Saravana Kumar K is a Technical Superintendent with expertise in network administration and hardware troubleshooting.",
    responsibilities: [
      "Network administration",
      "Hardware troubleshooting",
      "Software installation and maintenance",
      "Laboratory management",
    ],
  },
  {
    id: 3,
    name: "Mr. Aravindan S",
    position: "Junior Technical Superintendent",
    department: "Computer Science",
    email: "aravindan@iiitdm.ac.in",
    phone: "+91-9876543212",
    office: "CS Block, Room 103",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/aravindan-s",
    github: "https://github.com/aravindan-s",
    bio: "Mr. Aravindan S is a Junior Technical Superintendent specializing in software support and laboratory management.",
    responsibilities: [
      "Software support",
      "Laboratory management",
      "Technical assistance for academic activities",
      "Equipment maintenance",
    ],
  },
  {
    id: 4,
    name: "Mr. Aswin A",
    position: "Junior Technician",
    department: "Computer Science",
    email: "aswin@iiitdm.ac.in",
    phone: "+91-9876543213",
    office: "CS Block, Room 104",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/aswin-a",
    github: "https://github.com/aswin-a",
    bio: "Mr. Aswin A is a Junior Technician with skills in hardware maintenance and technical support.",
    responsibilities: ["Hardware maintenance", "Technical support", "Laboratory assistance", "Equipment setup"],
  },
  {
    id: 5,
    name: "Mr. Kamalakannan M",
    position: "Junior Technician",
    department: "Computer Science",
    email: "kamalakannan@iiitdm.ac.in",
    phone: "+91-9876543214",
    office: "CS Block, Room 105",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/kamalakannan-m",
    github: "https://github.com/kamalakannan-m",
    bio: "Mr. Kamalakannan M is a Junior Technician specializing in software installation and laboratory support.",
    responsibilities: ["Software installation", "Laboratory support", "Technical assistance", "Equipment maintenance"],
  },
  {
    id: 6,
    name: "Mrs. Kamalieswari A S",
    position: "Junior Technician",
    department: "Computer Science",
    email: "kamalieswari@iiitdm.ac.in",
    phone: "+91-9876543215",
    office: "CS Block, Room 106",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/kamalieswari-as",
    github: "https://github.com/kamalieswari-as",
    bio: "Mrs. Kamalieswari A S is a Junior Technician with expertise in database management and technical support.",
    responsibilities: ["Database management", "Technical support", "Laboratory assistance", "Documentation"],
  },
]

// Filter options
const positionFilters = [
  "All Positions",
  "Technical Officer",
  "Technical Superintendent",
  "Junior Technical Superintendent",
  "Junior Technician",
]

const departmentFilters = ["All Departments", "Computer Science", "Electronics", "Mechanical", "Design"]

export default function StaffPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("All Positions")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter staff based on search query and filters
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPosition = selectedPosition === "All Positions" || staff.position === selectedPosition
    const matchesDepartment = selectedDepartment === "All Departments" || staff.department === selectedDepartment

    return matchesSearch && matchesPosition && matchesDepartment
  })

  // Handle staff selection and dialog
  const handleStaffClick = (staff) => {
    setSelectedStaff(staff)
    setIsDialogOpen(true)
  }

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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-5 pattern-grid-lg"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
              Our Technical Staff
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Meet the dedicated technical team that supports the academic and research activities at IIITDM
              Kancheepuram.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3"
              >
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">6 Technical Staff Members</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3"
              >
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Technical Support</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search staff by name, position..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Toggle and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filters
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                className="overflow-hidden mt-4"
              >
                <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Position Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <div className="flex flex-wrap gap-2">
                      {positionFilters.map((position) => (
                        <Badge
                          key={position}
                          variant={selectedPosition === position ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedPosition === position ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedPosition(position)}
                        >
                          {position}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Department Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <div className="flex flex-wrap gap-2">
                      {departmentFilters.map((department) => (
                        <Badge
                          key={department}
                          variant={selectedDepartment === department ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedDepartment === department ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedDepartment(department)}
                        >
                          {department}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredStaff.length} of {staffData.length} staff members
          </div>
        </div>
      </section>

      {/* Staff Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredStaff.length === 0 ? (
            // No results
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No staff members found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedPosition("All Positions")
                    setSelectedDepartment("All Departments")
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredStaff.map((staff) => (
                <motion.div
                  key={staff.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleStaffClick(staff)}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        <Image src={staff.image || "/placeholder.svg"} alt={staff.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
                        <p className="text-sm text-blue-600">{staff.position}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{staff.bio}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Link
                          href={staff.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-5 w-5 text-blue-600 hover:text-blue-800 transition-colors" />
                        </Link>
                        <Link
                          href={staff.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-5 w-5 text-gray-700 hover:text-gray-900 transition-colors" />
                        </Link>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {staff.department}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // List View
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {filteredStaff.map((staff) => (
                <motion.div
                  key={staff.id}
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleStaffClick(staff)}
                >
                  <div className="p-4 flex items-center">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={staff.image || "/placeholder.svg"} alt={staff.name} fill className="object-cover" />
                    </div>

                    <div className="ml-4 flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
                          <p className="text-sm text-blue-600">{staff.position}</p>
                        </div>
                        <Badge variant="outline" className="text-xs mt-2 md:mt-0 w-fit">
                          {staff.department}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-1">{staff.bio}</p>
                    </div>

                    <div className="ml-4 flex space-x-3 flex-shrink-0">
                      <Link
                        href={staff.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-5 w-5 text-blue-600 hover:text-blue-800 transition-colors" />
                      </Link>
                      <Link
                        href={staff.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5 text-gray-700 hover:text-gray-900 transition-colors" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Staff Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
              <div className="relative">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100 mx-auto md:mx-0">
                      <Image
                        src={selectedStaff.image || "/placeholder.svg"}
                        alt={selectedStaff.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-bold text-gray-800">{selectedStaff.name}</h2>
                      <p className="text-lg text-blue-600 font-medium">{selectedStaff.position}</p>
                      <p className="text-gray-600 mt-1">{selectedStaff.department}</p>

                      <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
                        <Link
                          href={selectedStaff.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Linkedin size={18} />
                          <span>LinkedIn</span>
                        </Link>
                        <Link
                          href={selectedStaff.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <Github size={18} />
                          <span>GitHub</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <a
                            href={`mailto:${selectedStaff.email}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {selectedStaff.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-blue-600" />
                          <a
                            href={`tel:${selectedStaff.phone}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {selectedStaff.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">{selectedStaff.office}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Biography</h3>
                      <p className="text-gray-600">{selectedStaff.bio}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedStaff.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                          <span className="text-gray-600">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">Department of Computer Science</p>
              <p className="text-gray-300 mb-2">IIITDM Kancheepuram</p>
              <p className="text-gray-300 mb-2">Chennai, Tamil Nadu, India</p>
              <p className="text-gray-300">Email: cs@iiitdm.ac.in</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/people/faculty" className="text-gray-300 hover:text-white transition-colors">
                    Faculty
                  </Link>
                </li>
                <li>
                  <Link href="/people/staff" className="text-gray-300 hover:text-white transition-colors">
                    Staff
                  </Link>
                </li>
                <li>
                  <Link href="/people/research-scholars" className="text-gray-300 hover:text-white transition-colors">
                    Research Scholars
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Github size={24} />
                </Link>
              </div>
              <p className="text-gray-300">Stay updated with the latest news and events from our department.</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} IIITDM Kancheepuram. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

