import Link from "next/link"

const navItems = [
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/admissions", label: "Admissions" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
]

export default function MainNav() {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </>
  )
}

