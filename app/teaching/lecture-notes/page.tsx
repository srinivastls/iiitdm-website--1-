"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  BookOpen,
  FileText,
  Download,
  Play,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Lightbulb,
  PenTool,
  Video,
  Folder,
  FileQuestion,
  Layers,
  Network,
  Code,
  MousePointer,
  Brain,
} from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import MainNav from "@/components/MainNav"

// Course data organized by instructor
const instructorCourses = [
  {
    name: "Dr. N Sadagopan",
    title: "Professor",
    image: "/placeholder.svg?height=200&width=200",
    courses: [
      {
        title: "Discrete Structures for Computer Engineering",
        icon: <Layers className="w-6 h-6" />,
        color: "from-blue-500 to-blue-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "Problem Session", icon: <Lightbulb className="w-5 h-5" /> },
          { type: "Assignments", icon: <PenTool className="w-5 h-5" /> },
          { type: "Practice Questions", icon: <FileQuestion className="w-5 h-5" /> },
          { type: "Previous Year Questions", icon: <Calendar className="w-5 h-5" /> },
        ],
      },
      {
        title: "Design and Analysis of Algorithms",
        icon: <Lightbulb className="w-6 h-6" />,
        color: "from-indigo-500 to-indigo-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "Problem Session", icon: <Lightbulb className="w-5 h-5" /> },
          { type: "Assignments", icon: <PenTool className="w-5 h-5" /> },
        ],
      },
      {
        title: "Advanced Data Structures and Algorithms",
        icon: <Layers className="w-6 h-6" />,
        color: "from-purple-500 to-purple-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "Problem Session", icon: <Lightbulb className="w-5 h-5" /> },
          { type: "Assignments", icon: <PenTool className="w-5 h-5" /> },
        ],
      },
      {
        title: "Computer Networks",
        icon: <Network className="w-6 h-6" />,
        color: "from-teal-500 to-teal-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "Problem Session", icon: <Lightbulb className="w-5 h-5" /> },
          { type: "Assignments", icon: <PenTool className="w-5 h-5" /> },
        ],
      },
      {
        title: "C Programming",
        icon: <Code className="w-6 h-6" />,
        color: "from-amber-500 to-amber-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "Practice Questions", icon: <FileQuestion className="w-5 h-5" /> },
          { type: "Assignments", icon: <PenTool className="w-5 h-5" /> },
        ],
      },
    ],
  },
  {
    name: "Dr. Umarani Jayaraman",
    title: "Associate Professor",
    image: "/placeholder.svg?height=200&width=200",
    courses: [
      {
        title: "Human Computer Interaction",
        icon: <MousePointer className="w-6 h-6" />,
        color: "from-rose-500 to-rose-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "In-Class Activities", icon: <Lightbulb className="w-5 h-5" /> },
          { type: "Videos", icon: <Video className="w-5 h-5" /> },
          { type: "Projects", icon: <Folder className="w-5 h-5" /> },
        ],
      },
      {
        title: "Pattern Recognition",
        icon: <Brain className="w-6 h-6" />,
        color: "from-cyan-500 to-cyan-600",
        resources: [
          { type: "Lecture Notes", icon: <FileText className="w-5 h-5" /> },
          { type: "Other Resources", icon: <Folder className="w-5 h-5" /> },
          { type: "Assignments", icon: <PenTool className="w-5 h-5" /> },
          { type: "Syllabus", icon: <BookOpen className="w-5 h-5" /> },
        ],
      },
    ],
  },
]

// Sample lecture notes for demonstration
const sampleLectureNotes = [
  { title: "Introduction to the Course", week: 1, duration: "45 mins", date: "Jan 10, 2023", fileSize: "2.4 MB" },
  { title: "Fundamental Concepts", week: 1, duration: "50 mins", date: "Jan 12, 2023", fileSize: "3.1 MB" },
  { title: "Advanced Topics - Part 1", week: 2, duration: "55 mins", date: "Jan 17, 2023", fileSize: "4.2 MB" },
  { title: "Advanced Topics - Part 2", week: 2, duration: "60 mins", date: "Jan 19, 2023", fileSize: "3.8 MB" },
  { title: "Problem Solving Techniques", week: 3, duration: "65 mins", date: "Jan 24, 2023", fileSize: "5.0 MB" },
]

export default function LectureNotes() {
  // State for active instructor and course
  const [activeInstructor, setActiveInstructor] = useState(0)
  const [activeCourse, setActiveCourse] = useState(0)
  const [activeResourceType, setActiveResourceType] = useState("Lecture Notes")

  // Refs for scroll animations
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 })

  // Get current instructor and course
  const currentInstructor = instructorCourses[activeInstructor]
  const currentCourse = currentInstructor.courses[activeCourse]

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
                Lecture Notes
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Access comprehensive lecture notes, problem sets, and learning resources from our distinguished faculty.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section ref={contentRef} className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Instructor Tabs */}
              <Tabs
                defaultValue={instructorCourses[0].name.replace(/\s+/g, "-").toLowerCase()}
                className="w-full"
                onValueChange={(value) => {
                  const index = instructorCourses.findIndex(
                    (instructor) => instructor.name.replace(/\s+/g, "-").toLowerCase() === value,
                  )
                  setActiveInstructor(index)
                  setActiveCourse(0)
                }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-blue-900">Select Instructor</h2>
                  <TabsList className="grid w-full grid-cols-2 h-auto">
                    {instructorCourses.map((instructor, index) => (
                      <TabsTrigger
                        key={instructor.name}
                        value={instructor.name.replace(/\s+/g, "-").toLowerCase()}
                        className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      >
                        <div className="flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          <span>{instructor.name}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {instructorCourses.map((instructor, instructorIndex) => (
                  <TabsContent
                    key={instructor.name}
                    value={instructor.name.replace(/\s+/g, "-").toLowerCase()}
                    className="mt-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Instructor Info */}
                      <Card className="mb-8 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 flex flex-col justify-center items-center">
                              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white/30">
                                <Image
                                  src={instructor.image || "/placeholder.svg"}
                                  alt={instructor.name}
                                  width={128}
                                  height={128}
                                  className="object-cover"
                                />
                              </div>
                              <h3 className="text-xl font-bold">{instructor.name}</h3>
                              <p className="text-blue-100">{instructor.title}</p>
                            </div>
                            <div className="md:w-3/4 p-6">
                              <h3 className="text-2xl font-bold mb-4 text-blue-900">Courses</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {instructor.courses.map((course, courseIndex) => (
                                  <motion.div
                                    key={course.title}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Card
                                      className={`cursor-pointer overflow-hidden ${
                                        instructorIndex === activeInstructor && courseIndex === activeCourse
                                          ? "ring-2 ring-blue-500 shadow-lg"
                                          : "hover:shadow-md"
                                      }`}
                                      onClick={() => {
                                        setActiveCourse(courseIndex)
                                        setActiveResourceType("Lecture Notes")
                                      }}
                                    >
                                      <CardHeader className={`py-3 bg-gradient-to-r ${course.color} text-white`}>
                                        <div className="flex items-center">
                                          {course.icon}
                                          <CardTitle className="text-lg ml-2">{course.title}</CardTitle>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="p-4">
                                        <div className="flex flex-wrap gap-2">
                                          {course.resources.map((resource) => (
                                            <span
                                              key={resource.type}
                                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                              {resource.icon}
                                              <span className="ml-1">{resource.type}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Selected Course Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${instructorIndex}-${activeCourse}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card>
                            <CardHeader className={`bg-gradient-to-r ${currentCourse.color} text-white`}>
                              <div className="flex items-center">
                                {currentCourse.icon}
                                <CardTitle className="text-2xl ml-2">{currentCourse.title}</CardTitle>
                              </div>
                              <CardDescription className="text-white/80">
                                Instructor: {currentInstructor.name}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                              {/* Resource Type Tabs */}
                              <Tabs
                                defaultValue="Lecture Notes"
                                className="w-full"
                                value={activeResourceType}
                                onValueChange={setActiveResourceType}
                              >
                                <TabsList className="mb-6 flex flex-wrap h-auto">
                                  {currentCourse.resources.map((resource) => (
                                    <TabsTrigger
                                      key={resource.type}
                                      value={resource.type}
                                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                    >
                                      <div className="flex items-center">
                                        {resource.icon}
                                        <span className="ml-2">{resource.type}</span>
                                      </div>
                                    </TabsTrigger>
                                  ))}
                                </TabsList>

                                {currentCourse.resources.map((resource) => (
                                  <TabsContent key={resource.type} value={resource.type} className="mt-0">
                                    <AnimatePresence mode="wait">
                                      <motion.div
                                        key={resource.type}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {resource.type === "Lecture Notes" && (
                                          <div className="space-y-4">
                                            <div className="flex justify-between items-center mb-6">
                                              <h3 className="text-xl font-semibold text-blue-900">
                                                Available Lecture Notes
                                              </h3>
                                              <Button variant="outline" className="text-blue-600 border-blue-200">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download All
                                              </Button>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                              <Accordion type="single" collapsible className="w-full">
                                                {sampleLectureNotes.map((note, index) => (
                                                  <AccordionItem key={index} value={`note-${index}`}>
                                                    <AccordionTrigger className="hover:bg-gray-100 px-4 rounded-md">
                                                      <div className="flex items-center text-left">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                          <FileText className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                          <h4 className="font-medium text-gray-900">{note.title}</h4>
                                                          <p className="text-sm text-gray-500">Week {note.week}</p>
                                                        </div>
                                                      </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-4 pt-2 pb-4">
                                                      <div className="bg-white p-4 rounded-md border border-gray-200">
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                          <div className="flex flex-col">
                                                            <span className="text-xs text-gray-500">Duration</span>
                                                            <span className="flex items-center text-sm font-medium">
                                                              <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                                              {note.duration}
                                                            </span>
                                                          </div>
                                                          <div className="flex flex-col">
                                                            <span className="text-xs text-gray-500">Date</span>
                                                            <span className="flex items-center text-sm font-medium">
                                                              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                                              {note.date}
                                                            </span>
                                                          </div>
                                                          <div className="flex flex-col">
                                                            <span className="text-xs text-gray-500">File Size</span>
                                                            <span className="flex items-center text-sm font-medium">
                                                              <FileText className="w-4 h-4 mr-1 text-blue-500" />
                                                              {note.fileSize}
                                                            </span>
                                                          </div>
                                                          <div className="flex flex-col">
                                                            <span className="text-xs text-gray-500">Status</span>
                                                            <span className="flex items-center text-sm font-medium text-green-600">
                                                              <CheckCircle className="w-4 h-4 mr-1" />
                                                              Available
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="flex space-x-3">
                                                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Download
                                                          </Button>
                                                          <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-blue-200 text-blue-600"
                                                          >
                                                            <Play className="w-4 h-4 mr-2" />
                                                            Preview
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </AccordionContent>
                                                  </AccordionItem>
                                                ))}
                                              </Accordion>
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Problem Session" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Problem Sessions
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Access problem-solving sessions and practice materials to enhance your
                                              understanding of the course concepts.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              {[1, 2, 3, 4].map((session) => (
                                                <Card key={session} className="hover:shadow-md transition-shadow">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-start">
                                                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <Lightbulb className="w-5 h-5 text-indigo-600" />
                                                      </div>
                                                      <div>
                                                        <h4 className="font-medium text-gray-900">
                                                          Problem Session {session}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 mb-2">
                                                          Week {session}, 2023
                                                        </p>
                                                        <Button
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-indigo-600 border-indigo-200"
                                                        >
                                                          <Download className="w-4 h-4 mr-2" />
                                                          Download
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Assignments" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">Assignments</h3>
                                            <p className="text-gray-600 mb-6">
                                              View and download course assignments to test your knowledge and skills.
                                            </p>
                                            <div className="space-y-4">
                                              {[1, 2, 3].map((assignment) => (
                                                <Card key={assignment} className="hover:shadow-md transition-shadow">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-start">
                                                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <PenTool className="w-5 h-5 text-purple-600" />
                                                      </div>
                                                      <div className="flex-grow">
                                                        <div className="flex justify-between items-start">
                                                          <div>
                                                            <h4 className="font-medium text-gray-900">
                                                              Assignment {assignment}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">
                                                              Due: March {assignment * 5}, 2023
                                                            </p>
                                                          </div>
                                                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                            Available
                                                          </span>
                                                        </div>
                                                        <div className="mt-3 flex space-x-3">
                                                          <Button
                                                            size="sm"
                                                            className="bg-purple-600 hover:bg-purple-700"
                                                          >
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Download
                                                          </Button>
                                                          <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-purple-200 text-purple-600"
                                                          >
                                                            Submit
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Practice Questions" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Practice Questions
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Additional practice questions to help you master the course material.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              {[1, 2, 3, 4].map((set) => (
                                                <Card key={set} className="hover:shadow-md transition-shadow">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-start">
                                                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FileQuestion className="w-5 h-5 text-teal-600" />
                                                      </div>
                                                      <div>
                                                        <h4 className="font-medium text-gray-900">
                                                          Practice Set {set}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 mb-2">
                                                          Topic:{" "}
                                                          {set === 1
                                                            ? "Fundamentals"
                                                            : set === 2
                                                              ? "Intermediate"
                                                              : set === 3
                                                                ? "Advanced"
                                                                : "Expert"}
                                                        </p>
                                                        <Button
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-teal-600 border-teal-200"
                                                        >
                                                          <Download className="w-4 h-4 mr-2" />
                                                          Download
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Previous Year Questions" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Previous Year Questions
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Exam questions from previous years to help you prepare for assessments.
                                            </p>
                                            <div className="space-y-4">
                                              {[2022, 2021, 2020, 2019].map((year) => (
                                                <Card key={year} className="hover:shadow-md transition-shadow">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-start">
                                                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <Calendar className="w-5 h-5 text-amber-600" />
                                                      </div>
                                                      <div className="flex-grow">
                                                        <div className="flex justify-between items-start">
                                                          <div>
                                                            <h4 className="font-medium text-gray-900">
                                                              {year} Exam Questions
                                                            </h4>
                                                            <p className="text-sm text-gray-500">
                                                              Semester: {year % 2 === 0 ? "Fall" : "Spring"}
                                                            </p>
                                                          </div>
                                                        </div>
                                                        <div className="mt-3">
                                                          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Download
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Videos" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Video Resources
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Video lectures and demonstrations to enhance your learning experience.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                              {[1, 2, 3, 4].map((video) => (
                                                <Card
                                                  key={video}
                                                  className="overflow-hidden hover:shadow-lg transition-shadow"
                                                >
                                                  <div className="relative aspect-video bg-gray-200">
                                                    <Image
                                                      src={`/placeholder.svg?height=200&width=400&text=Video+${video}`}
                                                      alt={`Video ${video}`}
                                                      fill
                                                      className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                      <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                                                        <Play className="w-8 h-8 text-rose-600 ml-1" />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <CardContent className="p-4">
                                                    <h4 className="font-medium text-gray-900">Video Lecture {video}</h4>
                                                    <p className="text-sm text-gray-500 mb-2">
                                                      Duration: {20 + video * 5} minutes
                                                    </p>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "In-Class Activities" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              In-Class Activities
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Materials and resources from interactive classroom activities.
                                            </p>
                                            <div className="space-y-4">
                                              {[1, 2, 3].map((activity) => (
                                                <Card key={activity} className="hover:shadow-md transition-shadow">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-start">
                                                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <Lightbulb className="w-5 h-5 text-rose-600" />
                                                      </div>
                                                      <div>
                                                        <h4 className="font-medium text-gray-900">
                                                          Activity {activity}:{" "}
                                                          {activity === 1
                                                            ? "Design Challenge"
                                                            : activity === 2
                                                              ? "User Testing"
                                                              : "Prototyping Workshop"}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 mb-2">
                                                          Week {activity * 2}, 2023
                                                        </p>
                                                        <Button
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-rose-600 border-rose-200"
                                                        >
                                                          <Download className="w-4 h-4 mr-2" />
                                                          Download Materials
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Projects" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Course Projects
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Project guidelines, requirements, and resources for course projects.
                                            </p>
                                            <div className="space-y-6">
                                              {[1, 2].map((project) => (
                                                <Card key={project} className="hover:shadow-md transition-shadow">
                                                  <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg">
                                                      {project === 1
                                                        ? "Mid-term Project: Interface Design"
                                                        : "Final Project: Complete Application"}
                                                    </CardTitle>
                                                    <CardDescription>
                                                      Due: {project === 1 ? "March 15, 2023" : "May 10, 2023"}
                                                    </CardDescription>
                                                  </CardHeader>
                                                  <CardContent className="pt-2">
                                                    <p className="text-gray-600 mb-4">
                                                      {project === 1
                                                        ? "Design and prototype a user interface for a specified application following HCI principles."
                                                        : "Develop a complete application with focus on user experience and interaction design."}
                                                    </p>
                                                    <div className="flex space-x-3">
                                                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Project Brief
                                                      </Button>
                                                      <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-cyan-200 text-cyan-600"
                                                      >
                                                        <Folder className="w-4 h-4 mr-2" />
                                                        Resources
                                                      </Button>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Other Resources" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Additional Resources
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Supplementary materials to enhance your understanding of the course
                                              topics.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              {[
                                                {
                                                  title: "Recommended Textbooks",
                                                  icon: <BookOpen className="w-5 h-5" />,
                                                },
                                                { title: "Research Papers", icon: <FileText className="w-5 h-5" /> },
                                                { title: "Online Tools", icon: <Globe className="w-5 h-5" /> },
                                                { title: "Reference Materials", icon: <Folder className="w-5 h-5" /> },
                                              ].map((resource, index) => (
                                                <Card key={index} className="hover:shadow-md transition-shadow">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-start">
                                                      <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                        {resource.icon}
                                                      </div>
                                                      <div>
                                                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                                                        <p className="text-sm text-gray-500 mb-2">
                                                          Supplementary materials
                                                        </p>
                                                        <Button
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-cyan-600 border-cyan-200"
                                                        >
                                                          <ArrowRight className="w-4 h-4 mr-2" />
                                                          View
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {resource.type === "Syllabus" && (
                                          <div className="p-6 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                              Course Syllabus
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                              Detailed course syllabus including objectives, schedule, and assessment
                                              criteria.
                                            </p>
                                            <Card className="mb-6">
                                              <CardContent className="p-6">
                                                <h4 className="text-lg font-semibold mb-4">Course Overview</h4>
                                                <p className="text-gray-600 mb-4">
                                                  This course provides an introduction to pattern recognition techniques
                                                  and their applications in computer science and engineering.
                                                </p>
                                                <div className="space-y-4">
                                                  <div>
                                                    <h5 className="font-medium text-gray-900">Course Objectives</h5>
                                                    <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                                                      <li>Understand fundamental concepts of pattern recognition</li>
                                                      <li>
                                                        Apply pattern recognition algorithms to real-world problems
                                                      </li>
                                                      <li>Develop skills in feature extraction and selection</li>
                                                      <li>Implement and evaluate pattern classification systems</li>
                                                    </ul>
                                                  </div>
                                                  <div>
                                                    <h5 className="font-medium text-gray-900">Assessment</h5>
                                                    <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                                                      <li>Assignments: 30%</li>
                                                      <li>Mid-term Exam: 20%</li>
                                                      <li>Project: 20%</li>
                                                      <li>Final Exam: 30%</li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </CardContent>
                                            </Card>
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                              <Download className="w-4 h-4 mr-2" />
                                              Download Complete Syllabus
                                            </Button>
                                          </div>
                                        )}
                                      </motion.div>
                                    </AnimatePresence>
                                  </TabsContent>
                                ))}
                              </Tabs>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Need Additional Resources?</h2>
                <p className="text-xl mb-8">
                  Contact your instructor or visit the department library for additional learning materials and
                  resources.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Contact Instructor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Visit Library
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

