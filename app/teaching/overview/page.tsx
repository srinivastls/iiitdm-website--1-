"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, GraduationCap, Lightbulb, FileText, Calendar, Award } from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import MainNav from "@/components/MainNav"

export default function TeachingOverview() {
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
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full opacity-20 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Teaching Overview
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore our teaching philosophy, methodologies, and resources designed to provide an exceptional
                learning experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Teaching Philosophy Section */}
        <section className="py-16 bg-gradient-to-br from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-3xl font-bold mb-8 text-blue-900">Our Teaching Philosophy</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At IIITDM Kancheepuram's Department of Computer Science and Engineering, we believe in a holistic
                  approach to education that combines theoretical knowledge with practical application. Our teaching
                  methodology is designed to foster critical thinking, problem-solving abilities, and innovation.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We emphasize experiential learning, where students learn by doing. This approach helps bridge the gap
                  between theory and practice, preparing our students for the challenges of the real world. Our faculty
                  members are dedicated to providing personalized attention and mentorship to each student.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Teaching Resources Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-blue-900">Teaching Resources</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide a variety of resources to support the learning journey of our students.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Curriculum",
                  icon: <BookOpen className="w-8 h-8" />,
                  description:
                    "Comprehensive curriculum designed to cover fundamental and advanced topics in computer science.",
                  link: "/teaching/curriculum",
                },
                {
                  title: "Lecture Notes",
                  icon: <FileText className="w-8 h-8" />,
                  description: "Detailed lecture notes and study materials for all courses offered by the department.",
                  link: "/teaching/lecture-notes",
                },
                {
                  title: "Time Table",
                  icon: <Calendar className="w-8 h-8" />,
                  description: "Current semester schedule for all courses, labs, and other academic activities.",
                  link: "/teaching/time-table",
                },
                {
                  title: "Online Electives",
                  icon: <Lightbulb className="w-8 h-8" />,
                  description: "Additional online courses and electives to supplement the core curriculum.",
                  link: "/teaching/online-electives",
                },
                {
                  title: "Best Projects",
                  icon: <Award className="w-8 h-8" />,
                  description:
                    "Showcase of outstanding student projects that demonstrate excellence in application of concepts.",
                  link: "/teaching/best-projects",
                },
                {
                  title: "Research Opportunities",
                  icon: <GraduationCap className="w-8 h-8" />,
                  description:
                    "Information about research opportunities available for undergraduate and graduate students.",
                  link: "/research",
                },
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {resource.icon}
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 flex-grow">{resource.description}</p>
                      <Link href={resource.link}>
                        <Button
                          variant="ghost"
                          className="mt-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0 flex items-center"
                        >
                          Explore
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                <h2 className="text-3xl font-bold mb-6">Ready to Learn with Us?</h2>
                <p className="text-xl mb-8">
                  Join our vibrant academic community and embark on a journey of discovery and innovation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Faculty
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

