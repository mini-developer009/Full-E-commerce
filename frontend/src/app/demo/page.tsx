"use client";

import { useState } from "react";

export default function HeroSection() {
  const [title, setTitle] = useState("Welcome to Suborno");
  const [subtitle, setSubtitle] = useState("Embrace joy in every venture");
  const [cta, setCta] = useState("Get Started");

  const handleChange = (setter: (val: string) => void) => (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent || "";
    setter(value);
    console.log(value); // realtime console log
  };

  return (
    <section className="relative bg-gradient-to-r from-yellow-200 via-green-100 to-green-200 py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">

        {/* Editable Title */}
        <h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 block text-left whitespace-pre-wrap select-text"
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange(setTitle)}
          dir="ltr"
        >
          {title}
        </h1>

        {/* Editable Subtitle */}
        <p
          className="text-xl md:text-2xl text-gray-700 mb-10 block text-left whitespace-pre-wrap select-text"
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange(setSubtitle)}
          dir="ltr"
        >
          {subtitle}
        </p>

        {/* Editable CTA */}
        <div className="inline-block">
          <div
            className="px-8 py-4 text-lg bg-green-500 text-white rounded-md cursor-text block text-left whitespace-pre-wrap select-text"
            contentEditable
            suppressContentEditableWarning
            onInput={handleChange(setCta)}
            dir="ltr"
          >
            {cta}
          </div>
        </div>

      </div>
    </section>
  );
}
