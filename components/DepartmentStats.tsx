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
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="bg-white/10 border-none text-white">
        <CardHeader>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">{icon}</div>
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">{value}</CardTitle>
          <CardDescription className="text-lg text-blue-100">{label}</CardDescription>
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

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-900 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={mainControls}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
        >
          Department at a Glance
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

