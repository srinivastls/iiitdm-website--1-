"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
  { name: "HCL", logo: "/assets/1.png" },
  { name: "IVTL", logo: "/assets/2.png" },
  { name: "Bally Technologies", logo: "/assets/3.png" },
  { name: "L&T", logo: "/assets/4.png" },
  { name: "Google", logo: "/assets/5.jpg" },
  { name: "Lucid Technologies", logo: "/assets/6.png" },
  { name: "Adobe", logo: "/assets/7.png" },
  { name: "Start Smart Labs", logo: "/assets/8.png" },
  { name: "Trimble", logo: "/assets/9.png" },
  { name: "Microsoft", logo: "/assets/10.png" },
  { name: "AMD", logo: "/assets/11.png" },
  { name: "Intel", logo: "/assets/12.png" },
  { name: "IBM", logo: "/assets/13.png" },
]

export default function PastRecruiters() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Past Recruiters</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The department has a remarkable placement statistics and almost all B.Tech students are employed in product
            oriented companies such as Google, Microsoft, Adobe, AMD, Trimble, Start Smart Labs, Lucid Tech, Bally Tech,
            IVTL, etc. Many students are part of startups working in the area of data science and machine learning.
          </p>
        </motion.div>

        <div className="relative overflow-hidden w-full py-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-inner">
          {/* First row of logos */}
          <div className="flex whitespace-nowrap animate-scroll">
            <div className="flex space-x-16 px-4">
              {companies.map((company, index) => (
                <div
                  key={`${company.name}-1-${index}`}
                  className="flex-none w-48 h-24 flex items-center justify-center group"
                >
                  <div className="relative w-full h-16 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex space-x-16 px-4">
              {companies.map((company, index) => (
                <div
                  key={`${company.name}-2-${index}`}
                  className="flex-none w-48 h-24 flex items-center justify-center group"
                >
                  <div className="relative w-full h-16 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row of logos (reversed) */}
          <div className="flex whitespace-nowrap animate-scroll-reverse mt-8">
            <div className="flex space-x-16 px-4">
              {[...companies].reverse().map((company, index) => (
                <div
                  key={`${company.name}-3-${index}`}
                  className="flex-none w-48 h-24 flex items-center justify-center group"
                >
                  <div className="relative w-full h-16 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex space-x-16 px-4">
              {[...companies].reverse().map((company, index) => (
                <div
                  key={`${company.name}-4-${index}`}
                  className="flex-none w-48 h-24 flex items-center justify-center group"
                >
                  <div className="relative w-full h-16 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white/50 to-transparent z-10" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white/50 to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}