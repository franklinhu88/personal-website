// src/components/profile/ProjectItem.tsx
import { ExternalLink } from "lucide-react";

interface ProjectItemProps {
  name: string;
  description: string;
  motivation: string;
  tools: string[];
  githubUrl: string;
}

export default function ProjectItem({
  name,
  description,
  motivation,
  tools,
  githubUrl,
}: ProjectItemProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h4 className="font-semibold text-base">{name}</h4>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-[var(--accent-blue)] hover:underline"
        >
          GitHub
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">{description}</p>

      {/* Motivation */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase">
          Why this project
        </p>
        <p className="text-sm text-gray-700">{motivation}</p>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 pt-1">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
