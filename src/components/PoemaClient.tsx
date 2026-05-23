"use client";

import { PoemReveal } from "@/components/PoemReveal";
import { PageShell } from "@/components/PageShell";
import { ProgressGuard } from "@/components/ProgressGuard";

export function PoemaClient() {
  return (
    <ProgressGuard required="complete" redirectTo="/">
      <PageShell>
        <PoemReveal />
      </PageShell>
    </ProgressGuard>
  );
}
