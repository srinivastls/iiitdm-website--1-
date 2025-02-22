"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  GraduationCap,
  BookOpen,
  FlaskRoundIcon as Flask,
  Users,
  Building2,
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  Network,
  Code,
  BotIcon as Robot,
  Cloud,
  Search,
  Menu,
  CircuitBoardIcon as Circuit,
  Laptop,
  MicroscopeIcon as Microchip,
} from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import MainNav from "@/components/MainNav"
import SidebarNews from "@/components/SidebarNews"
import HeroSection from "@/components/HeroSection"

// ... (keep the rest of your imports and data)

const programs = [
  {
    id: 1,
    name: "B.Tech in CSE",
    icon: <GraduationCap className="w-8 h-8" />,
    description: "A four-year undergraduate program focusing on core computer science and engineering principles.",
    highlights: ["Algorithm Design", "Software Engineering", "Data Structures", "Machine Learning Basics"],
  },
  {
    id: 2,
    name: "B.Tech in CSE with Major in AI",
    icon: <Robot className="w-8 h-8" />,
    description: "Specialized undergraduate program with a focus on Artificial Intelligence and its applications.",
    highlights: ["Deep Learning", "Natural Language Processing", "Computer Vision", "AI Ethics"],
  },
  {
    id: 3,
    name: "M.Tech in CSE (Data Science and AI)",
    icon: <Database className="w-8 h-8" />,
    description: "Advanced postgraduate program specializing in Data Science and Artificial Intelligence.",
    highlights: ["Big Data Analytics", "Advanced Machine Learning", "Data Visualization", "AI in Business"],
  },
  {
    id: 4,
    name: "Ph.D in Computer Science",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Doctoral program for advanced research in various computer science domains.",
    highlights: ["Research Methodology", "Advanced Topics in CS", "Thesis Writing", "Academic Publishing"],
  },
  {
    id: 5,
    name: "Dual Degree (B.Tech + M.Tech in CSE)",
    icon: <Code className="w-8 h-8" />,
    description: "Integrated program offering both B.Tech and M.Tech degrees in Computer Science and Engineering.",
    highlights: ["Extended Research Project", "Industry Internship", "Specialization Tracks", "Integrated Curriculum"],
  },
]

const laboratories = [
  {
    id: 1,
    name: "AI and Machine Learning Lab",
    icon: <Robot className="w-8 h-8" />,
    description: "Cutting-edge facility for AI and ML research and development.",
    equipment: ["GPU Clusters", "Neural Network Simulators", "Data Annotation Tools", "AI Development Frameworks"],
    image: "/lab-ai-ml.jpg",
  },
  {
    id: 2,
    name: "Cloud Computing and Big Data Lab",
    icon: <Cloud className="w-8 h-8" />,
    description: "Advanced lab for cloud technologies and big data processing.",
    equipment: ["Cloud Servers", "Hadoop Cluster", "Data Visualization Tools", "Distributed Computing Platforms"],
    image: "/lab-cloud-bigdata.jpg",
  },
  {
    id: 3,
    name: "Cybersecurity and Network Lab",
    icon: <Network className="w-8 h-8" />,
    description: "Specialized lab for network security and cybersecurity research.",
    equipment: ["Network Simulators", "Penetration Testing Tools", "Firewall Systems", "Encryption Hardware"],
    image: "/lab-cybersecurity.jpg",
  },
  {
    id: 4,
    name: "IoT and Embedded Systems Lab",
    icon: <Cpu className="w-8 h-8" />,
    description: "State-of-the-art facility for IoT and embedded systems development.",
    equipment: ["IoT Development Kits", "Sensor Arrays", "Microcontroller Platforms", "Wireless Communication Modules"],
    image: "/lab-iot-embedded.jpg",
  },
  {
    id: 5,
    name: "Digital and Analog Circuits Design",
    icon: <Circuit className="w-8 h-8" />,
    description: "State-of-the-art facility for designing and testing digital and analog circuits.",
    equipment: ["Oscilloscopes", "Function Generators", "Logic Analyzers", "PCB Prototyping Machines"],
    image: "/lab-digital-analog.jpg",
  },
  {
    id: 6,
    name: "Object Oriented Algorithm Design and Analysis",
    icon: <Laptop className="w-8 h-8" />,
    description: "Advanced computing lab for algorithm design and analysis using object-oriented principles.",
    equipment: ["High-performance Workstations", "Algorithm Visualization Tools", "Version Control Systems"],
    image: "/lab-algorithm.jpg",
  },
  {
    id: 7,
    name: "Database Systems",
    icon: <Database className="w-8 h-8" />,
    description: "Cutting-edge database lab for exploring various database management systems and technologies.",
    equipment: ["Database Servers", "Data Modeling Tools", "Big Data Processing Clusters"],
    image: "/lab-database.jpg",
  },
  {
    id: 8,
    name: "Computer Networking",
    icon: <Network className="w-8 h-8" />,
    description: "Modern networking lab for hands-on experience with various network protocols and architectures.",
    equipment: ["Routers", "Switches", "Network Analyzers", "Firewall Systems"],
    image: "/lab-networking.jpg",
  },
  {
    id: 9,
    name: "VLSI System Design",
    icon: <Microchip className="w-8 h-8" />,
    description: "Advanced lab for designing and simulating Very Large Scale Integration (VLSI) systems.",
    equipment: ["FPGA Development Boards", "IC Design Software", "Chip Fabrication Equipment"],
    image: "/lab-vlsi.jpg",
  },
  {
    id: 10,
    name: "Embedded Systems",
    icon: <Cpu className="w-8 h-8" />,
    description: "Specialized lab for developing and testing embedded systems and IoT devices.",
    equipment: ["Microcontroller Kits", "Embedded Systems Debuggers", "IoT Sensors and Actuators"],
    image: "/lab-embedded.jpg",
  },
]

const heroImages = [
  "/lovable-uploads/6bb5de35-b3ef-4db7-8b53-ae22f4ff4fa1.png",
  "/path-to-your-second-image.jpg",
  "/path-to-your-third-image.jpg",
]

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [selectedLab, setSelectedLab] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
            <nav className="hidden lg:flex space-x-6">
              <MainNav />
            </nav>
            <div className="flex items-center space-x-4">
              <form className="hidden md:flex items-center">
                <Input type="search" placeholder="Search..." className="w-64 rounded-r-none" />
                <Button type="submit" size="default" variant="default" className="bg-blue-600 rounded-l-none">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <HeroSection />
        <NewsTicker />

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold mb-6">Welcome to Computer Science and Engineering</h2>
                <div className="prose max-w-none">
                  <p>
                    Computer Science and Engineering stream started in 2009. IIITDM Kancheepuram's Computer Science and
                    Engineering curriculum is modeled on the ACM (Association for Computing Machinery) recommendations
                    and is the first of its kind engineering program offered in India.
                  </p>
                  <p>
                    This program is aimed at producing engineers equipped with skills required for efficient
                    hardware-software interaction. In addition to courses offered by the conventional Computer Science
                    curriculum, this novel program offers core courses such as Embedded Systems, Human-Computer
                    Interaction, Signals and Systems, Product Design etc., that equip the students with both computing
                    and electronics engineering skills that are very much required for the successful creation of
                    products requiring hardware - software interactions.
                  </p>
                  <p>
                    Our graduates would find wide scope in VLSI, Embedded Systems and Electronics Product Manufacturing
                    related industries in addition to application development avenues and higher studies that are open
                    to conventional Computer Science engineers.
                  </p>
                  <p>
                  Department of Computer Science and Engineering (CSE) offers design centric programmes such as B.Tech (CSE), B.Tech(CSE with Major in AI), Dual Degree (DD) programmes (B.Tech in CSE and M.Tech in CSE), M.Tech.(CSE with Specialization in Data Science and Artificial Intelligence) and Ph.D in various research areas in computer science. The department has enthusiastic students numbering around 550 which includes B.Tech, DD students, M.Tech and Ph.D scholars. There are 14 faculty members who are actively involved in research in areas such as knowledge engineering, machine learning, wireless sensor networks, membrane computing, cyber-physical systems, IOT, high performance computing, VLSI architectures, biometrics, machine learning, image processing, soft computing and theoretical computer science.

                  </p>
                </div>

                <Button className="mt-8">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* New Intake Information Section */}
                <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <h3 className="text-2xl font-bold text-white">
                      Intake in CSE Department for the Academic Year 2021-2022
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      <IntakeItem
                        program="B.Tech in CSE"
                        total={85}
                        breakdown={[
                          { label: "JEE main based", value: 80 },
                          { label: "DASA", value: 5 },
                        ]}
                      />
                      <IntakeItem
                        program="B.Tech in CSE with Major in AI"
                        total={43}
                        breakdown={[
                          { label: "JEE main based", value: 40 },
                          { label: "DASA", value: 3 },
                        ]}
                      />
                      <IntakeItem
                        program="M.Tech in CSE with Specialization in Data Science and Artificial Intelligence"
                        total={21}
                        breakdown={[
                          { label: "GATE based", value: 20 },
                          { label: "DASA", value: 1 },
                        ]}
                      />
                      <IntakeItem program="Ph.D" total={3} />
                    </ul>
                    <Button
                      variant="link"
                      className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:w-1/3">
                <SidebarNews />
              </div>
            </div>
          </div>
        </section>

        {/* Redesigned Programs Offered Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Programs Offered</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Discover our cutting-edge programs designed to prepare you for the future of technology and innovation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <motion.div
                  key={program.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedProgram(program)}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500">
                    <CardHeader className="pb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                          {program.icon}
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                          {program.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">{program.description}</CardDescription>
                      <ul className="space-y-2">
                        {program.highlights.slice(0, 2).map((highlight, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 transition-colors duration-300">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Laboratories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Our Laboratories</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Explore our state-of-the-art facilities where innovation and learning converge.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {laboratories.map((lab) => (
                <motion.div
                  key={lab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedLab(lab)}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
                    <CardHeader>
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                        {lab.icon}
                      </div>
                      <CardTitle className="text-2xl group-hover:text-indigo-600 transition-colors duration-300">
                        {lab.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">{lab.description}</CardDescription>
                      <div className="mt-6 flex items-center text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300">
                        <span className="text-sm font-medium">Explore Lab</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Department Stats */}
        <section className="py-20 bg-gradient-to-b from-blue-900 to-indigo-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Department at a Glance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={<Users className="w-8 h-8" />} value="550+" label="Students" />
              <StatCard icon={<GraduationCap className="w-8 h-8" />} value="14" label="Faculty Members" />
              <StatCard icon={<Flask className="w-8 h-8" />} value="10+" label="Research Labs" />
              <StatCard icon={<Building2 className="w-8 h-8" />} value="5" label="Degree Programs" />
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedProgram && (
            <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center text-blue-600">
                    {selectedProgram.icon}
                    <span className="ml-2">{selectedProgram.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <DialogDescription className="text-lg text-gray-700">{selectedProgram.description}</DialogDescription>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-blue-800">Program Highlights:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProgram.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <ChevronRight className="w-5 h-5 mr-2 text-blue-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {selectedLab && (
            <Dialog open={!!selectedLab} onOpenChange={() => setSelectedLab(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center text-indigo-600">
                    {selectedLab.icon}
                    <span className="ml-2">{selectedLab.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedLab.image || "/placeholder.svg"}
                      alt={selectedLab.name}
                      width={500}
                      height={300}
                      className="rounded-lg shadow-md object-cover"
                    />
                  </div>
                  <div>
                    <DialogDescription className="text-lg text-gray-700 mb-4">
                      {selectedLab.description}
                    </DialogDescription>
                    <h4 className="text-xl font-semibold mb-2 text-indigo-800">Equipment:</h4>
                    <ul className="space-y-2">
                      {selectedLab.equipment.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <ChevronRight className="w-5 h-5 mr-2 text-indigo-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
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
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/academics">Academics</Link>
                </li>
                <li>
                  <Link href="/research">Research</Link>
                </li>
                <li>
                  <Link href="/people">People</Link>
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

function StatCard({ icon, value, label }) {
  return (
    <Card className="bg-white/10 border-none text-white">
      <CardHeader>
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">{icon}</div>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-4xl font-bold mb-2">{value}</CardTitle>
        <CardDescription className="text-lg text-blue-100">{label}</CardDescription>
      </CardContent>
    </Card>
  )
}

function IntakeItem({ program, total, breakdown }) {
  return (
    <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
      <div className="flex-1">
        <h4 className="font-semibold text-lg text-gray-800">{program}</h4>
        {breakdown && (
          <div className="mt-1 text-sm text-gray-600">
            {breakdown.map((item, index) => (
              <span key={index} className="mr-2">
                {item.label}: {item.value}
                {index < breakdown.length - 1 && " |"}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 sm:mt-0 text-2xl font-bold text-blue-600">{total}</div>
    </li>
  )
}

