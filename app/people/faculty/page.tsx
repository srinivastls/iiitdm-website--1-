"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  User,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  FileText,
  ChevronRight,
  Linkedin,
  Github,
  Globe,
  BookMarked,
  Cpu,
  Network,
  Database,
  BrainCircuit,
  Lock,
  ImageIcon,
  Wifi,
  Zap,
  Cloud,
  LineChart,
  Eye,
  Fingerprint,
} from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import MainNav from "@/components/MainNav"

// Faculty data
const facultyData = [
  {
    id: 1,
    name: "Dr. Amalan Joseph Antony A",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Cryptography", "Data Structures and Algorithms", "Theory of Computation"],
    email: "amalan@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 101",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2018" },
      { degree: "M.Tech", university: "NIT Trichy", year: "2012" },
      { degree: "B.Tech", university: "Anna University", year: "2010" },
    ],
    publications: 12,
    projects: 4,
    students: 5,
    courses: ["Discrete Mathematics", "Algorithm Design", "Cryptography"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Lock key="lock" className="w-5 h-5" />,
      <FileText key="file" className="w-5 h-5" />,
      <BookMarked key="book" className="w-5 h-5" />,
    ],
  },
  {
    id: 2,
    name: "Dr. Bhukya Krishna Priya",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Computer Architecture",
      "Memory Technologies",
      "Machine Learning",
      "Image Processing",
      "Vehicular Networks",
    ],
    email: "krishnapriya@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 102",
    education: [
      { degree: "Ph.D", university: "IIT Bombay", year: "2017" },
      { degree: "M.Tech", university: "IIT Kharagpur", year: "2011" },
      { degree: "B.Tech", university: "JNTU Hyderabad", year: "2009" },
    ],
    publications: 18,
    projects: 6,
    students: 8,
    courses: ["Computer Architecture", "Digital Systems Design", "Machine Learning"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Cpu key="cpu" className="w-5 h-5" />,
      <Database key="db" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <ImageIcon key="img" className="w-5 h-5" />,
      <Network key="net" className="w-5 h-5" />,
    ],
  },
  {
    id: 3,
    name: "Dr. Jagadeesh Kakarla",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Wireless Sensor Networks", "Adhoc Networks", "Internet of Things", "Medical Image processing"],
    email: "jagadeesh@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 103",
    education: [
      { degree: "Ph.D", university: "IIT Delhi", year: "2016" },
      { degree: "M.Tech", university: "NIT Warangal", year: "2010" },
      { degree: "B.Tech", university: "Andhra University", year: "2008" },
    ],
    publications: 15,
    projects: 5,
    students: 6,
    courses: ["Wireless Networks", "IoT Systems", "Network Security"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Wifi key="wifi" className="w-5 h-5" />,
      <Network key="net" className="w-5 h-5" />,
      <Cpu key="cpu" className="w-5 h-5" />,
      <ImageIcon key="img" className="w-5 h-5" />,
    ],
  },
  {
    id: 4,
    name: "Dr. Jaishree Mayank",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Scheduling Strategies in Real-time/ Cyber Physical Systems",
      "AI Algorithms for Smart Grids and Electric Vehicle Problems/Drones Problems",
    ],
    email: "jaishree@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 104",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2017" },
      { degree: "M.Tech", university: "IIT Roorkee", year: "2011" },
      { degree: "B.Tech", university: "NIT Jaipur", year: "2009" },
    ],
    publications: 14,
    projects: 7,
    students: 4,
    courses: ["Real-time Systems", "AI for Cyber-Physical Systems", "Smart Grid Technologies"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Calendar key="cal" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <Zap key="zap" className="w-5 h-5" />,
    ],
  },
  {
    id: 5,
    name: "Dr. Kannadasan K",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Brain-Computer Interface", "EEG Signal Processing", "Affective Computing", "Machine Learning"],
    email: "kannadasan@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 105",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2018" },
      { degree: "M.Tech", university: "Anna University", year: "2012" },
      { degree: "B.E", university: "Anna University", year: "2010" },
    ],
    publications: 16,
    projects: 5,
    students: 7,
    courses: ["Brain-Computer Interfaces", "Signal Processing", "Machine Learning for Healthcare"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <LineChart key="chart" className="w-5 h-5" />,
      <User key="user" className="w-5 h-5" />,
      <Database key="db" className="w-5 h-5" />,
    ],
  },
  {
    id: 6,
    name: "Dr. Krishnakumar Gnanambikai",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Micro-architecture Security", "Web Security", "Network Security", "Applications of AI in security"],
    email: "krishnakumar@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 106",
    education: [
      { degree: "Ph.D", university: "IISc Bangalore", year: "2016" },
      { degree: "M.Tech", university: "NIT Surathkal", year: "2010" },
      { degree: "B.Tech", university: "Anna University", year: "2008" },
    ],
    publications: 20,
    projects: 8,
    students: 9,
    courses: ["Computer Security", "Network Security", "AI for Cybersecurity"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Cpu key="cpu" className="w-5 h-5" />,
      <Lock key="lock" className="w-5 h-5" />,
      <Network key="net" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
    ],
  },
  {
    id: 7,
    name: "Prof. Masilamani V",
    position: "Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Image Processing & Computer Vision",
      "Machine Learning",
      "Algorithms & Data Structure",
      "Theory of Computing",
    ],
    email: "masilamani@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 107",
    education: [
      { degree: "Ph.D", university: "IIT Delhi", year: "2010" },
      { degree: "M.Tech", university: "IIT Bombay", year: "2004" },
      { degree: "B.Tech", university: "NIT Trichy", year: "2002" },
    ],
    publications: 45,
    projects: 12,
    students: 15,
    courses: ["Computer Vision", "Advanced Algorithms", "Machine Learning"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <ImageIcon key="img" className="w-5 h-5" />,
      <Eye key="eye" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <FileText key="file" className="w-5 h-5" />,
      <BookMarked key="book" className="w-5 h-5" />,
    ],
  },
  {
    id: 8,
    name: "Dr. Noor Mahammad S K",
    position: "Associate Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Software for VLSI Design",
      "Evolvable Hardware",
      "Reconfigurable Computing",
      "Network System Design",
      "Software Defined Radio",
      "High Performance VLSI Architectures for Digital Signal Processing",
      "Packet Processing Architectures and Algorithms",
      "Computer Architecture",
    ],
    email: "noor@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 108",
    education: [
      { degree: "Ph.D", university: "IIT Kharagpur", year: "2009" },
      { degree: "M.Tech", university: "IIT Kharagpur", year: "2003" },
      { degree: "B.Tech", university: "JNTU Hyderabad", year: "2001" },
    ],
    publications: 38,
    projects: 14,
    students: 12,
    courses: ["VLSI Design", "Computer Architecture", "Reconfigurable Computing"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Cpu key="cpu" className="w-5 h-5" />,
      <FileText key="code" className="w-5 h-5" />,
      <Network key="net" className="w-5 h-5" />,
    ],
  },
  {
    id: 9,
    name: "Dr. Pandiri Venkatesh",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Combinatorial Optimization",
      "Reinforcement learning for optimization",
      "Soft computing",
      "Heuristics",
      "Metaheuristics",
      "Swarm Intelligence",
      "Multi-objective Optimization",
    ],
    email: "venkatesh@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 109",
    education: [
      { degree: "Ph.D", university: "IIT Hyderabad", year: "2017" },
      { degree: "M.Tech", university: "NIT Warangal", year: "2011" },
      { degree: "B.Tech", university: "JNTU Kakinada", year: "2009" },
    ],
    publications: 22,
    projects: 6,
    students: 8,
    courses: ["Optimization Techniques", "Reinforcement Learning", "Soft Computing"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <LineChart key="chart" className="w-5 h-5" />,
      <Database key="db" className="w-5 h-5" />,
    ],
  },
  {
    id: 10,
    name: "Dr. Preeth R",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["IoT and Cloud Computing", "Machine Learning", "Computer Vision", "Computer Networks", "Data Science"],
    email: "preeth@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 110",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2018" },
      { degree: "M.Tech", university: "NIT Trichy", year: "2012" },
      { degree: "B.Tech", university: "Anna University", year: "2010" },
    ],
    publications: 17,
    projects: 5,
    students: 6,
    courses: ["Cloud Computing", "IoT Systems", "Computer Vision"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Cloud key="cloud" className="w-5 h-5" />,
      <Wifi key="wifi" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <Eye key="eye" className="w-5 h-5" />,
      <Network key="net" className="w-5 h-5" />,
      <Database key="db" className="w-5 h-5" />,
    ],
  },
  {
    id: 11,
    name: "Dr. Rahul Raman",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Computer Vision",
      "Image Processing",
      "Machine Learning",
      "Biometrics",
      "Visual Surveillance",
      "Aesthetics",
    ],
    email: "rahul@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 111",
    education: [
      { degree: "Ph.D", university: "IIT Kanpur", year: "2017" },
      { degree: "M.Tech", university: "IIT Roorkee", year: "2011" },
      { degree: "B.Tech", university: "NIT Calicut", year: "2009" },
    ],
    publications: 19,
    projects: 7,
    students: 5,
    courses: ["Computer Vision", "Image Processing", "Biometric Systems"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Eye key="eye" className="w-5 h-5" />,
      <ImageIcon key="img" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <Fingerprint key="finger" className="w-5 h-5" />,
    ],
  },
  {
    id: 12,
    name: "Dr. Sadagopan N",
    position: "Associate Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Graph theory & Combinatorics",
      "Data Structures & Algorithms",
      "Computer Networks",
      "Database Systems",
      "Graph Library Generation Package",
    ],
    email: "sadagopan@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 112",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2005" },
      { degree: "M.Tech", university: "IIT Bombay", year: "1999" },
      { degree: "B.Tech", university: "Bharathidasan University", year: "1997" },
    ],
    publications: 42,
    projects: 15,
    students: 18,
    courses: ["Graph Theory", "Advanced Algorithms", "Database Systems"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Network key="net" className="w-5 h-5" />,
      <FileText key="file" className="w-5 h-5" />,
      <Database key="db" className="w-5 h-5" />,
    ],
  },
  {
    id: 13,
    name: "Dr. Sanjeet Kumar Nayak",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "IoT and Cloud Computing",
      "Applied Cryptography",
      "Fog and Edge Computing",
      "Unmanned Aerial Vehicle (UAV)",
      "Blockchain Technology",
    ],
    email: "sanjeet@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 113",
    education: [
      { degree: "Ph.D", university: "IIT Kharagpur", year: "2018" },
      { degree: "M.Tech", university: "NIT Rourkela", year: "2012" },
      { degree: "B.Tech", university: "BPUT Odisha", year: "2010" },
    ],
    publications: 16,
    projects: 6,
    students: 7,
    courses: ["Cloud Computing", "Cryptography", "Blockchain Technology"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Cloud key="cloud" className="w-5 h-5" />,
      <Lock key="lock" className="w-5 h-5" />,
      <Wifi key="wifi" className="w-5 h-5" />,
    ],
  },
  {
    id: 14,
    name: "Dr. Santhanam Raghavan",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Cloud Computing", "Membrane Computing", "Machine Learning"],
    email: "santhanam@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 114",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2016" },
      { degree: "M.Tech", university: "Anna University", year: "2010" },
      { degree: "B.E", university: "Anna University", year: "2008" },
    ],
    publications: 14,
    projects: 4,
    students: 5,
    courses: ["Cloud Computing", "Distributed Systems", "Machine Learning"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Cloud key="cloud" className="w-5 h-5" />,
      <Database key="db" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
    ],
  },
  {
    id: 15,
    name: "Prof. Sivaselvan B",
    position: "Professor and HOD",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Knowledge & Data Engineering",
      "Data Analytics",
      "Human Computer Interaction",
      "Evolutionary Computation Strategies",
    ],
    email: "sivaselvan@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 115",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2008" },
      { degree: "M.Tech", university: "IIT Delhi", year: "2002" },
      { degree: "B.Tech", university: "Madras University", year: "2000" },
    ],
    publications: 55,
    projects: 18,
    students: 22,
    courses: ["Data Engineering", "Human-Computer Interaction", "Evolutionary Computing"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Database key="db" className="w-5 h-5" />,
      <LineChart key="chart" className="w-5 h-5" />,
      <User key="user" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
    ],
  },
  {
    id: 16,
    name: "Dr. Vijayakumar S",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Artificial Intelligence", "Machine Learning", "Natural Language Processing"],
    email: "vijayakumar@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 116",
    education: [
      { degree: "Ph.D", university: "IIT Madras", year: "2017" },
      { degree: "M.Tech", university: "NIT Trichy", year: "2011" },
      { degree: "B.Tech", university: "Anna University", year: "2009" },
    ],
    publications: 18,
    projects: 6,
    students: 8,
    courses: ["Artificial Intelligence", "Natural Language Processing", "Deep Learning"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [<BrainCircuit key="brain" className="w-5 h-5" />, <Database key="db" className="w-5 h-5" />],
  },
  {
    id: 17,
    name: "Dr. Umarani Jayaraman",
    position: "Assistant Professor",
    image: "/placeholder.svg?height=300&width=300",
    interests: [
      "Biometrics",
      "Pattern Recognition",
      "Deep Learning",
      "Digital Image Processing",
      "Human Computer Interaction",
    ],
    email: "umarani@iiitdm.ac.in",
    phone: "+91-XXXXXXXXXX",
    office: "Faculty Block, Room 117",
    education: [
      { degree: "Ph.D", university: "IIT Delhi", year: "2015" },
      { degree: "M.Tech", university: "IIT Kanpur", year: "2009" },
      { degree: "B.Tech", university: "Anna University", year: "2007" },
    ],
    publications: 24,
    projects: 9,
    students: 11,
    courses: ["Biometric Systems", "Pattern Recognition", "Image Processing"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/",
      github: "https://github.com/",
      website: "https://example.com/",
    },
    interestIcons: [
      <Fingerprint key="finger" className="w-5 h-5" />,
      <BrainCircuit key="brain" className="w-5 h-5" />,
      <ImageIcon key="img" className="w-5 h-5" />,
      <User key="user" className="w-5 h-5" />,
    ],
  },
]

// Research areas for filtering
const researchAreas = [
  { name: "All Areas", value: "all" },
  { name: "Machine Learning & AI", value: "Machine Learning", icon: <BrainCircuit className="w-4 h-4" /> },
  { name: "Computer Vision & Image Processing", value: "Image Processing", icon: <Eye className="w-4 h-4" /> },
  { name: "Networks & IoT", value: "Networks", icon: <Network className="w-4 h-4" /> },
  { name: "Security & Cryptography", value: "Security", icon: <Lock className="w-4 h-4" /> },
  { name: "Data Science & Analytics", value: "Data", icon: <Database className="w-4 h-4" /> },
  { name: "Computer Architecture", value: "Computer Architecture", icon: <Cpu className="w-4 h-4" /> },
  { name: "Algorithms & Theory", value: "Algorithms", icon: <FileText className="w-4 h-4" /> },
  { name: "Human-Computer Interaction", value: "Human Computer Interaction", icon: <User className="w-4 h-4" /> },
  { name: "Cloud Computing", value: "Cloud Computing", icon: <Cloud className="w-4 h-4" /> },
]

// Faculty positions for filtering
const positions = [
  { name: "All Positions", value: "all" },
  { name: "Professor", value: "Professor" },
  { name: "Associate Professor", value: "Associate Professor" },
  { name: "Assistant Professor", value: "Assistant Professor" },
]

export default function FacultyPage() {
  // State for filters and search
  const [selectedResearchArea, setSelectedResearchArea] = useState("all")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [activeTab, setActiveTab] = useState("grid")
  const [hoveredFaculty, setHoveredFaculty] = useState(null)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 })

  // Filter faculty based on selected filters and search query
  const filteredFaculty = facultyData.filter((faculty) => {
    // Filter by research area
    if (selectedResearchArea !== "all") {
      const matchesResearchArea = faculty.interests.some(
        (interest) =>
          interest.toLowerCase().includes(selectedResearchArea.toLowerCase()) ||
          selectedResearchArea.toLowerCase().includes(interest.toLowerCase()),
      )
      if (!matchesResearchArea) return false
    }

    // Filter by position
    if (selectedPosition !== "all" && !faculty.position.includes(selectedPosition)) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        faculty.name.toLowerCase().includes(query) ||
        faculty.position.toLowerCase().includes(query) ||
        faculty.interests.some((interest) => interest.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Stats for faculty
  const stats = {
    total: facultyData.length,
    professors: facultyData.filter(
      (f) => f.position.includes("Professor") && !f.position.includes("Associate") && !f.position.includes("Assistant"),
    ).length,
    associateProfessors: facultyData.filter((f) => f.position.includes("Associate")).length,
    assistantProfessors: facultyData.filter((f) => f.position.includes("Assistant")).length,
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Function to get random color gradient for faculty cards
  const getRandomGradient = (id) => {
    const gradients = [
      "from-blue-500 to-blue-600",
      "from-indigo-500 to-indigo-600",
      "from-purple-500 to-purple-600",
      "from-cyan-500 to-cyan-600",
      "from-teal-500 to-teal-600",
      "from-green-500 to-green-600",
      "from-amber-500 to-amber-600",
      "from-rose-500 to-rose-600",
    ]
    return gradients[id % gradients.length]
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

      <main className="pt-20">
        <NewsTicker />

        {/* Hero Section */}
        <section ref={heroRef} className="relative py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Our Faculty
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Meet our distinguished faculty members who are leading experts in their fields, dedicated to excellence in teaching, research, and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Faculty Stats Section */}
        <section className="py-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-4"
              >
                <h3 className="text-4xl font-bold mb-2">{stats.total}</h3>
                <p className="text-blue-100">Total Faculty</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-4"
              >
                <h3 className="text-4xl font-bold mb-2">{stats.professors}</h3>
                <p className="text-blue-100">Professors</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-4"
              >
                <h3 className="text-4xl font-bold mb-2">{stats.associateProfessors}</h3>
                <p className="text-blue-100">Associate Professors</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center p-4"
              >
                <h3 className="text-4xl font-bold mb-2">{stats.assistantProfessors}</h3>
                <p className="text-blue-100">Assistant Professors</p>
              </motion.div>
            </div>
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
                          placeholder="Search by name, position, or research interest..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Research Area Filter */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Research Area</label>
                      <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedResearchArea}
                        onChange={(e) => setSelectedResearchArea(e.target.value)}
                      >
                        {researchAreas.map((area) => (
                          <option key={area.value} value={area.value}>
                            {area.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Position Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                      >
                        {positions.map((position) => (
                          <option key={position.value} value={position.value}>
                            {position.name}
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
                          setSelectedResearchArea("all");
                          setSelectedPosition("all");
                          setSearchQuery("");
                        }}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* View Toggle */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-900 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-600" />
                  Faculty Members
                  <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {filteredFaculty.length} members
                  </span>
                </h2>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Faculty Grid/List */}
              <AnimatePresence mode="wait">
                {activeTab === "grid" ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredFaculty.length > 0 ? (
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {filteredFaculty.map((faculty, index) => (
                          <motion.div
                            key={faculty.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            onHoverStart={() => setHoveredFaculty(faculty.id)}
                            onHoverEnd={() => setHoveredFaculty(null)}
                            className="h-full"
                          >
                            <Card
                              className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                              onClick={() => setSelectedFaculty(faculty)}
                            >
                              <div className="relative">
                                <div className={`h-3 bg-gradient-to-r ${getRandomGradient(faculty.id)}`}></div>
                                <div className="p-6 pb-0 flex justify-center">
                                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <Image
                                      src={faculty.image || "/placeholder.svg"}
                                      alt={faculty.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                              <CardHeader className="text-center pt-4 pb-2">
                                <CardTitle className="text-xl text-blue-900">{faculty.name}</CardTitle>
                                <CardDescription className="text-blue-600 font-medium">
                                  {faculty.position}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="px-6 pb-4">
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">Research Interests</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {faculty.interests.slice(0, 3).map((interest, idx) => (
                                      <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        {interest}
                                      </Badge>
                                    ))}
                                    {faculty.interests.length > 3 && (
                                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                        +{faculty.interests.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <div className="flex space-x-3">
                                    {faculty.socialLinks.linkedin && (
                                      <Link href={faculty.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                          <Linkedin className="h-4 w-4" />
                                        </Button>
                                      </Link>
                                    )}
                                    {faculty.socialLinks.github && (
                                      <Link href={faculty.socialLinks.github} target="_blank" rel="noopener noreferrer">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                          <Github className="h-4 w-4" />
                                        </Button>
                                      </Link>
                                    )}
                                    {faculty.socialLinks.website && (
                                      <Link href={faculty.socialLinks.website} target="_blank" rel="noopener noreferrer">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                                          <Globe className="h-4 w-4" />
                                        </Button>
                                      </Link>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 flex items-center"
                                  >
                                    View Profile
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                              <AnimatePresence>
                                {hoveredFaculty === faculty.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6"
                                  >
                                    <h3 className="text-xl font-bold text-white mb-1">{faculty.name}</h3>
                                    <p className="text-white/90 mb-3">{faculty.position}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {faculty.interestIcons.slice(0, 4).map((icon, idx) => (
                                        <div key={idx} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                          {icon}
                                        </div>
                                      ))}
                                    </div>
                                    <Button className="bg-white text-blue-600 hover:bg-blue-50">
                                      View Full Profile
                                    </Button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <Card className="bg-gray-50 border border-dashed border-gray-300">
                        <CardContent className="p-12 text-center">
                          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-medium text-gray-900 mb-2">No faculty members found</h3>
                          <p className="text-gray-500 mb-6">
                            No faculty members match your current filters. Try adjusting your search criteria.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedResearchArea("all");
                              setSelectedPosition("all");
                              setSearchQuery("");
                            }}
                          >
                            Reset Filters
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredFaculty.length > 0 ? (
                      <motion.div
                        className="space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {filteredFaculty.map((faculty) => (
                          <motion.div
                            key={faculty.id}
                            variants={itemVariants}
                            whileHover={{ x: 5 }}
                            className="h-full"
                          >
                            <Card
                              className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer border-l-4"
                              style={{ borderLeftColor: `rgb(${59 + (faculty.id * 10) % 100}, ${130 - (faculty.id * 5) % 50}, ${246 - (faculty.id * 7) % 50})` }}
                              onClick={() => setSelectedFaculty(faculty)}
                            >
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  <div className="md:w-1/4 p-6 flex flex-col md:flex-row items-center">
                                    <div className="w-24 h-24 md:w-16 md:h-16 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-4">
                                      <Image
                                        src={faculty.image || "/placeholder.svg"}
                                        alt={faculty.name}
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="text-center md:text-left">
                                      <h3 className="font-bold text-blue-900">{faculty.name}</h3>
                                      <p className="text-sm text-blue-600">{faculty.position}</p>
                                    </div>
                                  </div>
                                  <div className="md:w-2/4 p-6 border-t md:border-t-0 md:border-l border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Research Interests</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {faculty.interests.map((interest, idx) => (
                                        <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                          {interest}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="md:w-1/4 p-6 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center mb-2">
                                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-600">{faculty.email}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-600">{faculty.office}</span>
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                      <div className="flex space-x-2">
                                        {faculty.socialLinks.linkedin && (
                                          <Link href={faculty.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                              <Linkedin className="h-4 w-4" />
                                            </Button>
                                          </Link>
                                        )}
                                        {faculty.socialLinks.github && (
                                          <Link href={faculty.socialLinks.github} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                              <Github className="h-4 w-4" />
                                            </Button>
                                          </Link>
                                        )}
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      >
                                        Profile
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <Card className="bg-gray-50 border border-dashed border-gray-300">
                        <CardContent className="p-12 text-center">
                          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-medium text-gray-900 mb-2">No faculty members found</h3>
                          <p className="text-gray-500 mb-6">
                            No faculty members match your current filters. Try adjusting your search criteria.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedResearchArea("all");
                              setSelectedPosition("all");
                              setSearchQuery("");
                            }}
                          >
                            Reset Filters
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Research Areas Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  Research Areas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {researchAreas.filter(area => area.value !== "all").map((area, index) => {
                    const facultyInArea = facultyData.filter(faculty =>
                      faculty.interests.some(interest =>
                        interest.toLowerCase().includes(area.value.toLowerCase()) ||
                        area.value.toLowerCase().includes(interest.toLowerCase())
                      )
                    );

                    return (
                      <motion.div
                        key={area.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={contentInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300">
                          <CardHeader className={`pb-3 bg-gradient-to-r ${getRandomGradient(index)} text-white`}>
                            <div className="flex items-center">
                              {area.icon}
                              <CardTitle className="text-lg ml-2">{area.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="p-5">
                            <p className="text-gray-600 mb-4">
                              {facultyInArea.length} faculty members specializing in this area
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {facultyInArea.slice(0, 3).map((faculty, idx) => (
                                <div key={idx} className="flex items-center">
                                  <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                                    <Image
                                      src={faculty.image || "/placeholder.svg"}
                                      alt={faculty.name}
                                      width={24}
                                      height={24}
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-sm text-gray-700">{faculty.name.split(' ').slice(-1)[0]}</span>
                                </div>
                              ))}
                              {facultyInArea.length > 3 && (
                                <span className="text-sm text-gray-500">+{facultyInArea.length - 3} more</span>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedResearchArea(area.value);
                                setSelectedPosition("all");
                                setSearchQuery("");
                              }}
                            >
                              View Faculty in this Area
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <Card className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold mb-2">Interested in joining our faculty?</h3>
                      <p className="text-blue-100 max-w-xl">
                        We're always looking for talented researchers and educators to join our team. Check out our current openings or contact us to learn more.
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        Current Openings
                      </Button>
                      <Button variant="outline" className="border-white text-white hover:bg-white/10">
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Faculty Detail Dialog */}
        <Dialog open={!!selectedFaculty} onOpenChange={() => setSelectedFaculty(null)}>
          <DialogContent className="max-w-4xl">
            {selectedFaculty && (
              <>
                <DialogHeader className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <Image
                      src={selectedFaculty.image || "/placeholder.svg"}
                      alt={selectedFaculty.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedFaculty.name}</DialogTitle>
                    <DialogDescription className="text-blue-600 font-medium">
                      {selectedFaculty.position}
                    </DialogDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-1" />
                        {selectedFaculty.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedFaculty.office}
                      </div>
                    </div>
                    <div className="flex mt-3 space-x-2">
                      {selectedFaculty.socialLinks.linkedin && (
                        <Link href={selectedFaculty.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {selectedFaculty.socialLinks.github && (
                        <Link href={selectedFaculty.socialLinks.github} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            <Github className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {selectedFaculty.socialLinks.website && (
                        <Link href={selectedFaculty.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            <Globe className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Research Interests</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedFaculty.interests.map((interest, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Education</h3>
                    <div className="space-y-2 mb-6">
                      {selectedFaculty.education.map((edu, idx) => (
                        <div key={idx} className="flex items-start">
                          <Award className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.university}, {edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Courses Taught</h3>
                    <div className="space-y-2">
                      {selectedFaculty.courses.map((course, idx) => (
                        <div key={idx} className="flex items-center">
                          <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                          <p className="text-gray-700">{course}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Academic Metrics</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Card className="bg-blue-50 border-none">
                        <CardContent className="p-4 text-center">
                          <p className="text-3xl font-bold text-blue-700">{selectedFaculty.publications}</p>
                          <p className="text-sm text-blue-600">Publications</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-indigo-50 border-none">
                        <CardContent className="p-4 text-center">
                          <p className="text-3xl font-bold text-indigo-700">{selectedFaculty.projects}</p>
                          <p className="text-sm text-indigo-600">Projects</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-purple-50 border-none">
                        <CardContent className="p-4 text-center">
                          <p className="text-3xl font-bold text-purple-700">{selectedFaculty.students}</p>
                          <p className="text-sm text-purple-600">Students</p>
                        </CardContent>
                      </Card>
                    </div>

                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Contact Information</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <p className="text-gray-700">{selectedFaculty.email}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <p className="text-gray-700">{selectedFaculty.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <p className="text-gray-700">{selectedFaculty.office}</p>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact {selectedFaculty.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
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
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-white hover:bg-white/10">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-white hover:bg-white/10">
                  <Github className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-white hover:bg-white/10">
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
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

