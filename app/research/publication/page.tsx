"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  ExternalLink,
  Filter,
  Search,
  Users,
  Award,
  BookText,
  FileText,
  Globe,
  BookMarked,
} from "lucide-react"
import Image from "next/image"
import MainNav from "@/components/MainNav"
import Link from "next/link"

// Dummy data for faculty members and their publications
const facultyData = [
  {
    id: 1,
    name: "Prof. Sivaselvan B",
    title: "Professor",
    area: "Knowledge Engineering and Data Mining",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "A Novel Approach to Knowledge Graph Embedding for Recommendation Systems",
        authors: "Sivaselvan B, Kumar A, Patel S",
        venue: "IEEE Transactions on Knowledge and Data Engineering",
        year: 2023,
        type: "journal",
        doi: "10.1109/TKDE.2023.1234567",
        citations: 12,
        abstract:
          "This paper proposes a novel approach to knowledge graph embedding that enhances recommendation systems by incorporating semantic relationships between entities.",
        keywords: ["Knowledge Graphs", "Recommendation Systems", "Data Mining"],
      },
      {
        id: 2,
        title: "Efficient Data Mining Techniques for Large-Scale Knowledge Graphs",
        authors: "Sivaselvan B, Reddy P, Sharma V",
        venue: "International Conference on Data Engineering (ICDE)",
        year: 2022,
        type: "conference",
        doi: "10.1109/ICDE.2022.7654321",
        citations: 8,
        abstract:
          "We present efficient data mining techniques specifically designed for large-scale knowledge graphs, demonstrating significant performance improvements over existing methods.",
        keywords: ["Data Mining", "Knowledge Graphs", "Big Data"],
      },
      {
        id: 3,
        title: "Knowledge Engineering for Smart Healthcare Systems",
        authors: "Sivaselvan B, Gupta R, Mehta N",
        venue: "Journal of Biomedical Informatics",
        year: 2021,
        type: "journal",
        doi: "10.1016/j.jbi.2021.103456",
        citations: 15,
        abstract:
          "This paper explores the application of knowledge engineering techniques in developing smart healthcare systems, with a focus on personalized medicine.",
        keywords: ["Knowledge Engineering", "Healthcare", "Smart Systems"],
      },
      {
        id: 4,
        title: "Ontology-Based Data Integration for Heterogeneous Data Sources",
        authors: "Sivaselvan B, Krishnan L",
        venue: "ACM Transactions on Database Systems",
        year: 2020,
        type: "journal",
        doi: "10.1145/3345678.9876543",
        citations: 22,
        abstract:
          "We propose an ontology-based approach for integrating heterogeneous data sources, addressing challenges in schema mapping and entity resolution.",
        keywords: ["Ontology", "Data Integration", "Heterogeneous Data"],
      },
      {
        id: 5,
        title: "Mining Temporal Patterns in Dynamic Knowledge Graphs",
        authors: "Sivaselvan B, Jain A, Patel S",
        venue: "International Conference on Machine Learning (ICML)",
        year: 2019,
        type: "conference",
        doi: "10.5555/3454321.1234567",
        citations: 18,
        abstract:
          "This paper introduces novel techniques for mining temporal patterns in dynamic knowledge graphs, enabling better prediction of future events and relationships.",
        keywords: ["Temporal Patterns", "Dynamic Knowledge Graphs", "Pattern Mining"],
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Noor Mahammad",
    title: "Associate Professor",
    area: "High Performance Architectures, VLSI Design, High Speed Networks",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Energy-Efficient VLSI Design for Edge Computing Devices",
        authors: "Mahammad N, Singh R, Kumar P",
        venue: "IEEE Transactions on Very Large Scale Integration (VLSI) Systems",
        year: 2023,
        type: "journal",
        doi: "10.1109/TVLSI.2023.9876543",
        citations: 7,
        abstract:
          "This paper presents novel energy-efficient VLSI design techniques for edge computing devices, reducing power consumption while maintaining performance.",
        keywords: ["VLSI Design", "Edge Computing", "Energy Efficiency"],
      },
      {
        id: 2,
        title: "High-Speed Network Architecture for Data Center Applications",
        authors: "Mahammad N, Gupta A, Reddy K",
        venue: "IEEE/ACM Transactions on Networking",
        year: 2022,
        type: "journal",
        doi: "10.1109/TNET.2022.1234567",
        citations: 11,
        abstract:
          "We propose a novel high-speed network architecture specifically designed for modern data center applications, addressing challenges in latency and throughput.",
        keywords: ["Network Architecture", "Data Centers", "High-Speed Networks"],
      },
      {
        id: 3,
        title: "Reconfigurable Computing for AI Acceleration",
        authors: "Mahammad N, Patel J, Sharma S",
        venue: "International Symposium on Computer Architecture (ISCA)",
        year: 2021,
        type: "conference",
        doi: "10.1145/3456789.1234567",
        citations: 14,
        abstract:
          "This paper explores the use of reconfigurable computing architectures for accelerating AI workloads, demonstrating significant performance improvements.",
        keywords: ["Reconfigurable Computing", "AI Acceleration", "Computer Architecture"],
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Bhukya Krishna Priya",
    title: "Assistant Professor",
    area: "Machine Learning, Computer Vision",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Deep Learning Approaches for Medical Image Segmentation",
        authors: "Krishna Priya B, Reddy S, Kumar A",
        venue: "IEEE Transactions on Medical Imaging",
        year: 2023,
        type: "journal",
        doi: "10.1109/TMI.2023.1234567",
        citations: 9,
        abstract:
          "This paper presents novel deep learning approaches for medical image segmentation, with applications in diagnostic radiology and surgical planning.",
        keywords: ["Deep Learning", "Medical Imaging", "Image Segmentation"],
      },
      {
        id: 2,
        title: "Attention Mechanisms for Visual Question Answering",
        authors: "Krishna Priya B, Singh M, Patel R",
        venue: "Conference on Computer Vision and Pattern Recognition (CVPR)",
        year: 2022,
        type: "conference",
        doi: "10.1109/CVPR.2022.9876543",
        citations: 13,
        abstract:
          "We propose novel attention mechanisms for visual question answering tasks, improving performance on benchmark datasets.",
        keywords: ["Attention Mechanisms", "Visual Question Answering", "Computer Vision"],
      },
    ],
  },
  {
    id: 4,
    name: "Dr. Jagadeesh Kakarla",
    title: "Associate Professor",
    area: "Wireless Sensor Networks, Robotics",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Energy-Efficient Routing Protocols for Wireless Sensor Networks",
        authors: "Kakarla J, Reddy P, Kumar S",
        venue: "IEEE Transactions on Wireless Communications",
        year: 2023,
        type: "journal",
        doi: "10.1109/TWC.2023.1234567",
        citations: 8,
        abstract:
          "This paper proposes energy-efficient routing protocols for wireless sensor networks, extending network lifetime while maintaining connectivity.",
        keywords: ["Wireless Sensor Networks", "Routing Protocols", "Energy Efficiency"],
      },
      {
        id: 2,
        title: "Collaborative Robotics for Smart Manufacturing",
        authors: "Kakarla J, Singh A, Mehta R",
        venue: "IEEE International Conference on Robotics and Automation (ICRA)",
        year: 2022,
        type: "conference",
        doi: "10.1109/ICRA.2022.9876543",
        citations: 10,
        abstract:
          "We present a framework for collaborative robotics in smart manufacturing environments, enabling safe human-robot interaction and improved productivity.",
        keywords: ["Collaborative Robotics", "Smart Manufacturing", "Human-Robot Interaction"],
      },
    ],
  },
  {
    id: 5,
    name: "Dr. Jaishree Mayank",
    title: "Assistant Professor",
    area: "Artificial Intelligence, Natural Language Processing",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Transformer-Based Models for Low-Resource Languages",
        authors: "Mayank J, Patel S, Kumar A",
        venue: "Association for Computational Linguistics (ACL)",
        year: 2023,
        type: "conference",
        doi: "10.18653/v1/2023.acl-long.123",
        citations: 6,
        abstract:
          "This paper presents transformer-based models specifically designed for low-resource languages, addressing challenges in limited training data.",
        keywords: ["Transformers", "Low-Resource Languages", "NLP"],
      },
      {
        id: 2,
        title: "Multi-Modal Learning for Sentiment Analysis",
        authors: "Mayank J, Reddy K, Sharma P",
        venue: "Conference on Empirical Methods in Natural Language Processing (EMNLP)",
        year: 2022,
        type: "conference",
        doi: "10.18653/v1/2022.emnlp-main.456",
        citations: 9,
        abstract:
          "We propose a multi-modal learning approach for sentiment analysis that combines textual, visual, and acoustic features.",
        keywords: ["Multi-Modal Learning", "Sentiment Analysis", "NLP"],
      },
    ],
  },
  {
    id: 6,
    name: "Prof. Masilamani V",
    title: "Professor",
    area: "Image Processing, Biometrics, Pattern Recognition",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Robust Biometric Authentication Using Multimodal Fusion",
        authors: "Masilamani V, Kumar S, Reddy P",
        venue: "IEEE Transactions on Information Forensics and Security",
        year: 2023,
        type: "journal",
        doi: "10.1109/TIFS.2023.1234567",
        citations: 11,
        abstract:
          "This paper presents a robust biometric authentication system using multimodal fusion of fingerprint, face, and iris recognition.",
        keywords: ["Biometric Authentication", "Multimodal Fusion", "Security"],
      },
      {
        id: 2,
        title: "Advanced Image Processing Techniques for Medical Diagnosis",
        authors: "Masilamani V, Singh A, Patel R",
        venue: "IEEE Transactions on Medical Imaging",
        year: 2022,
        type: "journal",
        doi: "10.1109/TMI.2022.9876543",
        citations: 15,
        abstract:
          "We propose advanced image processing techniques for medical diagnosis, with applications in early detection of diseases.",
        keywords: ["Image Processing", "Medical Diagnosis", "Computer-Aided Detection"],
      },
    ],
  },
  {
    id: 7,
    name: "Dr. Pandiri Venkatesh",
    title: "Assistant Professor",
    area: "Cybersecurity, Network Security",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Blockchain-Based Framework for Secure IoT Data Sharing",
        authors: "Venkatesh P, Kumar A, Reddy S",
        venue: "IEEE Internet of Things Journal",
        year: 2023,
        type: "journal",
        doi: "10.1109/JIOT.2023.1234567",
        citations: 8,
        abstract:
          "This paper proposes a blockchain-based framework for secure IoT data sharing, addressing challenges in privacy and access control.",
        keywords: ["Blockchain", "IoT", "Data Security"],
      },
      {
        id: 2,
        title: "Intrusion Detection Systems for Industrial Control Networks",
        authors: "Venkatesh P, Singh M, Mehta R",
        venue: "IEEE Symposium on Security and Privacy",
        year: 2022,
        type: "conference",
        doi: "10.1109/SP.2022.9876543",
        citations: 12,
        abstract:
          "We present novel intrusion detection systems specifically designed for industrial control networks, with a focus on detecting sophisticated attacks.",
        keywords: ["Intrusion Detection", "Industrial Control Systems", "Cybersecurity"],
      },
    ],
  },
  {
    id: 8,
    name: "Dr. Preeth R",
    title: "Associate Professor",
    area: "Cloud Computing, Distributed Systems",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Resource Allocation Strategies for Multi-Cloud Environments",
        authors: "Preeth R, Kumar S, Patel A",
        venue: "IEEE Transactions on Cloud Computing",
        year: 2023,
        type: "journal",
        doi: "10.1109/TCC.2023.1234567",
        citations: 9,
        abstract:
          "This paper presents resource allocation strategies for multi-cloud environments, optimizing cost and performance.",
        keywords: ["Cloud Computing", "Resource Allocation", "Multi-Cloud"],
      },
      {
        id: 2,
        title: "Fault-Tolerant Distributed Computing for Big Data Applications",
        authors: "Preeth R, Reddy K, Singh V",
        venue: "International Conference on Distributed Computing Systems (ICDCS)",
        year: 2022,
        type: "conference",
        doi: "10.1109/ICDCS.2022.9876543",
        citations: 11,
        abstract:
          "We propose fault-tolerant distributed computing techniques for big data applications, ensuring reliability in the presence of node failures.",
        keywords: ["Distributed Computing", "Fault Tolerance", "Big Data"],
      },
    ],
  },
  {
    id: 9,
    name: "Dr. Rahul Raman",
    title: "Assistant Professor",
    area: "Human-Computer Interaction, User Experience",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Designing Accessible User Interfaces for Diverse User Groups",
        authors: "Raman R, Kumar A, Patel S",
        venue: "ACM Transactions on Computer-Human Interaction",
        year: 2023,
        type: "journal",
        doi: "10.1145/3567890.1234567",
        citations: 7,
        abstract:
          "This paper presents guidelines for designing accessible user interfaces that cater to diverse user groups, including those with disabilities.",
        keywords: ["Accessibility", "User Interface Design", "HCI"],
      },
      {
        id: 2,
        title: "Evaluating User Experience in Mixed Reality Applications",
        authors: "Raman R, Singh M, Reddy P",
        venue: "ACM Conference on Human Factors in Computing Systems (CHI)",
        year: 2022,
        type: "conference",
        doi: "10.1145/3456789.9876543",
        citations: 10,
        abstract:
          "We propose a framework for evaluating user experience in mixed reality applications, with metrics for usability, immersion, and engagement.",
        keywords: ["User Experience", "Mixed Reality", "Evaluation"],
      },
    ],
  },
  {
    id: 10,
    name: "Dr. Ram Prasad Padhy",
    title: "Associate Professor",
    area: "Database Systems, Big Data Analytics",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Query Optimization Techniques for Heterogeneous Data Sources",
        authors: "Padhy RP, Kumar S, Reddy A",
        venue: "ACM Transactions on Database Systems",
        year: 2023,
        type: "journal",
        doi: "10.1145/3567890.9876543",
        citations: 8,
        abstract:
          "This paper presents query optimization techniques for heterogeneous data sources, improving performance in federated database systems.",
        keywords: ["Query Optimization", "Heterogeneous Data", "Database Systems"],
      },
      {
        id: 2,
        title: "Real-Time Analytics for Streaming Big Data",
        authors: "Padhy RP, Singh V, Patel R",
        venue: "International Conference on Very Large Data Bases (VLDB)",
        year: 2022,
        type: "conference",
        doi: "10.14778/3456789.1234567",
        citations: 12,
        abstract:
          "We propose techniques for real-time analytics on streaming big data, enabling timely insights and decision-making.",
        keywords: ["Real-Time Analytics", "Streaming Data", "Big Data"],
      },
    ],
  },
  {
    id: 11,
    name: "Dr. Sadagopan N",
    title: "Professor",
    area: "Graph Theory, Data Structures, Algorithms",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Efficient Algorithms for Spanning Tree Problems",
        authors: "Sadagopan N, Kumar A, Reddy P",
        venue: "Journal of Graph Theory",
        year: 2023,
        type: "journal",
        doi: "10.1002/jgt.22345",
        citations: 9,
        abstract:
          "This paper presents efficient algorithms for various spanning tree problems, with applications in network design and optimization.",
        keywords: ["Graph Theory", "Spanning Trees", "Algorithms"],
      },
      {
        id: 2,
        title: "Vertex Separator Algorithms for Large-Scale Graphs",
        authors: "Sadagopan N, Singh M, Patel S",
        venue: "ACM-SIAM Symposium on Discrete Algorithms (SODA)",
        year: 2022,
        type: "conference",
        doi: "10.1137/1.9781611977073.123",
        citations: 11,
        abstract:
          "We propose efficient vertex separator algorithms for large-scale graphs, with applications in parallel computing and graph partitioning.",
        keywords: ["Vertex Separators", "Graph Algorithms", "Graph Partitioning"],
      },
    ],
  },
  {
    id: 12,
    name: "Dr. Sanjeet Kumar Nayak",
    title: "Assistant Professor",
    area: "Computer Networks, Internet of Things",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Software-Defined Networking for IoT Environments",
        authors: "Nayak SK, Kumar A, Reddy P",
        venue: "IEEE Transactions on Network and Service Management",
        year: 2023,
        type: "journal",
        doi: "10.1109/TNSM.2023.1234567",
        citations: 7,
        abstract:
          "This paper presents a software-defined networking approach for IoT environments, addressing challenges in scalability and management.",
        keywords: ["Software-Defined Networking", "IoT", "Network Management"],
      },
      {
        id: 2,
        title: "Energy-Efficient Communication Protocols for IoT Devices",
        authors: "Nayak SK, Singh V, Patel R",
        venue: "IEEE Internet of Things Journal",
        year: 2022,
        type: "journal",
        doi: "10.1109/JIOT.2022.9876543",
        citations: 10,
        abstract:
          "We propose energy-efficient communication protocols for IoT devices, extending battery life while maintaining connectivity.",
        keywords: ["IoT", "Energy Efficiency", "Communication Protocols"],
      },
    ],
  },
  {
    id: 13,
    name: "Dr. Santhanam Raghavan",
    title: "Associate Professor",
    area: "Artificial Intelligence, Machine Learning",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Reinforcement Learning for Autonomous Driving",
        authors: "Raghavan S, Kumar A, Reddy P",
        venue: "IEEE Transactions on Intelligent Transportation Systems",
        year: 2023,
        type: "journal",
        doi: "10.1109/TITS.2023.1234567",
        citations: 8,
        abstract:
          "This paper presents reinforcement learning approaches for autonomous driving, addressing challenges in decision-making and safety.",
        keywords: ["Reinforcement Learning", "Autonomous Driving", "Intelligent Transportation"],
      },
      {
        id: 2,
        title: "Federated Learning for Privacy-Preserving AI",
        authors: "Raghavan S, Singh M, Patel S",
        venue: "International Conference on Machine Learning (ICML)",
        year: 2022,
        type: "conference",
        doi: "10.5555/3456789.1234567",
        citations: 12,
        abstract:
          "We propose federated learning techniques for privacy-preserving AI, enabling collaborative model training without sharing raw data.",
        keywords: ["Federated Learning", "Privacy-Preserving AI", "Distributed Machine Learning"],
      },
    ],
  },
  {
    id: 14,
    name: "Dr. Umarani Jayaraman",
    title: "Professor",
    area: "Image Processing, Biometrics, Pattern Recognition",
    image: "/placeholder.svg?height=300&width=300",
    publications: [
      {
        id: 1,
        title: "Deep Learning for Iris Recognition",
        authors: "Jayaraman U, Kumar S, Reddy P",
        venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
        year: 2023,
        type: "journal",
        doi: "10.1109/TPAMI.2023.1234567",
        citations: 11,
        abstract:
          "This paper presents deep learning approaches for iris recognition, achieving state-of-the-art performance on benchmark datasets.",
        keywords: ["Iris Recognition", "Deep Learning", "Biometrics"],
      },
      {
        id: 2,
        title: "Multi-Biometric Systems for Enhanced Security",
        authors: "Jayaraman U, Singh A, Patel R",
        venue: "IEEE Transactions on Information Forensics and Security",
        year: 2022,
        type: "journal",
        doi: "10.1109/TIFS.2022.9876543",
        citations: 14,
        abstract:
          "We propose multi-biometric systems that combine multiple biometric traits for enhanced security and accuracy.",
        keywords: ["Multi-Biometric Systems", "Security", "Biometric Fusion"],
      },
    ],
  },
]

export default function PublicationsPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPublication, setSelectedPublication] = useState<any | null>(null)

  const years = Array.from(new Set(facultyData.flatMap((faculty) => faculty.publications.map((pub) => pub.year)))).sort(
    (a, b) => b - a,
  )

  const publicationTypes = Array.from(
    new Set(facultyData.flatMap((faculty) => faculty.publications.map((pub) => pub.type))),
  )

  // Get the selected faculty data
  const faculty = selectedFaculty !== null ? facultyData.find((f) => f.id === selectedFaculty) : null

  // Filter publications based on search and filters
  const filteredPublications =
    faculty?.publications.filter((pub) => {
      const matchesSearch =
        searchQuery === "" ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesYear = yearFilter === null || pub.year === yearFilter
      const matchesType = typeFilter === null || pub.type === typeFilter

      return matchesSearch && matchesYear && matchesType
    }) || []

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

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Publication type icons
  const getPublicationTypeIcon = (type: string) => {
    switch (type) {
      case "journal":
        return <BookText className="h-5 w-5 text-blue-500" />
      case "conference":
        return <Users className="h-5 w-5 text-green-500" />
      case "book":
        return <BookOpen className="h-5 w-5 text-purple-500" />
      case "chapter":
        return <BookMarked className="h-5 w-5 text-orange-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  // Get publication type label
  const getPublicationTypeLabel = (type: string) => {
    switch (type) {
      case "journal":
        return "Journal Article"
      case "conference":
        return "Conference Paper"
      case "book":
        return "Book"
      case "chapter":
        return "Book Chapter"
      default:
        return "Publication"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 opacity-20"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500 opacity-20"></div>
          <div className="grid grid-cols-10 gap-4 w-full h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-300 opacity-20"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Research Publications
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the cutting-edge research publications from our faculty members in various domains of Computer
              Science and Engineering.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Faculty Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Faculty Members</h2>

              <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                {facultyData.map((faculty) => (
                  <motion.li key={faculty.id} variants={itemVariants}>
                    <button
                      onClick={() => setSelectedFaculty(faculty.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                        selectedFaculty === faculty.id
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                          : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-sm font-medium text-gray-600">{faculty.name.charAt(0)}</span>
                      </div>
                      <span className="truncate">{faculty.name}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Publications Content */}
          <div className="lg:col-span-3">
            {selectedFaculty === null ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-md p-8 text-center"
              >
                <div className="mb-6">
                  <BookOpen className="h-16 w-16 mx-auto text-blue-500 opacity-50" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Faculty Member</h3>
                <p className="text-gray-500">
                  Please select a faculty member from the list to view their publications.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedFaculty}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Faculty Profile */}
                <motion.div
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-xl shadow-md p-6 mb-6"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={faculty?.image || "/placeholder.svg?height=300&width=300"}
                        alt={faculty?.name || "Faculty"}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{faculty?.name}</h2>
                      <p className="text-gray-600 mb-2">{faculty?.title}</p>
                      <p className="text-sm text-gray-500 mb-4">Research Area: {faculty?.area}</p>

                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {faculty?.publications.length} Publications
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <Award className="h-3 w-3 mr-1" />
                          {faculty?.publications.reduce((acc, pub) => acc + pub.citations, 0)} Citations
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                          <Calendar className="h-3 w-3 mr-1" />
                          {Math.min(...(faculty?.publications.map((p) => p.year) || [new Date().getFullYear()]))} -{" "}
                          {Math.max(...(faculty?.publications.map((p) => p.year) || [new Date().getFullYear()]))}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="relative w-full md:w-auto flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search publications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
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

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Publication Type</label>
                            <select
                              value={typeFilter || ""}
                              onChange={(e) => setTypeFilter(e.target.value || null)}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">All Types</option>
                              {publicationTypes.map((type) => (
                                <option key={type} value={type}>
                                  {getPublicationTypeLabel(type)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => {
                              setYearFilter(null)
                              setTypeFilter(null)
                              setSearchQuery("")
                            }}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            Reset Filters
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Publications List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Publications
                      {filteredPublications.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-gray-500">({filteredPublications.length})</span>
                      )}
                    </h3>
                  </div>

                  {filteredPublications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No publications found</h4>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {searchQuery || yearFilter || typeFilter
                          ? "Try adjusting your search or filters to find more results."
                          : "This faculty member has no publications in our database yet."}
                      </p>
                    </div>
                  ) : (
                    <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                      {filteredPublications.map((publication) => (
                        <motion.li
                          key={publication.id}
                          variants={itemVariants}
                          className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedPublication(publication)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0">{getPublicationTypeIcon(publication.type)}</div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-medium text-gray-800 mb-2 leading-tight">
                                {publication.title}
                              </h4>
                              <p className="text-gray-600 mb-3">{publication.authors}</p>

                              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                                <span className="text-gray-500 flex items-center">
                                  <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                                  {publication.venue}
                                </span>
                                <span className="text-gray-500 flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                  {publication.year}
                                </span>
                                <span className="text-gray-500 flex items-center">
                                  <Award className="h-4 w-4 mr-1 text-gray-400" />
                                  {publication.citations} citations
                                </span>
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {publication.keywords.map((keyword, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-600"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Publication Detail Modal */}
      <AnimatePresence>
        {selectedPublication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPublication(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {getPublicationTypeIcon(selectedPublication.type)}
                    <span className="text-sm font-medium text-gray-500">
                      {getPublicationTypeLabel(selectedPublication.type)}
                    </span>
                  </div>
                  <button onClick={() => setSelectedPublication(null)} className="text-gray-400 hover:text-gray-600">
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
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedPublication.title}</h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Authors</h4>
                  <p className="text-gray-800">{selectedPublication.authors}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Published In</h4>
                    <p className="text-gray-800">{selectedPublication.venue}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Year</h4>
                    <p className="text-gray-800">{selectedPublication.year}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">DOI</h4>
                    <a
                      href={`https://doi.org/${selectedPublication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {selectedPublication.doi}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Citations</h4>
                    <p className="text-gray-800">{selectedPublication.citations}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Abstract</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedPublication.abstract}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPublication.keywords.map((keyword, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <a
                    href={`https://doi.org/${selectedPublication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    View Online
                  </a>
                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

