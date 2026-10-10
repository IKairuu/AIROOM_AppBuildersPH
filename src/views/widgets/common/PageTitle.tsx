import type { ReactNode } from "react";

// The big gradient heading at the top of a host page, like "Your Rooms".
export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="w-fit bg-linear-to-r from-white from-35% to-violet-400 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent">
      {children}
    </h1>
  );
}
