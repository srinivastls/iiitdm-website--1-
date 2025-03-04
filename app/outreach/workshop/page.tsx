"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Calendar,
  Award,
  Users,
  ChevronRight,
  ChevronLeft,
  Search,
  ArrowRight,
  Clock,
  User,
  Trophy,
  BookOpen,
  Code,
  Database,
  Eye,
  Brain,
  Cpu,
} from "lucide-react"

// Workshop data
const workshops = [
  {
    id: 1,
    title: "ICPC 2023 Preliminary Round",
    description: "IIITDM Kancheepuram is one of regional center of ICPC.",
    date: "October 2023",
    organizers: ["Dr. N Sadagopan", "Dr. V Masilamani"],
    participants: 120,
    category: "Competition",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Code className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Short Term Course on Basics of Python",
    description: "A comprehensive course covering Python fundamentals for beginners.",
    date: "15 Feb - 7 March, 2023",
    organizers: ["Dr. B Sivaselvan", "Dr. Rahul Raman"],
    participants: 75,
    category: "Course",
    image: "/placeholder.svg?height=400&width=600",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "AICTE Sponsored QIP Short Term Course on Machine Intelligence for Computer Vision",
    description: "Advanced course on applying machine learning techniques to computer vision problems.",
    date: "28 Feb - 5 Mar, 2022",
    organizers: ["Dr. Jagadeesh Kakarla", "Dr. Rahul Raman"],
    participants: 60,
    category: "Course",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Eye className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Short Term Course on Python for Data Science",
    description: "Focused course on using Python for data analysis and visualization.",
    date: "5-10 June, 2023",
    organizers: ["Dr. Ram Prasad Padhy", "Dr. B Sivaselvan"],
    participants: 85,
    category: "Course",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: 5,
    title: "Workshop on Competitive Programming",
    description: "Intensive workshop to improve algorithmic problem-solving skills.",
    date: "28 Oct - 5 Nov, 2023",
    organizers: ["Dr. N Sadagopan", "Dr. V Masilamani"],
    participants: 90,
    category: "Workshop",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Code className="h-6 w-6" />,
  },
  {
    id: 6,
    title: "SERB Sponsored Workshop on Deep Learning for Biometrics Privacy and Security",
    description: "Advanced workshop on applying deep learning techniques to biometric security challenges.",
    date: "19-25 June, 2023",
    organizers: ["Dr. Umarani J", "Dr. Rahul Raman", "Dr. Sivaselvan B"],
    participants: 70,
    category: "Workshop",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Brain className="h-6 w-6" />,
  },
  {
    id: 7,
    title: "AICTE Sponsored QIP Short Term Course on Recent Trends and Applications in Artificial Intelligence",
    description: "Comprehensive course covering the latest developments in AI and their practical applications.",
    date: "14-19 Mar, 2022",
    organizers: ["Dr. Ram Prasad Padhy", "Dr. Rahul Raman"],
    participants: 89,
    category: "Course",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Cpu className="h-6 w-6" />,
  },
]

// Awards data
const awards = [
  {
    id: 1,
    event: "ACM-ICPC 2014",
    students: ["Sakthi vel", "Siddharth Agarwal", "Saikumar"],
    recognition: "Third in Chennai Region",
    year: 2014,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    event: "ACM-ICPC 2017",
    students: ["Aneesh", "Vikas", "Saiyashovardhan"],
    recognition: "Second in Chennai Region",
    year: 2017,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    event: "ACM-ICPC 2017",
    students: ["Vignesh Sairaj", "Vijayaraghavan", "Sreeraj"],
    recognition: "Cleared Chennai Region and Participated in Regionals",
    year: 2017,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    event: "Google Kickstart",
    students: ["Aneesh D H (COE16)"],
    recognition: "Placed in the 13th Rank in India and 49th Overall",
    year: 2018,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    event: "ABACUS, CEG",
    students: ["Aneesh DH", "M.A. Sankar", "Vikas Venkatraman"],
    recognition: "Secured 2nd place",
    year: 2018,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    event: "ACM ICPC Chennai Provincial Programming Contest",
    students: ["Aneesh D H", "Vikas Venkatraman", "Yashovardhan"],
    recognition: "Won 3rd place",
    year: 2018,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Stats
const stats = [
  { id: 1, value: 8, label: "Workshops", icon: <Calendar className="h-6 w-6" /> },
  { id: 2, value: 6, label: "Awards", icon: <Award className="h-6 w-6" /> },
  { id: 3, value: 589, label: "Participants", icon: <Users className="h-6 w-6" /> },
]

export default function WorkshopPage() {
  const [activeTab, setActiveTab] = useState("workshops")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentWorkshopIndex, setCurrentWorkshopIndex] = useState(0)

  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [awardsRef, awardsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const categories = ["All", "Workshop", "Course", "Competition"]

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || workshop.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const nextWorkshop = () => {
    setCurrentWorkshopIndex((prev) => (prev + 1) % workshops.length)
  }

  const prevWorkshop = () => {
    setCurrentWorkshopIndex((prev) => (prev - 1 + workshops.length) % workshops.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextWorkshop()
    }, 5000)

    return () => clearInterval(interval)
  }, []) // Removed nextWorkshop from dependencies

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
        duration: 0.5,
      },
    },
  }

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 opacity-50 z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Workshops & Outreach
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Knowledge gathering, dissemination and discovery are the prime moto of our institute. As part of
                outreach, the expertise of our faculty is best utilized through summer internships, faculty development
                programmes, workshops, conferences and certificate programmes.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center">
                  Explore Workshops <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10 rounded-xl"></div>
                <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
                  <button
                    onClick={prevWorkshop}
                    className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronLeft className="h-6 w-6 text-blue-600" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
                  <button
                    onClick={nextWorkshop}
                    className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronRight className="h-6 w-6 text-blue-600" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWorkshopIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={workshops[currentWorkshopIndex].image || "/placeholder.svg"}
                      alt={workshops[currentWorkshopIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold mb-2">{workshops[currentWorkshopIndex].title}</h3>
                      <p className="text-white/90 text-sm mb-2">{workshops[currentWorkshopIndex].date}</p>
                      <div className="flex items-center text-white/80 text-sm">
                        <Users className="h-4 w-4 mr-1" /> {workshops[currentWorkshopIndex].participants} participants
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center space-x-2">
                  {workshops.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentWorkshopIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentWorkshopIndex ? "bg-white w-4" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                custom={index}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                variants={statsVariants}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">{stat.icon}</div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">{stat.value}+</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("workshops")}
              className={`px-6 py-3 font-medium text-sm transition-all ${
                activeTab === "workshops"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Workshops & Courses
            </button>
            <button
              onClick={() => setActiveTab("awards")}
              className={`px-6 py-3 font-medium text-sm transition-all ${
                activeTab === "awards"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Awards & Recognitions
            </button>
          </div>

          {activeTab === "workshops" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Workshops Organized</h2>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search workshops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                    />
                  </div>
                  <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                          selectedCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative" ref={timelineRef}>
                <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-blue-200 transform md:translate-x-px"></div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={timelineInView ? "visible" : "hidden"}
                  className="space-y-12"
                >
                  {filteredWorkshops.length > 0 ? (
                    filteredWorkshops.map((workshop, index) => (
                      <motion.div
                        key={workshop.id}
                        variants={itemVariants}
                        className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                      >
                        <div className="md:w-1/2 mb-8 md:mb-0">
                          <div
                            className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                              index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                            }`}
                          >
                            <div className="relative h-48 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10"></div>
                              <img
                                src={workshop.image || "/placeholder.svg"}
                                alt={workshop.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">{workshop.icon}</div>
                                <span className="text-sm font-medium text-blue-600">{workshop.category}</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                              <p className="text-gray-600 mb-4">{workshop.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Clock className="h-4 w-4 mr-2" /> {workshop.date}
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                  <User className="h-4 w-4 mr-2" /> {workshop.organizers.join(", ")}
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Users className="h-4 w-4 mr-2" /> {workshop.participants} participants
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-1/2 relative">
                          <div
                            className={`absolute top-0 ${
                              index % 2 === 0 ? "md:right-0 md:-mr-3.5" : "md:left-0 md:-ml-3.5"
                            } h-7 w-7 rounded-full bg-blue-600 border-4 border-white shadow-md z-10`}
                          ></div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No workshops found matching your criteria.</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === "awards" && (
            <div ref={awardsRef}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Awards & Recognitions</h2>
              <p className="text-gray-700 mb-8">
                Students of IIITDM actively participate in extra curricular activities and represent the institute in
                various events organized by other centrally funded institutes and scientific bodies.
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={awardsInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {awards.map((award) => (
                  <motion.div
                    key={award.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-red-600/20 z-10"></div>
                      <img
                        src={award.image || "/placeholder.svg"}
                        alt={award.event}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20">
                        {award.year}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                        <h3 className="text-lg font-bold">{award.event}</h3>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">Students:</div>
                        <div className="flex flex-wrap gap-1">
                          {award.students.map((student, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {student}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                        <p className="text-sm text-gray-700">{award.recognition}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in our workshops?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join our upcoming workshops and courses to enhance your skills and knowledge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-all">
                View Upcoming Workshops
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

