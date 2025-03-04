import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, FlaskRoundIcon as Flask, Building2 } from "lucide-react"

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "550+", label: "Students" },
  { icon: <GraduationCap className="w-8 h-8" />, value: "14", label: "Faculty Members" },
  { icon: <Flask className="w-8 h-8" />, value: "10+", label: "Research Labs" },
  { icon: <Building2 className="w-8 h-8" />, value: "5", label: "Degree Programs" },
]

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

export default function DepartmentStats() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Department at a Glance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

