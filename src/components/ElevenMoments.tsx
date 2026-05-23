"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { HINT_MOMENTS } from "@/content/clues";
import { MOMENTS, type Moment } from "@/content/moments";
import { setProgress } from "@/lib/progress";

function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isCorrectOrder(items: Moment[]): boolean {
  return items.every((m, i) => m.id === i + 1);
}

export function ElevenMoments() {
  const router = useRouter();
  const [items, setItems] = useState<Moment[]>(() => shuffle(MOMENTS));
  const [error, setError] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const move = useCallback((from: number, to: number) => {
    if (from === to) return;
    setItems((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(to, 0, removed);
      return next;
    });
    setError(false);
  }, []);

  function handleVerify() {
    if (!isCorrectOrder(items)) {
      setError(true);
      return;
    }
    setProgress("moments");
    setProgress("complete");
    router.push("/poema");
  }

  return (
    <div className="w-full max-w-lg space-y-4">
      <p className="text-center text-sm italic text-rose-800/80">{HINT_MOMENTS}</p>
      <ol className="space-y-2">
        {items.map((moment, index) => (
          <li
            key={moment.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) move(dragIndex, index);
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
            className={`flex cursor-grab items-start gap-3 rounded-xl border border-rose-200 bg-white/90 p-3 shadow-sm active:cursor-grabbing ${
              dragIndex === index ? "opacity-60" : ""
            }`}
          >
            {moment.image ? (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`/meses/${moment.image}`}
                  alt={moment.label}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700">
                {index + 1}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-rose-900">{moment.label}</p>
              <p className="text-sm text-rose-700/90">{moment.description}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                aria-label="Subir"
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
                className="rounded px-2 py-0.5 text-rose-600 hover:bg-rose-50 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                aria-label="Bajar"
                disabled={index === items.length - 1}
                onClick={() => move(index, index + 1)}
                className="rounded px-2 py-0.5 text-rose-600 hover:bg-rose-50 disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      {error && (
        <p className="text-center text-sm text-rose-600">
          El orden no cuenta nuestra historia todavía. Del mes 1 al 11.
        </p>
      )}
      <button
        type="button"
        onClick={handleVerify}
        className="w-full rounded-xl bg-rose-500 px-4 py-3 font-medium text-white transition hover:bg-rose-600"
      >
        Esta es nuestra historia
      </button>
    </div>
  );
}
