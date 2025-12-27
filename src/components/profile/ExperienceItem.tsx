import Image from "next/image";

type ExperienceItemProps = {
  company: string;
  role: string;
  logoSrc?: string;
  startDate: string;
  endDate: string;
  location?: string;
  employmentType?: string;
  bullets?: string[];
};

export default function ExperienceItem({
  company,
  role,
  logoSrc,
  startDate,
  endDate,
  location,
  employmentType,
  bullets = [],
}: ExperienceItemProps) {
  return (
    <div className="flex gap-4">
      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="h-12 w-12 rounded bg-gray-100 border overflow-hidden flex items-center justify-center">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={`${company} logo`}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <span className="text-sm font-semibold text-gray-500">
              {company[0]}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold leading-tight">{role}</h4>
        <p className="text-sm text-gray-700">{company}</p>

        <p className="text-xs text-gray-500">
          {startDate} – {endDate}
          {employmentType && ` · ${employmentType}`}
        </p>

        {location && (
          <p className="text-xs text-gray-500">{location}</p>
        )}

        {bullets.length > 0 && (
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
            {bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
