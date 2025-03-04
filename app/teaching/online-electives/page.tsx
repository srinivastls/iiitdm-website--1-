"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ArrowRight,
  Code,
  BrainCircuit,
  Cpu,
  BookText,
  Globe,
  Lightbulb,
  Sparkles,
  Network,
  Layers,
  Wifi,
  Languages,
  GraduationCap,
  Bookmark,
} from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import MainNav from "@/components/MainNav"

// Course data organized by tracks
const courseTracks = [
  {
    name: "Theory Track",
    icon: <Code className="w-8 h-8" />,
    color: "from-blue-500 to-blue-600",
    description: "Foundational courses in programming and computational thinking",
    courses: [
      {
        title: "The Joy of Computing using Python",
        provider: "NPTEL",
        icon: <Sparkles className="w-5 h-5" />,
        description: "An introductory course that makes learning Python programming fun and engaging.",
      },
      {
        title: "Programming, Data Structures and Algorithms using Python",
        provider: "NPTEL",
        icon: <Layers className="w-5 h-5" />,
        description: "A comprehensive course covering essential programming concepts and data structures.",
      },
    ],
  },
  {
    name: "Data Science Track",
    icon: <BrainCircuit className="w-8 h-8" />,
    color: "from-purple-500 to-purple-600",
    description: "Advanced courses in AI, machine learning, and data analysis",
    courses: [
      {
        title: "Introduction to Machine Learning",
        provider: "NPTEL",
        icon: <Lightbulb className="w-5 h-5" />,
        description: "Learn the fundamentals of machine learning algorithms and their applications.",
      },
      {
        title: "Social Networks",
        provider: "NPTEL",
        icon: <Network className="w-5 h-5" />,
        description: "Explore the structure and dynamics of social networks and their analysis.",
      },
      {
        title: "Artificial Intelligence Search Methods for Problem Solving",
        provider: "NPTEL",
        icon: <BrainCircuit className="w-5 h-5" />,
        description: "Study various search algorithms and problem-solving techniques in AI.",
      },
      {
        title: "Deep Learning",
        provider: "NPTEL",
        icon: <Layers className="w-5 h-5" />,
        description: "Dive into neural networks, deep learning architectures, and their implementations.",
      },
    ],
  },
  {
    name: "System Track",
    icon: <Cpu className="w-8 h-8" />,
    color: "from-teal-500 to-teal-600",
    description: "Courses focused on hardware, networks, and system design",
    courses: [
      {
        title: "Embedded Systems — Design Verification and Test",
        provider: "NPTEL",
        icon: <Cpu className="w-5 h-5" />,
        description: "Learn about designing, verifying, and testing embedded systems.",
      },
      {
        title: "Hardware Modeling using Verilog",
        provider: "NPTEL",
        icon: <Layers className="w-5 h-5" />,
        description: "Master hardware description language for modeling digital systems.",
      },
      {
        title: "Introduction to Internet of Things",
        provider: "NPTEL",
        icon: <Wifi className="w-5 h-5" />,
        description: "Explore the world of connected devices and IoT architectures.",
      },
      {
        title: "Computer Networks and Internet Protocol",
        provider: "NPTEL",
        icon: <Globe className="w-5 h-5" />,
        description: "Understand the fundamentals of computer networks and internet protocols.",
      },
    ],
  },
  {
    name: "Free Electives",
    icon: <BookText className="w-8 h-8" />,
    color: "from-amber-500 to-amber-600",
    description: "Liberal arts and language courses to broaden your horizons",
    courses: [
      {
        title: "Technical English for Engineers",
        provider: "NPTEL",
        icon: <Languages className="w-5 h-5" />,
        description: "Improve your technical writing and communication skills for engineering contexts.",
      },
      {
        title: "English Language for Competitive Exams",
        provider: "NPTEL",
        icon: <GraduationCap className="w-5 h-5" />,
        description: "Prepare for competitive exams with focused English language training.",
      },
      {
        title: "Introduction to Cultural Studies",
        provider: "NPTEL",
        icon: <Bookmark className="w-5 h-5" />,
        description: "Explore diverse cultural perspectives and their impact on society.",
      },
    ],
  },
]

export default function OnlineElectives() {
  // Refs for scroll animations
  const heroRef = useRef(null)
  const introRef = useRef(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const introInView = useInView(introRef, { once: true, amount: 0.3 })

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
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-100 rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Online Electives
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Expand your knowledge and skills with our curated selection of online courses from leading platforms.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section ref={introRef} className="py-16 bg-gradient-to-br from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={introInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-3xl font-bold mb-8 text-blue-900">Enhance Your Learning Journey</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The department encourages students of all programmes to credit online courses from NPTEL and this acts
                  as good supplement in addition to in-house courses. Further, these online courses make the students
                  aware of scientific and technological developments in the field of Computer Science and Engineering.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These courses are carefully selected to complement our curriculum and provide you with additional
                  perspectives and skills that are valuable in today's rapidly evolving technological landscape.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Tracks Section */}
        {courseTracks.map((track, trackIndex) => (
          <section key={track.name} className={`py-20 ${trackIndex % 2 === 1 ? "bg-gray-50" : ""}`}>
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${track.color} flex items-center justify-center text-white mb-4`}
                  >
                    {track.icon}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-3 text-blue-900">{track.name}</h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">{track.description}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {track.courses.map((course, courseIndex) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: courseIndex * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500">
                      <CardHeader className={`pb-2`}>
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-r ${track.color} flex items-center justify-center text-white mr-3`}
                          >
                            {course.icon}
                          </div>
                          <div>
                            <CardTitle className="text-xl text-blue-900">{course.title}</CardTitle>
                            <CardDescription className="text-blue-600">Provider: {course.provider}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-600">{course.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">4-8 weeks</span>
                          <Button
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 flex items-center"
                          >
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-blue-900">Benefits of Online Electives</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how online electives can enhance your academic journey and career prospects.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Flexibility",
                  icon: <Sparkles className="w-8 h-8" />,
                  description:
                    "Learn at your own pace and schedule, making it easier to balance with your core coursework.",
                },
                {
                  title: "Diverse Perspectives",
                  icon: <Globe className="w-8 h-8" />,
                  description: "Gain insights from instructors across different institutions and backgrounds.",
                },
                {
                  title: "Industry Relevance",
                  icon: <Bookmark className="w-8 h-8" />,
                  description: "Stay updated with the latest technologies and practices valued by employers.",
                },
                {
                  title: "Specialized Knowledge",
                  icon: <Lightbulb className="w-8 h-8" />,
                  description: "Explore niche topics that may not be covered in depth in the regular curriculum.",
                },
                {
                  title: "Certificate Recognition",
                  icon: <GraduationCap className="w-8 h-8" />,
                  description: "Earn certificates that can be added to your resume and professional profiles.",
                },
                {
                  title: "Self-Directed Learning",
                  icon: <BookText className="w-8 h-8" />,
                  description: "Develop valuable self-discipline and independent learning skills.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 flex flex-col h-full items-center text-center">
                      <div className="mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Ready to Expand Your Knowledge?</h2>
                <p className="text-xl mb-8">
                  Explore these online electives and enhance your learning journey with courses from leading platforms.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                    Browse NPTEL Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Talk to an Advisor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
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

