import Image from "next/image";

interface LinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; url: string; iconSrc?: string }[];
}

export default function LinksModal({
  isOpen,
  onClose,
  links,
}: LinksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 max-w-full">
        <h3 className="text-lg font-semibold mb-4">Links</h3>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {link.iconSrc && (
                  <div className="h-6 w-6 relative">
                    <Image
                      src={link.iconSrc}
                      alt={`${link.label} icon`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="font-medium text-gray-800">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="cursor-pointer mt-6 w-full rounded-full bg-gray-200 px-4 py-1.5 text-sm font-semibold hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
