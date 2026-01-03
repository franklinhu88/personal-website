"use client";
import { useState } from "react";
import Image from "next/image";
import LinksModal from "./LinksModal";
import ContactModal from "./ContactModal";

export default function ProfileHeader() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const links = [
    {
      label: "GitHub",
      url: "https://github.com/franklinhu88",
      iconSrc: "/assets/logos/github.svg",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/franklinhu/",
      iconSrc: "/assets/logos/linkedin.svg",
    },
    {
      label: "Google Scholar",
      url: "https://scholar.google.com/citations?hl=en&user=GaFQAt4AAAAJ",
      iconSrc: "/assets/logos/google-scholar.svg",
    },
    {
      label: "Valorant Tracker",
      url: "https://tracker.gg/valorant/profile/riot/HuWu%23Vibin/overview?platform=pc&playlist=competitive&season=4c4b8cff-43eb-13d3-8f14-96b783c90cd2",
      iconSrc: "/assets/logos/valorant.png",
    },
  ];

  return (
    <section className="card overflow-hidden">
      {/* Banner */}
      <div className="relative h-32 w-full">
        <Image
          src="/assets/banner.png"
          alt="Profile banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-16 mb-4">
          <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            <Image
              src="/assets/profile_photo.jpg"
              alt="Franklin Hu"
              width={128}
              height={128}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Name & Headline */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Franklin Hu</h2>
          <p className="text-gray-700">
            Completing Joint B.S./M.S. Computer Science Program at Vanderbilt
            University
          </p>
          <p className="text-sm text-gray-500">
            New York Metropolitan Area · United States
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setContactOpen(true)}
            className="cursor-pointer rounded-full bg-[var(--accent-blue)] px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Contact
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer rounded-full border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Links
          </button>
        </div>
      </div>

      {/* Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <LinksModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        links={links}
      />
    </section>
  );
}
