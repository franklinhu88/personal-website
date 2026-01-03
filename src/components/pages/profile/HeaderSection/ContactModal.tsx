"use client";

import { useState } from "react";

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

  if (!isOpen) return null;

  const submit = async () => {
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Contact</h3>

        {success ? (
          <div className="space-y-4 text-center">
            <p className="text-green-600 font-medium">
              Message sent successfully!
            </p>

            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="cursor-pointer w-full rounded-md bg-[var(--accent-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              placeholder="Your name"
              className="w-full border rounded-md p-2 text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Your email"
              className="w-full border rounded-md p-2 text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              placeholder="Message"
              className="w-full border rounded-md p-2 text-sm min-h-[120px]"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="cursor-pointer px-4 py-1.5 text-sm rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="cursor-pointer rounded-md bg-[var(--accent-blue)] px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
