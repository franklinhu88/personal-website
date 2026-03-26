"use client";

import Image from "next/image";
import {
  Home,
  FileText,
  Briefcase,
  Rocket,
} from "lucide-react";

const navItems = [
  { label: "Home", target: "about", icon: Home },
  { label: "Blog", target: "blog", icon: FileText },
  { label: "Experience", target: "experience", icon: Briefcase },
  { label: "Projects", target: "projects", icon: Rocket },
];

export default function Header() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("about")}
            className="cursor-pointer"
            aria-label="Go to home"
          >
            <Image
              src="/assets/icons/linkedin-logo.png"
              alt="Logo"
              width={32}
              height={32}
              priority
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="cursor-pointer flex flex-col items-center text-xs text-gray-600 hover:text-black"
            >
              <item.icon className="text-lg" size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
