"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const newsData = [
  [
    { title: "AI Research Symposium", date: "June 15, 2023" },
    { title: "New ML Course Launched", date: "May 30, 2023" },
    { title: "Industry Talk: Cybersecurity", date: "May 22, 2023" },
  ],
  [
    { title: "Blockchain Workshop", date: "July 5, 2023" },
    { title: "Data Science Hackathon", date: "June 28, 2023" },
    { title: "IoT Seminar Series", date: "June 10, 2023" },
  ],
  [
    { title: "Cloud Computing Conference", date: "July 20, 2023" },
    { title: "AI in Healthcare Lecture", date: "July 12, 2023" },
    { title: "Robotics Demonstration", date: "July 3, 2023" },
  ],
]

const achievementsData = [
  [
    { title: "Best Paper Award at ICML 2023", person: "Dr. Jane Doe" },
    { title: "Google Research Grant", person: "AI Lab" },
    { title: "ACM Fellowship", person: "Prof. John Smith" },
  ],
  [
    { title: "IEEE Young Researcher Award", person: "Dr. Alex Johnson" },
    { title: "Microsoft AI for Earth Grant", person: "Climate Tech Team" },
    { title: "National Science Foundation Award", person: "Dr. Emily Chen" },
  ],
  [
    { title: "Best Demo at SIGGRAPH 2023", person: "VR Research Group" },
    { title: "IBM Quantum Computing Prize", person: "Quantum Lab" },
    { title: "ACM SIGCHI Best Paper", person: "HCI Research Team" },
  ],
]

const announcementsData = [
  [
    { title: "Ph.D. Applications Open", deadline: "Deadline: July 31, 2023" },
    { title: "Summer Internship Program", deadline: "Apply by May 15, 2023" },
    { title: "Faculty Positions Available", deadline: "Multiple openings" },
  ],
  [
    { title: "Research Assistant Positions", deadline: "Apply by August 15, 2023" },
    { title: "Fall Semester Registration", deadline: "Deadline: August 1, 2023" },
    { title: "Graduate Open House", deadline: "September 5, 2023" },
  ],
  [
    { title: "Undergraduate Research Program", deadline: "Apply by September 1, 2023" },
    { title: "International Exchange Program", deadline: "Deadline: October 15, 2023" },
    { title: "CS Department Scholarship", deadline: "Apply by August 30, 2023" },
  ],
]

const MotionCard = motion(Card)

export default function SidebarNews() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [currentAchievementsIndex, setCurrentAchievementsIndex] = useState(0)
  const [currentAnnouncementsIndex, setCurrentAnnouncementsIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length)
      setCurrentAchievementsIndex((prevIndex) => (prevIndex + 1) % achievementsData.length)
      setCurrentAnnouncementsIndex((prevIndex) => (prevIndex + 1) % announcementsData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden"
      >
        <CardHeader className="bg-blue-600">
          <CardTitle className="text-2xl font-bold text-white">Latest News & Events</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <AnimatePresence mode="wait">
            <motion.ul
              key={currentNewsIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {newsData[currentNewsIndex].map((item, index) => (
                <motion.li
                  key={index}
                  className="border-b border-gray-100 pb-2 hover:bg-blue-50 transition-colors duration-300 p-2 rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-blue-600">{item.date}</p>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </MotionCard>

      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden"
      >
        <CardHeader className="bg-blue-600">
          <CardTitle className="text-2xl font-bold text-white">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <AnimatePresence mode="wait">
            <motion.ul
              key={currentAchievementsIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {achievementsData[currentAchievementsIndex].map((item, index) => (
                <motion.li
                  key={index}
                  className="border-b border-gray-100 pb-2 hover:bg-blue-50 transition-colors duration-300 p-2 rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-blue-600">{item.person}</p>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
            More Achievements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </MotionCard>

      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden"
      >
        <CardHeader className="bg-blue-600">
          <CardTitle className="text-2xl font-bold text-white">Announcements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <AnimatePresence mode="wait">
            <motion.ul
              key={currentAnnouncementsIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {announcementsData[currentAnnouncementsIndex].map((item, index) => (
                <motion.li
                  key={index}
                  className="border-b border-gray-100 pb-2 hover:bg-blue-50 transition-colors duration-300 p-2 rounded"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-blue-600">{item.deadline}</p>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
            All Announcements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </MotionCard>
    </div>
  )
}

