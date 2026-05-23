export function PageShell({
  children,
  step,
}: {
  children: React.ReactNode;
  step?: number;
}) {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center px-4 py-10">
      {step !== undefined && (
        <p className="mb-6 text-xs uppercase tracking-widest text-rose-500">
          Paso {step} de 3
        </p>
      )}
      {children}
    </main>
  );
}
