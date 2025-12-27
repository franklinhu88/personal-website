// src/components/profile/MultiRoleExperienceItem.tsx
import Image from "next/image";

interface Role {
  title: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

interface MultiRoleExperienceItemProps {
  company: string;
  location: string;
  roles: Role[];
  logoSrc?: string; // NEW
}

export default function MultiRoleExperienceItem({
  company,
  location,
  roles,
  logoSrc,
}: MultiRoleExperienceItemProps) {
  return (
    <div className="flex gap-4">
      {/* Company logo */}
      <div className="h-12 w-12 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center overflow-hidden border">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={`${company} logo`}
            width={48}
            height={48}
            className="object-contain"
          />
        ) : (
          <span className="text-sm font-semibold text-gray-600">
            {company[0]}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-4">
        {/* Company header */}
        <div>
          <h4 className="font-semibold">{company}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>

        {/* Roles timeline */}
        <div className="space-y-6 border-l border-gray-200 pl-4">
          {roles.map((role, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-sm font-medium">{role.title}</p>
              <p className="text-xs text-gray-500">
                {role.startDate} – {role.endDate}
              </p>

              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {role.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
