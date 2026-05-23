"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { DateGate } from "@/components/DateGate";
import { ElevenMoments } from "@/components/ElevenMoments";
import { PageShell } from "@/components/PageShell";
import { ProgressGuard } from "@/components/ProgressGuard";
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

export function JuegoClient() {
  const router = useRouter();
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgress,
    getServerProgress,
  );
  const phase = isStepAtLeast(progress, "date") ? "moments" : "date";

  useEffect(() => {
    if (isStepAtLeast(progress, "complete")) {
      router.replace("/poema");
    }
  }, [progress, router]);

  if (isStepAtLeast(progress, "complete")) {
    return <Loading />;
  }

  return (
    <ProgressGuard required="keyword" redirectTo="/">
      <PageShell step={phase === "date" ? 2 : 3}>
        <h1 className="text-center font-poem text-3xl text-rose-950">
          {phase === "date" ? "Segunda llave" : "Nuestra historia"}
        </h1>
        <p className="mt-2 text-center text-sm text-rose-700/80">
          {phase === "date"
            ? "El día en que todo empezó."
            : "Once meses, once momentos."}
        </p>
        <div className="mt-8 flex w-full justify-center">
          {phase === "date" ? (
            <DateGate />
          ) : (
            <ElevenMoments />
          )}
        </div>
      </PageShell>
    </ProgressGuard>
  );
}
