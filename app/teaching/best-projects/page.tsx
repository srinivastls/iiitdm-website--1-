"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Search,
  Calendar,
  User,
  Award,
  FileText,
  ExternalLink,
  Filter,
  ChevronRight,
  Cpu,
  MousePointer,
  Database,
  BrainCircuit,
  LineChart,
  ImageIcon,
  Github,
  Youtube,
  Presentation,
  FileCode,
  Lightbulb,
} from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import MainNav from "@/components/MainNav"

// Project data
const projectsData = [
  {
    id: 1,
    studentName: "R.Niveditha",
    year: 2013,
    domain: "Computer Architecture",
    adviser: "Dr Noor Mahammad",
    domainIcon: <Cpu className="w-5 h-5" />,
    color: "from-blue-500 to-blue-600",
    abstract:
      "This project focused on optimizing cache memory architecture for improved performance in multi-core processors. The research implemented novel cache coherence protocols that reduced memory access latency by 27% compared to traditional approaches.",
    keywords: ["Cache Memory", "Multi-core Processors", "Memory Architecture", "Performance Optimization"],
    resources: [
      { type: "Research Paper", url: "#" },
      { type: "Presentation", url: "#" },
    ],
  },
  {
    id: 2,
    studentName: "Ramesh Krishnan P",
    year: 2014,
    domain: "Human Computer Interaction",
    adviser: "Dr Sivaselvan B",
    domainIcon: <MousePointer className="w-5 h-5" />,
    color: "from-purple-500 to-purple-600",
    abstract:
      "This project developed a novel gesture-based interface for controlling smart home devices. The system used computer vision techniques to recognize hand gestures with 94% accuracy and was tested with elderly users, showing significant improvements in usability compared to traditional interfaces.",
    keywords: ["Gesture Recognition", "Smart Home", "Computer Vision", "Accessibility"],
    resources: [
      { type: "Demo Video", url: "#" },
      { type: "GitHub Repository", url: "#" },
    ],
  },
  {
    id: 3,
    studentName: "Krishna Chaurasia",
    year: 2015,
    domain: "Human Computer Interaction",
    adviser: "Dr Sivaselvan B",
    domainIcon: <MousePointer className="w-5 h-5" />,
    color: "from-purple-500 to-purple-600",
    abstract:
      "This project explored eye-tracking technologies for improving user experience in educational applications. The research developed algorithms that adapt content presentation based on user attention patterns, resulting in 32% improvement in information retention during learning sessions.",
    keywords: ["Eye Tracking", "Adaptive Learning", "Educational Technology", "User Experience"],
    resources: [
      { type: "Research Paper", url: "#" },
      { type: "Prototype", url: "#" },
    ],
  },
  {
    id: 4,
    studentName: "Roopesh Reddy",
    year: 2016,
    domain: "Datamining",
    adviser: "Dr Sivaselvan B",
    domainIcon: <Database className="w-5 h-5" />,
    color: "from-amber-500 to-amber-600",
    abstract:
      "This project developed novel association rule mining algorithms for large-scale e-commerce transaction data. The approach achieved 3x faster processing times while maintaining accuracy comparable to traditional algorithms, enabling real-time product recommendations.",
    keywords: ["Association Rules", "E-commerce", "Big Data", "Recommendation Systems"],
    resources: [
      { type: "Algorithm Documentation", url: "#" },
      { type: "Performance Analysis", url: "#" },
    ],
  },
  {
    id: 5,
    studentName: "M.Ashiq",
    year: 2017,
    domain: "Graph Algorithms",
    adviser: "Dr N Sadagopan",
    domainIcon: <FileCode className="w-5 h-5" />,
    color: "from-green-500 to-green-600",
    abstract:
      "This project focused on developing efficient algorithms for solving the minimum dominating set problem in specific graph classes. The research provided theoretical bounds and practical implementations that outperformed existing approaches by up to 40% on large network datasets.",
    keywords: ["Graph Theory", "Dominating Sets", "Algorithm Optimization", "Network Analysis"],
    resources: [
      { type: "Research Paper", url: "#" },
      { type: "Algorithm Implementation", url: "#" },
    ],
  },
  {
    id: 6,
    studentName: "Vignesh Sairaj",
    year: 2018,
    domain: "Machine Learning",
    adviser: "Dr Sivaselvan B",
    domainIcon: <BrainCircuit className="w-5 h-5" />,
    color: "from-indigo-500 to-indigo-600",
    abstract:
      "This project developed a novel deep learning architecture for sentiment analysis in multilingual social media content. The model achieved 89% accuracy across five Indian languages without requiring language-specific preprocessing, outperforming existing approaches.",
    keywords: ["Sentiment Analysis", "Deep Learning", "Natural Language Processing", "Multilingual Computing"],
    resources: [
      { type: "Model Architecture", url: "#" },
      { type: "Dataset", url: "#" },
    ],
  },
  {
    id: 7,
    studentName: "Sowbarnika R",
    year: 2019,
    domain: "Machine Learning",
    adviser: "Dr Sivaselvan B",
    domainIcon: <BrainCircuit className="w-5 h-5" />,
    color: "from-indigo-500 to-indigo-600",
    abstract:
      "This project explored reinforcement learning techniques for optimizing energy consumption in smart buildings. The system reduced energy usage by 23% while maintaining occupant comfort levels through adaptive control of HVAC systems based on occupancy patterns and weather forecasts.",
    keywords: ["Reinforcement Learning", "Energy Optimization", "Smart Buildings", "IoT"],
    resources: [
      { type: "Simulation Results", url: "#" },
      { type: "Implementation Guide", url: "#" },
    ],
  },
  {
    id: 8,
    studentName: "Navya Bora",
    year: 2019,
    domain: "Machine Learning",
    adviser: "Prof. Banshidhar Majhi",
    domainIcon: <BrainCircuit className="w-5 h-5" />,
    color: "from-indigo-500 to-indigo-600",
    abstract:
      "This project developed a novel approach for detecting fake news using a hybrid model combining natural language processing and network analysis. The system achieved 92% accuracy on benchmark datasets, significantly outperforming previous methods that relied solely on content analysis.",
    keywords: ["Fake News Detection", "Natural Language Processing", "Network Analysis", "Social Media"],
    resources: [
      { type: "Research Paper", url: "#" },
      { type: "GitHub Repository", url: "#" },
    ],
  },
  {
    id: 9,
    studentName: "Eashan Dash",
    year: 2020,
    domain: "Data Analytics",
    adviser: "Dr Sivaselvan B",
    domainIcon: <LineChart className="w-5 h-5" />,
    color: "from-cyan-500 to-cyan-600",
    abstract:
      "This project developed advanced visualization techniques for exploring high-dimensional healthcare data. The approach combined dimensionality reduction with interactive visualization tools, enabling medical professionals to identify patterns in patient data that were previously difficult to detect.",
    keywords: ["Data Visualization", "Healthcare Analytics", "Dimensionality Reduction", "Interactive Systems"],
    resources: [
      { type: "Visualization Tool", url: "#" },
      { type: "Case Studies", url: "#" },
    ],
  },
  {
    id: 10,
    studentName: "Arun Narayanan",
    year: 2020,
    domain: "Data Science",
    adviser: "Dr N Sadagopan",
    domainIcon: <Database className="w-5 h-5" />,
    color: "from-amber-500 to-amber-600",
    abstract:
      "This project focused on predictive modeling for urban traffic patterns using a combination of historical data and real-time sensors. The system achieved 87% accuracy in predicting congestion 30 minutes in advance, enabling more effective traffic management in urban areas.",
    keywords: ["Predictive Modeling", "Urban Computing", "Traffic Analysis", "Sensor Networks"],
    resources: [
      { type: "Model Documentation", url: "#" },
      { type: "Dataset", url: "#" },
    ],
  },
  {
    id: 11,
    studentName: "Abinand Rajagopal",
    year: 2021,
    domain: "Data Analytics",
    adviser: "Dr Sivaselvan B",
    domainIcon: <LineChart className="w-5 h-5" />,
    color: "from-cyan-500 to-cyan-600",
    abstract:
      "This project developed novel algorithms for anomaly detection in time-series data from industrial IoT sensors. The approach combined statistical methods with deep learning to achieve 96% detection accuracy with a low false positive rate, enabling predictive maintenance in manufacturing environments.",
    keywords: ["Anomaly Detection", "Time Series Analysis", "Industrial IoT", "Predictive Maintenance"],
    resources: [
      { type: "Algorithm Documentation", url: "#" },
      { type: "Case Study", url: "#" },
    ],
  },
  {
    id: 12,
    studentName: "Adepu Anil Kumar",
    year: 2021,
    domain: "Image Processing",
    adviser: "Dr Umarani J",
    domainIcon: <ImageIcon className="w-5 h-5" />,
    color: "from-rose-500 to-rose-600",
    abstract:
      "This project developed advanced image enhancement techniques for low-light photography on mobile devices. The approach used a lightweight neural network that could run efficiently on mobile hardware while producing results comparable to professional editing software.",
    keywords: ["Image Enhancement", "Computational Photography", "Neural Networks", "Mobile Computing"],
    resources: [
      { type: "Demo Application", url: "#" },
      { type: "Research Paper", url: "#" },
    ],
  },
]

// Domain filters
const domains = [
  { name: "All Domains", value: "all" },
  { name: "Computer Architecture", value: "Computer Architecture", icon: <Cpu className="w-4 h-4" /> },
  {
    name: "Human Computer Interaction",
    value: "Human Computer Interaction",
    icon: <MousePointer className="w-4 h-4" />,
  },
  { name: "Datamining", value: "Datamining", icon: <Database className="w-4 h-4" /> },
  { name: "Graph Algorithms", value: "Graph Algorithms", icon: <FileCode className="w-4 h-4" /> },
  { name: "Machine Learning", value: "Machine Learning", icon: <BrainCircuit className="w-4 h-4" /> },
  { name: "Data Analytics", value: "Data Analytics", icon: <LineChart className="w-4 h-4" /> },
  { name: "Data Science", value: "Data Science", icon: <Database className="w-4 h-4" /> },
  { name: "Image Processing", value: "Image Processing", icon: <ImageIcon className="w-4 h-4" /> },
]

// Adviser filters
const advisers = [
  { name: "All Advisers", value: "all" },
  { name: "Dr Noor Mahammad", value: "Dr Noor Mahammad" },
  { name: "Dr Sivaselvan B", value: "Dr Sivaselvan B" },
  { name: "Dr N Sadagopan", value: "Dr N Sadagopan" },
  { name: "Prof. Banshidhar Majhi", value: "Prof. Banshidhar Majhi" },
  { name: "Dr Umarani J", value: "Dr Umarani J" },
]

// Year filters
const years = [
  { name: "All Years", value: "all" },
  { name: "2021", value: 2021 },
  { name: "2020", value: 2020 },
  { name: "2019", value: 2019 },
  { name: "2018", value: 2018 },
  { name: "2017", value: 2017 },
  { name: "2016", value: 2016 },
  { name: "2015", value: 2015 },
  { name: "2014", value: 2014 },
  { name: "2013", value: 2013 },
]

export default function BestProjects() {
  // State for filters and search
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedAdviser, setSelectedAdviser] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 })

  // Filter projects based on selected filters and search query
  const filteredProjects = projectsData.filter((project) => {
    // Filter by domain
    if (selectedDomain !== "all" && project.domain !== selectedDomain) {
      return false
    }

    // Filter by adviser
    if (selectedAdviser !== "all" && project.adviser !== selectedAdviser) {
      return false
    }

    // Filter by year
    if (selectedYear !== "all" && project.year !== Number.parseInt(selectedYear.toString())) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        project.studentName.toLowerCase().includes(query) ||
        project.domain.toLowerCase().includes(query) ||
        project.adviser.toLowerCase().includes(query) ||
        (project.abstract && project.abstract.toLowerCase().includes(query))
      )
    }

    return true
  })

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo-placeholder.svg" alt="IIITDM Kancheepuram Logo" width={50} height={50} />
              <div>
                <span className="font-bold text-xl text-blue-900 block">IIITDM Kancheepuram</span>
                <span className="text-sm text-gray-600">Department of Computer Science & Engineering</span>
              </div>
            </Link>
            <MainNav />
          </div>
        </div>
      </header>

      <main className="pt-20">
        <NewsTicker />

        {/* Hero Section */}
        <section ref={heroRef} className="relative py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-100 rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Best Projects
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore outstanding student projects that showcase innovation, technical excellence, and creative
                problem-solving.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section ref={contentRef} className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Search and Filters */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Search */}
                    <div className="md:col-span-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by student name, domain, or adviser..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Domain Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                      <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                      >
                        {domains.map((domain) => (
                          <option key={domain.value} value={domain.value}>
                            {domain.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Adviser Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adviser</label>
                      <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedAdviser}
                        onChange={(e) => setSelectedAdviser(e.target.value)}
                      >
                        {advisers.map((adviser) => (
                          <option key={adviser.value} value={adviser.value}>
                            {adviser.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      >
                        {years.map((year) => (
                          <option key={year.value} value={year.value}>
                            {year.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Reset Filters */}
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedDomain("all")
                          setSelectedAdviser("all")
                          setSelectedYear("all")
                          setSearchQuery("")
                        }}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projects Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-blue-600" />
                  Outstanding Student Projects
                  <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {filteredProjects.length} projects
                  </span>
                </h2>

                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={contentInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="h-full"
                      >
                        <Card
                          className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-transparent hover:border-blue-500"
                          onClick={() => setSelectedProject(project)}
                        >
                          <CardHeader className={`pb-3 bg-gradient-to-r ${project.color} text-white`}>
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                {project.domainIcon}
                                <CardTitle className="text-lg ml-2">{project.domain}</CardTitle>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/20">
                                {project.year}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="p-5">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.studentName}</h3>
                            <p className="text-sm text-gray-500 mb-4 flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              Advised by {project.adviser}
                            </p>
                            <p className="text-gray-600 line-clamp-3 mb-4">{project.abstract}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.keywords &&
                                project.keywords.slice(0, 2).map((keyword, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              {project.keywords && project.keywords.length > 2 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{project.keywords.length - 2} more
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 flex items-center"
                            >
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-gray-50 border border-dashed border-gray-300">
                    <CardContent className="p-12 text-center">
                      <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
                      <p className="text-gray-500 mb-6">
                        No projects match your current filters. Try adjusting your search criteria.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedDomain("all")
                          setSelectedAdviser("all")
                          setSelectedYear("all")
                          setSearchQuery("")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Domain Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-900">Projects by Domain</CardTitle>
                    <CardDescription>Distribution of projects across different domains</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {domains
                        .filter((domain) => domain.value !== "all")
                        .map((domain) => {
                          const count = projectsData.filter((project) => project.domain === domain.value).length
                          const percentage = Math.round((count / projectsData.length) * 100)

                          return (
                            <div key={domain.value} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                    {domain.icon}
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{domain.name}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{count} projects</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>

                {/* Year Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-900">Projects by Year</CardTitle>
                    <CardDescription>Timeline of outstanding projects over the years</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {years
                        .filter((year) => year.value !== "all")
                        .map((year) => {
                          const count = projectsData.filter((project) => project.year === year.value).length
                          const percentage = Math.round((count / projectsData.length) * 100)

                          return (
                            <div key={year.value} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                                    <Calendar className="w-4 h-4 text-indigo-600" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{year.name}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{count} projects</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-indigo-600 h-2.5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Faculty Advisers */}
              <Card className="mb-12">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <CardTitle className="text-xl">Faculty Advisers</CardTitle>
                  <CardDescription className="text-blue-100">
                    Meet the faculty members who have guided these outstanding projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advisers
                      .filter((adviser) => adviser.value !== "all")
                      .map((adviser) => {
                        const adviserProjects = projectsData.filter((project) => project.adviser === adviser.value)
                        const domains = [...new Set(adviserProjects.map((project) => project.domain))]

                        return (
                          <Card key={adviser.value} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{adviser.name}</h4>
                                  <p className="text-sm text-gray-500 mb-2">{adviserProjects.length} projects guided</p>
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {domains.slice(0, 2).map((domain, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                      >
                                        {domain}
                                      </span>
                                    ))}
                                    {domains.length > 2 && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        +{domains.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 border-blue-200"
                                    onClick={() => setSelectedAdviser(adviser.value)}
                                  >
                                    View Projects
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold mb-2">Inspired by these projects?</h3>
                      <p className="text-indigo-100 max-w-xl">
                        Learn how you can develop your own innovative project and potentially be featured in our
                        showcase of outstanding student work.
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Project Ideas
                      </Button>
                      <Button variant="outline" className="border-white text-white hover:bg-white/10">
                        <User className="w-4 h-4 mr-2" />
                        Contact Advisers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <div
                    className={`px-4 py-2 rounded-md bg-gradient-to-r ${selectedProject.color} text-white inline-flex items-center mb-2`}
                  >
                    {selectedProject.domainIcon}
                    <span className="ml-2">{selectedProject.domain}</span>
                  </div>
                  <DialogTitle className="text-2xl">{selectedProject.studentName}'s Project</DialogTitle>
                  <DialogDescription className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedProject.year} |
                    <User className="w-4 h-4 mx-1" />
                    Advised by {selectedProject.adviser}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-900">Abstract</h3>
                    <p className="text-gray-700">{selectedProject.abstract}</p>
                  </div>

                  {selectedProject.keywords && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-900">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.resources && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-blue-900">Resources</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.resources.map((resource, idx) => {
                          let icon
                          switch (resource.type) {
                            case "Research Paper":
                              icon = <FileText className="w-4 h-4 mr-2" />
                              break
                            case "Presentation":
                              icon = <Presentation className="w-4 h-4 mr-2" />
                              break
                            case "Demo Video":
                              icon = <Youtube className="w-4 h-4 mr-2" />
                              break
                            case "GitHub Repository":
                              icon = <Github className="w-4 h-4 mr-2" />
                              break
                            default:
                              icon = <ExternalLink className="w-4 h-4 mr-2" />
                          }

                          return (
                            <Button key={idx} variant="outline" className="border-blue-200" asChild>
                              <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                                {icon}
                                {resource.type}
                              </Link>
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>IIITDM Kancheepuram</p>
              <p>Vandalur-Kelambakkam Road</p>
              <p>Chennai - 600127</p>
              <p>Email: info@iiitdm.ac.in</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/academics" className="hover:text-blue-400 transition-colors duration-300">
                    Academics
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:text-blue-400 transition-colors duration-300">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/people" className="hover:text-blue-400 transition-colors duration-300">
                    People
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">{/* Add social media icons here */}</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 IIITDM Kancheepuram. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

