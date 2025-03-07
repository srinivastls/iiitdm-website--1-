"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Building,
  Users,
  Calendar,
  DollarSign,
  User,
  Briefcase,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle,
  X,
} from "lucide-react"
import MainNav from "@/components/MainNav"
import Link from "next/link"
import Image from "next/image"
// Project data
const projects = [
  {
    id: 1,
    title: "Machine Learning Algorithms for Security Applications & Image Processing",
    type: "faculty",
    pi: "Dr. V Masilamani",
    copi: [],
    sponsor: "Forensics Intelligence Surveillance and Security Technologies Pvt. Ltd. Chennai",
    duration: "Two Years",
    value: "6 Lakhs",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "This project focuses on developing advanced machine learning algorithms for security applications and image processing. The research aims to enhance surveillance systems with intelligent features for threat detection and image analysis.",
    outcomes: [
      "Developed novel ML algorithms for security surveillance",
      "Created image processing techniques for forensic analysis",
      "Published 2 research papers in international journals",
      "Filed 1 patent for the developed technology",
    ],
    technologies: ["Machine Learning", "Computer Vision", "Image Processing", "Security Systems"],
  },
  {
    id: 2,
    title: "People Counter for Bus",
    type: "faculty",
    pi: "Dr. V Masilamani",
    copi: ["Prof. Banshidhar Majhi"],
    sponsor: "Vamo Systems Private Ltd. Chennai",
    duration: "1 year",
    value: "2 Lakhs",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "This project involves developing an automated system to count passengers entering and exiting buses. The technology uses computer vision and sensor fusion to provide accurate passenger counts for public transportation management.",
    outcomes: [
      "Developed a prototype with 95% counting accuracy",
      "Implemented in 5 test buses for field trials",
      "Created a dashboard for real-time monitoring",
      "Reduced manual counting errors by 85%",
    ],
    technologies: ["Computer Vision", "IoT", "Embedded Systems", "Data Analytics"],
  },
  {
    id: 3,
    title: "'MediVo' - An online portal for e-consultation customized to dentists",
    type: "student",
    studentMembers: ["S Lokesh Kumar", "R Neeraj", "Shubham Kumar Gandhi", "Adarsh Srivatasava"],
    studentBatch: "B.Tech COE - Class of 2013-17",
    facultyAdviser: "Dr. N Sadagopan",
    status: "Completed and Transferred",
    company: "vexo.org",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "MediVo is an online portal designed specifically for dental e-consultations. The platform enables dentists to conduct virtual consultations, manage patient records, and schedule appointments efficiently.",
    outcomes: [
      "Developed a fully functional UI meeting dentist specifications",
      "Created secure patient data management system",
      "Implemented video consultation features",
      "Transferred to vexo.org for further enhancement",
    ],
    technologies: ["Web Development", "Healthcare IT", "UI/UX Design", "Telemedicine"],
  },
  {
    id: 4,
    title: "Object Reconstruction from a stream of projections of CT scan images",
    type: "student",
    studentMembers: ["M Aishwarya"],
    studentBatch: "B.Tech 2014-18",
    facultyAdviser: "Dr. N Sadagopan",
    company: "LUCID Technologies Ltd, Chennai",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "This project focuses on developing algorithms for reconstructing 3D objects from CT scan image projections. The technology enables more accurate medical diagnostics and visualization of internal structures.",
    outcomes: [
      "Developed reconstruction algorithms with high accuracy",
      "Reduced processing time by 40% compared to existing methods",
      "Created visualization tools for medical professionals",
      "Implemented in LUCID's medical imaging software",
    ],
    technologies: ["Medical Imaging", "Computer Vision", "3D Reconstruction", "Algorithm Design"],
  },
  {
    id: 5,
    title: "Open Source Web Server Design to mimic AKAMAI features",
    type: "student",
    studentMembers: ["P Lalitha"],
    studentBatch: "B.Tech 2014-18",
    facultyAdviser: "Dr. N Sadagopan",
    company: "Start Smart Labs, Chennai",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "This project involves designing an open-source web server that replicates key features of AKAMAI's content delivery network. The server aims to provide efficient content delivery and caching capabilities.",
    outcomes: [
      "Developed an open-source web server with CDN capabilities",
      "Implemented caching mechanisms for improved performance",
      "Created load balancing features for high availability",
      "Achieved 30% faster content delivery in testing",
    ],
    technologies: [
      "Web Server Architecture",
      "Content Delivery Networks",
      "Distributed Systems",
      "Open Source Development",
    ],
  },
]

// Statistics data
const stats = [
  { id: 1, label: "Total Projects", value: 15, icon: Briefcase },
  { id: 2, label: "Industry Partners", value: 8, icon: Building },
  { id: 3, label: "Faculty Involved", value: 6, icon: User },
  { id: 4, label: "Students Engaged", value: 25, icon: Users },
  { id: 5, label: "Total Funding", value: "₹25L+", icon: DollarSign },
]

export default function IndustrialConsultancy() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Auto-rotate featured projects
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === projects.slice(0, 3).length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentSlide]) // Fixed dependency

  const filteredProjects = projects.filter((project) => {
    const matchesTab = activeTab === "all" || project.type === activeTab
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.pi && project.pi.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.sponsor && project.sponsor.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const openProjectModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === projects.slice(0, 3).length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projects.slice(0, 3).length - 1 : prev - 1))
  }

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
        damping: 12,
      },
    },
  }

  return (
    <div>
      
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Industrial Consultancy
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Bridging academic excellence with industry innovation through collaborative research and development
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-blue-700 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Explore Projects <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                Partner With Us <Building size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900"></div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most impactful industry collaborations that are driving innovation and solving real-world challenges
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div className="relative h-[400px] md:h-[500px]">
                {projects.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      zIndex: currentSlide === index ? 10 : 0 
                    }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
                      <img 
                        src={project.image || "/placeholder.svg"} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 text-white">
                        <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4">
                          {project.type === "faculty" ? "Faculty-Led Project" : "Student Project"}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                        <p className="text-gray-200 mb-4 max-w-3xl">
                          {project.description.substring(0, 120)}...
                        </p>
                        <div className="flex flex-wrap gap-4 mb-6">
                          {project.type === "faculty" ? (
                            <>
                              <div className="flex items-center gap-2 text-sm text-gray-200">
                                <User size={16} />
                                <span>PI: {project.pi}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-200">
                                <Building size={16} />
                                <span>{project.sponsor.split(" ")[0]}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 text-sm text-gray-200">
                                <Users size={16} />
                                <span>{project.studentMembers.length} Students</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-200">
                                <Building size={16} />
                                <span>{project.company}</span>
                              </div>
                            </>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-200">
                            <Calendar size={16} />
                            <span>{project.duration || "Completed"}</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openProjectModal(project)}
                          className="px-5 py-2 bg-white text-blue-700 rounded-full font-medium flex items-center gap-2 hover:bg-blue-50 transition-all"
                        >
                          View Details <ChevronRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-blue-700 shadow-lg hover:bg-white transition-all z-20"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-blue-700 shadow-lg hover:bg-white transition-all z-20"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Our Consultancy Projects</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore our portfolio of industry collaborations and student-led innovations
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                  >
                    <Filter size={18} /> Filter
                  </button>
                  
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-20 border border-gray-200 dark:border-gray-600">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setActiveTab("all");
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            activeTab === "all"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          All Projects
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("faculty");
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            activeTab === "faculty"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          Faculty-Led
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("student");
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            activeTab === "student"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          Student Projects
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeTab === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setActiveTab("faculty")}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeTab === "faculty"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Faculty-Led Projects
                </button>
                <button
                  onClick={() => setActiveTab("student")}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeTab === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Student Projects
                </button>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveTab("all");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-48">
                    <img 
                      src={project.image || "/placeholder.svg"} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.type === "faculty" 
                          ? "bg-blue-600 text-white" 
                          : "bg-emerald-600 text-white"
                      }`}>
                        {project.type === "faculty" ? "Faculty-Led" : "Student Project"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      {project.type === "faculty" ? (
                        <>
                          <div className="flex items-start gap-2">
                            <User size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Principal Investigator</p>
                              <p className="text-gray-800 dark:text-gray-200">{project.pi}</p>
                              {project.copi && project.copi.length > 0 && (
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                  Co-PI: {project.copi.join(", ")}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Building size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Sponsor</p>
                              <p className="text-gray-800 dark:text-gray-200 line-clamp-1">{project.sponsor}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <Users size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Student Members</p>
                              <p className="text-gray-800 dark:text-gray-200">
                                {project.studentMembers.length > 2 
                                  ? `${project.studentMembers[0]} +${project.studentMembers.length - 1} more`
                                  : project.studentMembers.join(", ")}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{project.studentBatch}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <User size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Faculty Adviser</p>
                              <p className="text-gray-800 dark:text-gray-200">{project.facultyAdviser}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Building size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                              <p className="text-gray-800 dark:text-gray-200">{project.company}</p>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="flex items-start gap-2">
                        <Clock size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="text-gray-800 dark:text-gray-200">{project.duration || "Completed"}</p>
                        </div>
                      </div>
                      {project.value && (
                        <div className="flex items-start gap-2">
                          <DollarSign size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Project Value</p>
                            <p className="text-gray-800 dark:text-gray-200">{project.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          project.status === "Completed" 
                            ? "bg-green-500" 
                            : "bg-amber-500"
                        }`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{project.status}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openProjectModal(project)}
                        className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all text-sm"
                      >
                        View Details <ChevronRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with IIITDM Kancheepuram</h2>
              <p className="text-lg mb-8 text-blue-100">
                Leverage our expertise and research capabilities to solve your industry challenges. Our faculty and students
                are ready to collaborate on innovative solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-700 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Initiate a Collaboration
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-3">
                    {selectedProject.type === "faculty" ? "Faculty-Led Project" : "Student Project"}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Project Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedProject.description}</p>

                    {selectedProject.outcomes && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Key Outcomes</h4>
                        <ul className="space-y-2">
                          {selectedProject.outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.technologies && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Project Details</h3>

                    <div className="space-y-4">
                      {selectedProject.type === "faculty" ? (
                        <>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Principal Investigator</h4>
                            <p className="text-gray-800 dark:text-white font-medium">{selectedProject.pi}</p>
                            {selectedProject.copi && selectedProject.copi.length > 0 && (
                              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                                Co-PI: {selectedProject.copi.join(", ")}
                              </p>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sponsor</h4>
                            <p className="text-gray-800 dark:text-white">{selectedProject.sponsor}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Student Members</h4>
                            <p className="text-gray-800 dark:text-white">{selectedProject.studentMembers.join(", ")}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{selectedProject.studentBatch}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Faculty Adviser</h4>
                            <p className="text-gray-800 dark:text-white">{selectedProject.facultyAdviser}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h4>
                            <p className="text-gray-800 dark:text-white">{selectedProject.company}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h4>
                        <p className="text-gray-800 dark:text-white">{selectedProject.duration || "Completed"}</p>
                      </div>
                      {selectedProject.value && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Value</h4>
                          <p className="text-gray-800 dark:text-white">{selectedProject.value}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              selectedProject.status === "Completed" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          ></div>
                          <span className="text-gray-800 dark:text-white">{selectedProject.status}</span>
                        </div>
                      </div>
                    </div>

                    {selectedProject.type === "faculty" && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                      >
                        Contact Principal Investigator <ExternalLink size={16} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}

