"use client";

import { useEffect, useId, useState } from "react";
import { CheckCircle2, Send, X } from "lucide-react";

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  useEffect(() => {
    if (!isOpen) return;
    setSuccess(false);
    setError(null);
    setLoading(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res
        .json()
        .catch(() => ({ error: "Failed to send message." }));

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        return;
      }

      setError(data?.error || "Failed to send message.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="card bg-white p-6 w-full max-w-md">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-xs text-gray-600">
              Send me a message and I&apos;ll get back to you.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact modal"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30"
          >
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-green-50 p-3">
              <CheckCircle2
                size={22}
                className="text-green-600"
                aria-hidden="true"
              />
            </div>

            <p className="text-green-700 font-semibold">
              Message sent successfully!
            </p>
            <p className="text-sm text-gray-600">
              Thanks for reaching out.
            </p>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setError(null);
                onClose();
              }}
              className="cursor-pointer w-full rounded-md bg-[var(--accent-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            ) : null}

            <div className="space-y-2">
              <label
                htmlFor={nameId}
                className="text-xs font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                id={nameId}
                name="name"
                autoComplete="name"
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] disabled:opacity-60"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={emailId}
                className="text-xs font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                id={emailId}
                name="email"
                autoComplete="email"
                placeholder="Your email"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] disabled:opacity-60"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={messageId}
                className="text-xs font-semibold text-gray-600"
              >
                Message
              </label>
              <textarea
                id={messageId}
                name="message"
                placeholder="Message"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] min-h-[120px] resize-none disabled:opacity-60"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="cursor-pointer px-4 py-1.5 text-sm rounded-md hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="cursor-pointer rounded-md bg-[var(--accent-blue)] px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
