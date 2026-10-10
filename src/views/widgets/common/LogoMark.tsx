type LogoMarkProps = {
  className?: string;
};

// An open doorway with someone inside: the room.
export default function LogoMark({ className = "size-5" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 21V11a7 7 0 0 1 14 0v10" />
      <path d="M12 14v4" />
      <circle cx="12" cy="10.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
