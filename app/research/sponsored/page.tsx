"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, DollarSign, Users, Award, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

// Define the project type
interface ResearchProject {
  id: number
  title: string
  investigators: string
  sponsor: string
  duration: string
  value: string
  category: "ongoing" | "completed"
  color: string
}

// Sample data for research projects
const researchProjects: ResearchProject[] = [
  {
    id: 1,
    title: "On Spanning Trees - Generalizations and Variants (Theory and Algorithms)",
    investigators: "Dr. N Sadagopan",
    sponsor: "DST-SERB",
    duration: "Three years (2018-2021)",
    value: "16 Lakhs",
    category: "completed",
    color: "blue",
  },
  {
    id: 2,
    title: "Vertex Separators and its Variants: Structural and Algorithmic Study",
    investigators: "Dr. N Sadagopan",
    sponsor: "National Board for Higher Mathematics (NBHM), DAE, GOI",
    duration: "3 years (2018-2021)",
    value: "Rs 16.23 Lakhs",
    category: "completed",
    color: "purple",
  },
  {
    id: 3,
    title: "Projects under Visvesvaraya PhD Scheme for Electronics and IT",
    investigators: "Dr. M Sreekumar and Dr. Noor Mohammad",
    sponsor: "Ministry of Electronics and IT, Govt. of India",
    duration: "5 Years- Starting from AY 2015-16",
    value: "101.874 Lakhs",
    category: "completed",
    color: "green",
  },
  {
    id: 4,
    title: "Special Manpower Development Program for Chips to System Design",
    investigators: "PI: Dr. Noor Mohammad; Co-PI: Dr. Binsu J Kailath",
    sponsor: "MEITY, Govt. of India",
    duration: "3 years",
    value: "92.4 Lakh",
    category: "ongoing",
    color: "amber",
  },
  {
    id: 5,
    title: "Information Security Education Awareness Programme",
    investigators:
      "Prof. Kamakoti IIT Madras Co-PI : Prof. Banshidhar Majhi, Dr. V Masilamani, Dr. Noor Mohammad, Dr. B Sivaselvan, Dr. N Sadagopan",
    sponsor: "MEITY",
    duration: "2018",
    value: "3.17 Lakhs",
    category: "completed",
    color: "red",
  },
]

export default function SponsoredResearchPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ongoing" | "completed">("all")
  const [visibleProjects, setVisibleProjects] = useState<ResearchProject[]>(researchProjects)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalFunding: 0,
    ongoingProjects: 0,
    completedProjects: 0,
  })
  const [activeProject, setActiveProject] = useState<ResearchProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  // Calculate statistics
  useEffect(() => {
    const totalProjects = researchProjects.length
    const ongoingProjects = researchProjects.filter((p) => p.category === "ongoing").length
    const completedProjects = researchProjects.filter((p) => p.category === "completed").length

    // Calculate total funding (removing "Rs", "Lakhs", "Lakh" and converting to number)
    const totalFunding = researchProjects.reduce((sum, project) => {
      const valueStr = project.value.replace(/Rs\s|Lakhs|Lakh/gi, "").trim()
      return sum + Number.parseFloat(valueStr)
    }, 0)

    setStats({
      totalProjects,
      totalFunding,
      ongoingProjects,
      completedProjects,
    })
  }, [])

  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === "all") {
      setVisibleProjects(researchProjects)
    } else {
      setVisibleProjects(researchProjects.filter((project) => project.category === activeFilter))
    }
  }, [activeFilter])

  // Handle project click
  const handleProjectClick = (project: ResearchProject) => {
    setActiveProject(project)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Get color class based on project color
  const getColorClass = (color: string, type: "bg" | "border" | "text") => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100",
        border: "border-blue-500",
        text: "text-blue-700",
      },
      purple: {
        bg: "bg-purple-100",
        border: "border-purple-500",
        text: "text-purple-700",
      },
      green: {
        bg: "bg-green-100",
        border: "border-green-500",
        text: "text-green-700",
      },
      amber: {
        bg: "bg-amber-100",
        border: "border-amber-500",
        text: "text-amber-700",
      },
      red: {
        bg: "bg-red-100",
        border: "border-red-500",
        text: "text-red-700",
      },
    }

    return colorMap[color][type]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full opacity-10">
            {/* Background pattern */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5,
                  transform: `scale(${Math.random() * 1 + 0.5})`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Sponsored Research
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mb-8 text-blue-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Faculty members are actively engaged in cutting edge research in frontier areas of computer science. Our
            research is funded by leading organizations such as MEITY, DST and NBHM.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              href="#projects"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-800 rounded-md font-medium shadow-lg hover:bg-blue-50 transition-all duration-300 group"
            >
              View Research Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-blue-600 font-medium">Total Projects</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProjects}</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-green-600 font-medium">Total Funding</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalFunding.toFixed(2)} Lakhs</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-amber-600 font-medium">Ongoing Projects</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.ongoingProjects}</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-purple-600 font-medium">Completed Projects</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.completedProjects}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Projects Section */}
      <div id="projects" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of sponsored research projects that are advancing knowledge in various domains of
              computer science.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeFilter === "all" ? "bg-white shadow-sm text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter("ongoing")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeFilter === "ongoing" ? "bg-white shadow-sm text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeFilter === "completed"
                    ? "bg-white shadow-sm text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Completed
              </button>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border ${getColorClass(project.color, "border")} hover:shadow-lg transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className={`h-2 ${getColorClass(project.color, "bg")}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.category === "ongoing" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {project.category === "ongoing" ? "Ongoing" : "Completed"}
                    </span>
                    <span className={`text-sm font-medium ${getColorClass(project.color, "text")}`}>
                      {project.sponsor}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{project.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <Users className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 ml-2 line-clamp-1">{project.investigators}</p>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 ml-2">{project.duration}</p>
                    </div>
                    <div className="flex items-start">
                      <DollarSign className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 ml-2">{project.value}</p>
                    </div>
                  </div>
                  <button
                    className={`mt-2 inline-flex items-center text-sm font-medium ${getColorClass(project.color, "text")} hover:underline`}
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">No projects found matching your filter.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="bg-gradient-to-r from-indigo-800 to-blue-700 py-16 px-4 sm:px-6 lg:px-8 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Collaborating?</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            We welcome collaborations with industry partners and other academic institutions. Get in touch to explore
            potential research partnerships.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-800 rounded-md font-medium shadow-lg hover:bg-blue-50 transition-all duration-300 group"
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      {isModalOpen && activeProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`h-2 ${getColorClass(activeProject.color, "bg")}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeProject.category === "ongoing" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {activeProject.category === "ongoing" ? "Ongoing" : "Completed"}
                </span>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeProject.title}</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Principal Investigator(s)</p>
                    <p className="text-base text-gray-900">{activeProject.investigators}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Sponsor</p>
                    <p className="text-base text-gray-900">{activeProject.sponsor}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="text-base text-gray-900">{activeProject.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Funding Value</p>
                    <p className="text-base text-gray-900">{activeProject.value}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Project Description</h4>
                <p className="text-gray-600">
                  This research project focuses on advancing knowledge in the field of computer science. The project
                  aims to develop innovative solutions and contribute to the academic literature.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Computer Science
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Research
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Innovation
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors mr-3"
                >
                  Close
                </button>
                <a
                  href="#"
                  className={`px-4 py-2 ${getColorClass(activeProject.color, "bg")} ${getColorClass(activeProject.color, "text")} rounded-md font-medium hover:opacity-90 transition-colors inline-flex items-center`}
                >
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

