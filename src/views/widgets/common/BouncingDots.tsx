// Three dots that bounce one after another, for "waiting" and "thinking".
export default function BouncingDots({ label, className = "bg-zinc-400" }: { label?: string; className?: string }) {
  return (
    <span className="flex items-center gap-1" role={label ? "status" : undefined} aria-label={label}>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className={`size-1.5 animate-bounce rounded-full ${className}`}
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
