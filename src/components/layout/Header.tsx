"use client";

import Image from "next/image";

const navItems = [
  {
    label: "Home",
    target: "home",
    iconType: "image",
    iconSrc: "/assets/home-icon.png",
  },
  {
    label: "Projects",
    target: "projects",
    iconType: "emoji",
    icon: "💼",
  },
  {
    label: "Activity",
    target: "activity",
    iconType: "emoji",
    icon: "⚡",
  },
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
          <Image
            src="/assets/linkedin-logo.png"
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </div>

        {/* Nav */}
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="flex flex-col items-center text-xs text-gray-600 hover:text-black"
            >
              <div className="flex items-center justify-center h-6 w-6">
                {item.iconType === "image" ? (
                  <Image
                    src={item.iconSrc}
                    alt={`${item.label} icon`}
                    width={20}
                    height={20}
                    unoptimized
                  />
                ) : (
                  <span className="text-lg">{item.icon}</span>
                )}
              </div>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
