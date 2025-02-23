"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, ChevronRight, GraduationCap, BookOpen, Database, Code, BotIcon as Robot } from "lucide-react"

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

export default function ProgramsOffered() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-blue-900"
          initial={{ opacity: 0, y: 20 }}
          animate={mainControls}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
        >
          Programs Offered
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
        >
          Discover our cutting-edge programs designed to prepare you for the future of technology and innovation.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={mainControls}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-4 border-blue-500 cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
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
      </AnimatePresence>
    </section>
  )
}

