"use client";

import { useState } from "react";
import { HINT_DATE, RELATIONSHIP_DATE } from "@/content/clues";
import { matchesDate } from "@/lib/normalize";
import { setProgress } from "@/lib/progress";

type DateGateProps = {
  onSuccess?: () => void;
};

export function DateGate({ onSuccess }: DateGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { day, month, year } = RELATIONSHIP_DATE;
    if (!matchesDate(value, day, month, year)) {
      setError(true);
      return;
    }
    setError(false);
    setProgress("date");
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <p className="text-center text-sm italic text-rose-800/80">{HINT_DATE}</p>
      <label htmlFor="date" className="sr-only">
        Fecha de inicio
      </label>
      <input
        id="date"
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        placeholder="DDMMAAAA"
        className="w-full rounded-xl border border-rose-200 bg-white/80 px-4 py-3 text-center text-rose-950 placeholder:text-rose-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
        autoComplete="off"
      />
      {error && (
        <p className="text-center text-sm text-rose-600">
          Esa fecha no abre esta cerradura...
        </p>
      )}
      <button
        type="submit"
        disabled={!value.trim()}
        className="w-full rounded-xl bg-rose-500 px-4 py-3 font-medium text-white transition hover:bg-rose-600 disabled:opacity-50"
      >
        Seguir
      </button>
    </form>
  );
}
