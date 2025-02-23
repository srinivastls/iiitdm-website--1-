"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  ArrowRight,
  ChevronRight,
  BotIcon as Robot,
  Cloud,
  Network,
  Cpu,
  CircuitBoardIcon as Circuit,
  Laptop,
} from "lucide-react"
import { AnimatePresence } from "framer-motion"

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
  // ... (other laboratories)
]

export default function Laboratories() {
  const [selectedLab, setSelectedLab] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-indigo-900"
          initial={{ opacity: 0, y: 20 }}
          animate={mainControls}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
        >
          Our Laboratories
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
          Explore our state-of-the-art facilities where innovation and learning converge.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {laboratories.map((lab, index) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 50 }}
              animate={mainControls}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 cursor-pointer"
                onClick={() => setSelectedLab(lab)}
              >
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

      <AnimatePresence>
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
    </section>
  )
}

