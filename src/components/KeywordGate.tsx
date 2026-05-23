"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HINT_KEYWORD, KEYWORD_1 } from "@/content/clues";
import { matchesKeyword } from "@/lib/normalize";
import { setProgress } from "@/lib/progress";

export function KeywordGate() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!matchesKeyword(value, KEYWORD_1)) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    setProgress("keyword");
    router.push("/juego");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-4">
      <p className="text-center text-sm italic text-rose-800/80">{HINT_KEYWORD}</p>
      <label htmlFor="keyword" className="sr-only">
        Palabra clave
      </label>
      <input
        id="keyword"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        placeholder="Escribe la palabra clave..."
        className="w-full rounded-xl border border-rose-200 bg-white/80 px-4 py-3 text-center text-rose-950 placeholder:text-rose-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
        autoComplete="off"
      />
      {error && (
        <p className="text-center text-sm text-rose-600">
          Esa no es la llave... piensa en nosotros.
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="w-full rounded-xl bg-rose-500 px-4 py-3 font-medium text-white transition hover:bg-rose-600 disabled:opacity-50"
      >
        {loading ? "Abriendo..." : "Abrir el sobre"}
      </button>
    </form>
  );
}
