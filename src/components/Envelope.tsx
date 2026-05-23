export function Envelope({ open }: { open?: boolean }) {
  return (
    <div
      className="relative mx-auto h-32 w-48"
      aria-hidden
    >
      <div
        className={`absolute inset-x-0 bottom-0 h-24 rounded-b-lg bg-rose-200/80 shadow-md transition-transform duration-700 ${
          open ? "translate-y-1" : ""
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-12 h-16 origin-bottom bg-rose-300/90 transition-transform duration-700 ${
          open ? "scale-y-0 opacity-0" : "scale-y-100"
        }`}
        style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
      />
      <div className="absolute inset-x-4 bottom-4 flex h-16 items-center justify-center rounded bg-cream-50/90 text-2xl">
        ♥
      </div>
    </div>
  );
}
