export type ProgressStep = "none" | "keyword" | "date" | "moments" | "complete";

const STORAGE_KEY = "once-meses-progress";

export function getProgress(): ProgressStep {
  if (typeof window === "undefined") return "none";
  const value = localStorage.getItem(STORAGE_KEY);
  if (
    value === "keyword" ||
    value === "date" ||
    value === "moments" ||
    value === "complete"
  ) {
    return value;
  }
  return "none";
}

export function setProgress(step: ProgressStep): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, step);
  window.dispatchEvent(new Event("once-meses-progress-updated"));
}

export function subscribeProgress(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("once-meses-progress-updated", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("once-meses-progress-updated", handler);
  };
}

export function getServerProgress(): ProgressStep {
  return "none";
}

export function isStepAtLeast(current: ProgressStep, required: ProgressStep): boolean {
  const order: ProgressStep[] = ["none", "keyword", "date", "moments", "complete"];
  return order.indexOf(current) >= order.indexOf(required);
}
