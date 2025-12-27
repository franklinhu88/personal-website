import Image from "next/image";

export default function ProfileHeader() {
  return (
    <section className="card overflow-hidden">
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
            B.S./M.S. Computer Science Joint Program at Vanderbilt University
          </p>
          <p className="text-sm text-gray-500">
            New York Metropolitan Area · United States
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="rounded-full bg-[var(--accent-blue)] px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
