"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { LAUNCH_CHECKS_ENABLED } from "@/lib/constants/features";
import { HOST_HREF } from "@/lib/constants/routes";
import { useLaunchStore } from "@/state/launch-store";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./ButtonLink";

type LaunchButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

// Opens the launch checks dialog (rendered once by the start page), or goes
// straight to the dashboard while the checks are switched off.
export default function LaunchButton({ variant = "primary", size = "md", className = "", children }: LaunchButtonProps) {
  const router = useRouter();
  const openDialog = useLaunchStore((s) => s.openDialog);
  const markLaunched = useLaunchStore((s) => s.markLaunched);

  const launch = () => {
    if (LAUNCH_CHECKS_ENABLED) return openDialog();
    markLaunched();
    router.push(HOST_HREF);
  };

  return (
    <button type="button" onClick={launch} className={`cursor-pointer ${buttonClasses(variant, size)} ${className}`}>
      {children}
    </button>
  );
}
