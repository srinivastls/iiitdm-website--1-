"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, FlaskRoundIcon as Flask, Building2 } from "lucide-react"

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "550+", label: "Students" },
  { icon: <GraduationCap className="w-8 h-8" />, value: "14", label: "Faculty Members" },
  { icon: <Flask className="w-8 h-8" />, value: "10+", label: "Research Labs" },
  { icon: <Building2 className="w-8 h-8" />, value: "5", label: "Degree Programs" },
]

function StatCard({ icon, value, label, delay }) {
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const iconVariants = {
    initial: { 
      scale: 1,
      rotate: 0 
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        yoyo: Infinity
      }
    }
  }

  const numberVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay + 0.2
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="transform-gpu"
    >
      <Card className="bg-white/10 border-none text-white backdrop-blur-sm 
                     hover:bg-white/15 transition-colors duration-300
                     shadow-lg hover:shadow-xl">
        <CardHeader>
          <motion.div
            variants={iconVariants}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center 
                       justify-center mb-4 hover:bg-white/30 transition-colors 
                       duration-300"
          >
            {icon}
          </motion.div>
        </CardHeader>
        <CardContent className="text-center">
          <motion.div variants={numberVariants}>
            <CardTitle className="text-4xl font-bold mb-2 
                                 bg-gradient-to-r from-white to-blue-200 
                                 bg-clip-text text-transparent">
              {value}
            </CardTitle>
            <CardDescription className="text-lg text-blue-100 
                                      font-medium tracking-wide">
              {label}
            </CardDescription>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DepartmentStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-gradient-to-b from-blue-900 to-indigo-800 text-white
                 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={mainControls}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 
                     bg-gradient-to-r from-white to-blue-200 
                     bg-clip-text text-transparent"
          variants={titleVariants}
        >
          Department at a Glance
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

