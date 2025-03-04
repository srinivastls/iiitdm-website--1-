"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  GraduationCap,
  FileText,
  Database,
  Image,
  Cpu,
  Wifi,
  GitBranch,
  Download,
  Search,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const researchAreas = [
  {
    id: 1,
    title: "Knowledge Engineering and Data Mining",
    icon: <Database className="w-10 h-10 text-emerald-500" />,
    faculty: ["Dr B.Sivaselvan"],
    description:
      "Research in knowledge engineering focuses on developing methods and tools for building knowledge-based systems. Data mining involves extracting patterns and knowledge from large amounts of data.",
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    hoverColor: "hover:border-emerald-300 hover:bg-emerald-100/70",
  },
  {
    id: 2,
    title: "Image processing, Biometrics, Pattern Recognition and Machine Learning",
    icon: <Image className="w-10 h-10 text-blue-500" />,
    faculty: ["Prof.Bansidhar Majhi", "Dr Umarani.J", "Dr V.Masilamani"],
    description:
      "This area focuses on developing algorithms for processing digital images, biometric authentication systems, pattern recognition techniques, and machine learning models.",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    hoverColor: "hover:border-blue-300 hover:bg-blue-100/70",
  },
  {
    id: 3,
    title: "High Performance Architectures, VLSI Design, High Speed Networks",
    icon: <Cpu className="w-10 h-10 text-purple-500" />,
    faculty: ["Dr Noor Mahammad"],
    description:
      "Research in this area involves designing high-performance computer architectures, VLSI circuits, and high-speed network protocols and infrastructure.",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    hoverColor: "hover:border-purple-300 hover:bg-purple-100/70",
  },
  {
    id: 4,
    title: "Wireless Sensor Networks, Robotics",
    icon: <Wifi className="w-10 h-10 text-orange-500" />,
    faculty: ["Dr Jagadeesh K", "Dr Munesh Singh"],
    description:
      "This area focuses on developing wireless sensor network technologies and robotic systems for various applications.",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    hoverColor: "hover:border-orange-300 hover:bg-orange-100/70",
  },
  {
    id: 5,
    title: "Graph Theory and Data Structures Algorithms",
    icon: <GitBranch className="w-10 h-10 text-rose-500" />,
    faculty: ["Dr N Sadagopan"],
    description:
      "Research in this area involves developing and analyzing algorithms based on graph theory and advanced data structures for solving complex computational problems.",
    color: "bg-rose-50 border-rose-200",
    iconBg: "bg-rose-100",
    hoverColor: "hover:border-rose-300 hover:bg-rose-100/70",
  },
]

const syllabusTopics = [
  {
    subject: "Discrete Mathematics",
    topics: ["Logic", "Sets", "Relations", "Functions"],
  },
  {
    subject: "Data Structures and Algorithms",
    topics: ["Arrays", "Trees", "Heaps", "Searching and Sorting"],
  },
  {
    subject: "Computer Organization",
    topics: [
      "Fixed point and floating point representation",
      "Binary Arithmetic (addition, subtraction, multiplication, division)",
      "Cache memory",
    ],
  },
  {
    subject: "C programming",
    topics: ["Input/Output statements", "Selection (IF/Switch Case) and Repetition Statements (For/While loop)"],
  },
]

export default function ResearchOverview() {
  const [activeTab, setActiveTab] = useState("areas")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = {
    hero: useRef(null),
    areas: useRef(null),
    program: useRef(null),
    syllabus: useRef(null),
    resources: useRef(null),
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.2 },
    )

    Object.values(sectionRefs).forEach((ref) => ref.current && observer.observe(ref.current))

    return () => {
      Object.values(sectionRefs).forEach((ref) => ref.current && observer.unobserve(ref.current))
    }
  }, []) // Removed sectionRefs from dependencies

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="hero" ref={sectionRefs.hero} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0"></div>
        <div className="absolute inset-0 opacity-20 z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Research @ CSE
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Exploring the frontiers of computer science through innovative research and academic excellence
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("areas")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explore Research Areas
              </button>
              <button
                onClick={() => scrollToSection("program")}
                className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                Ph.D Program Details
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-sm z-20 border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => scrollToSection("areas")}
              className={`px-4 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                activeTab === "areas"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Research Areas
            </button>
            <button
              onClick={() => scrollToSection("program")}
              className={`px-4 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                activeTab === "program"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Ph.D Program
            </button>
            <button
              onClick={() => scrollToSection("syllabus")}
              className={`px-4 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                activeTab === "syllabus"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Entrance Syllabus
            </button>
            <button
              onClick={() => scrollToSection("resources")}
              className={`px-4 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                activeTab === "resources"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Resources
            </button>
          </div>
        </div>
      </div>

      {/* Research Areas Section */}
      <section id="areas" ref={sectionRefs.areas} className="py-16 bg-white" onMouseEnter={() => setActiveTab("areas")}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.areas ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Research Areas</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The department offers a research programme leading to Doctor of Philosophy (Ph.D) in the following areas.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={visibleSections.areas ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {researchAreas.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                className={`p-6 rounded-xl border ${area.color} transition-all ${area.hoverColor} hover:shadow-md`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${area.iconBg}`}>{area.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Faculty Associated:</h4>
                      <ul className="space-y-1">
                        {area.faculty.map((name, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PhD Program Section */}
      <section
        id="program"
        ref={sectionRefs.program}
        className="py-16 bg-gray-50"
        onMouseEnter={() => setActiveTab("program")}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.program ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ph.D Program</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our doctoral program is designed to prepare students for research careers in academia and industry.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.program ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Program Structure
                </h3>
                <p className="text-gray-600 mb-4">The Ph.D programme consists of:</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <span className="font-medium">Course Work</span>
                      <p className="text-gray-600">Four courses related to the research area</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <span className="font-medium">Comprehensive Viva (Qualifier)</span>
                      <p className="text-gray-600">Oral examination to assess research readiness</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <span className="font-medium">Research Contribution</span>
                      <p className="text-gray-600">Original research in the specific area of interest</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.program ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Selection Process
                </h3>
                <p className="text-gray-600 mb-4">
                  The department invites applications for full-time Ph.D programme twice a year (January and July
                  Sessions).
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-700 mb-2">Application Process:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Written test for eligible candidates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Interview for shortlisted candidates</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-700 mb-2">Evaluation:</h4>
                  <p className="text-gray-700">
                    If a student opts for the optional subject, then his/her performance will be assessed against 5
                    subjects, otherwise 4 subjects.
                  </p>
                  <p className="text-gray-700 mt-2 italic">Note: One optional subject related to the research area.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section
        id="syllabus"
        ref={sectionRefs.syllabus}
        className="py-16 bg-white"
        onMouseEnter={() => setActiveTab("syllabus")}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.syllabus ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Entrance Examination Syllabus</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The Ph.D entrance examination covers the following subjects and topics.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={visibleSections.syllabus ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {syllabusTopics.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      {item.subject}
                    </h3>
                    <ul className="space-y-2">
                      {item.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.syllabus ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Link href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                View Complete Syllabus for Ph.D Entrance Examination
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section
        id="resources"
        ref={sectionRefs.resources}
        className="py-16 bg-gray-50"
        onMouseEnter={() => setActiveTab("resources")}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.resources ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Resources</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Sample papers and additional resources for Ph.D aspirants.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={visibleSections.resources ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Sample Paper I
                    </h3>
                    <button className="p-2 rounded-full bg-blue-50 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600">
                    Previous year entrance examination paper with questions from all core subjects.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Sample Paper II
                    </h3>
                    <button className="p-2 rounded-full bg-blue-50 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600">Model question paper with solutions and marking scheme.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Research Journey?</h2>
            <p className="text-blue-100 mb-8">
              Join our vibrant research community and contribute to cutting-edge advancements in computer science.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-50 transition-all">
                Apply for Ph.D Program
              </button>
              <button className="px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-white/10 transition-all">
                Contact Research Office
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

