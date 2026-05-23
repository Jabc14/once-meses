"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Envelope } from "@/components/Envelope";
import { KeywordGate } from "@/components/KeywordGate";
import { PageShell } from "@/components/PageShell";
import { CARD_MESSAGE } from "@/content/clues";
import {
  getProgress,
  getServerProgress,
  isStepAtLeast,
  subscribeProgress,
} from "@/lib/progress";

function Loading() {
  return (
    <PageShell>
      <p className="text-rose-600">...</p>
    </PageShell>
  );
}

export function HomeClient() {
  const router = useRouter();
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgress,
    getServerProgress,
  );

  useEffect(() => {
    if (isStepAtLeast(progress, "complete")) {
      router.replace("/poema");
    } else if (isStepAtLeast(progress, "keyword")) {
      router.replace("/juego");
    }
  }, [progress, router]);

  if (progress !== "none" && isStepAtLeast(progress, "keyword")) {
    return <Loading />;
  }

  return (
    <PageShell step={1}>
      <Envelope />
      <h1 className="mt-8 text-center font-poem text-4xl text-rose-950">11 meses</h1>
      <p className="mt-3 max-w-sm text-center text-rose-800/90">{CARD_MESSAGE}</p>
      <KeywordGate />
    </PageShell>
  );
}
