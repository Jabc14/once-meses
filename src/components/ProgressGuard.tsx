"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  getProgress,
  getServerProgress,
  isStepAtLeast,
  subscribeProgress,
  type ProgressStep,
} from "@/lib/progress";

type ProgressGuardProps = {
  required: ProgressStep;
  redirectTo: string;
  children: React.ReactNode;
};

function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-rose-600">
      ...
    </div>
  );
}

export function ProgressGuard({ required, redirectTo, children }: ProgressGuardProps) {
  const router = useRouter();
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgress,
    getServerProgress,
  );
  const allowed = isStepAtLeast(progress, required);

  useEffect(() => {
    if (!allowed) {
      router.replace(redirectTo);
    }
  }, [allowed, redirectTo, router]);

  if (!allowed) {
    return <Loading />;
  }

  return <>{children}</>;
}
