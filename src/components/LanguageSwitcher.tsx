"use client";

import { useBreathlyContext } from "~/context/BreathlyContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useBreathlyContext();

  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-4 py-2 rounded ${
          language === 'pt'
            ? 'bg-indigo-600 text-white'
            : 'bg-indigo-100 text-indigo-600'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded ${
          language === 'en'
            ? 'bg-indigo-600 text-white'
            : 'bg-indigo-100 text-indigo-600'
        }`}
      >
        EN
      </button>
    </div>
  );
}