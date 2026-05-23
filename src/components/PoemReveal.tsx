"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { POEMA_CLOSING, POEMA_LINES } from "@/content/poema";

function ScrollHint({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-rose-600 transition-opacity duration-500"
      aria-hidden
    >
      <span className="text-xs font-medium tracking-wide text-rose-700/90">
        Desliza hacia abajo
      </span>
      <svg
        className="h-7 w-7 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
}

function PoemLine({
  line,
  index,
  isLast,
  onReveal,
  revealed,
}: {
  line: string;
  index: number;
  isLast: boolean;
  onReveal: (index: number) => void;
  revealed: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReveal(index);
      },
      { threshold: 0.45, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onReveal]);

  return (
    <p
      ref={ref}
      className={`min-h-[2.75rem] scroll-mt-28 transition-all duration-700 ease-out ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${isLast ? "mt-10 text-center text-xl font-semibold text-rose-700" : ""}`}
    >
      {line}
    </p>
  );
}

export function PoemReveal() {
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());
  const [copied, setCopied] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const confettiDone = useRef(false);
  const allRevealed = revealed.size >= POEMA_LINES.length;

  const revealLine = useCallback((index: number) => {
    setRevealed((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    if (index === POEMA_LINES.length - 1 && !confettiDone.current) {
      confettiDone.current = true;
      const duration = 2500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ["#f9a8d4", "#fda4af", "#fecdd3"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ["#f9a8d4", "#fda4af", "#fecdd3"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(POEMA_LINES.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const showScrollHint =
    !allRevealed && (!hasScrolled || revealed.size < 2);

  return (
    <div className="relative w-full max-w-lg pb-32">
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-widest text-rose-600">11 meses</p>
        <h1 className="font-poem mt-2 text-3xl text-rose-950">Para ti</h1>
        
      </header>

      <div className="space-y-6 font-poem text-lg leading-relaxed text-rose-900">
        {POEMA_LINES.map((line, i) => (
          <PoemLine
            key={i}
            line={line}
            index={i}
            isLast={i === POEMA_LINES.length - 1}
            onReveal={revealLine}
            revealed={revealed.has(i)}
          />
        ))}
      </div>

      {allRevealed && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-center text-sm text-rose-600/90">
            Te quiero. Felices once meses.
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-xl border border-rose-300 bg-white/80 px-6 py-2 text-sm text-rose-800 transition hover:bg-rose-50"
          >
            {copied ? "¡Copiado!" : "Copiar poema"}
          </button>
        </div>
      )}

      <ScrollHint visible={showScrollHint} />
      <p className="sr-only">{POEMA_CLOSING}</p>
    </div>
  );
}
