import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  /** First line, in white. */
  title: string;
  /** Second line: `lead` in white, then `accent` in the violet gradient. */
  lead?: string;
  accent: string;
  children?: ReactNode;
};

export default function SectionHeading({ eyebrow, title, lead, accent, children }: SectionHeadingProps) {
  return (
    <div className="mb-11">
      <p className="mb-3 font-landing-mono text-[10px] font-medium tracking-[0.15em] text-lilac uppercase">
        {eyebrow}
      </p>
      <h2 className="text-[34px] leading-[1.02] font-semibold tracking-[-0.035em] text-white sm:text-[53px]">
        {title}
        <br />
        {lead && <>{lead} </>}
        <span className="text-gradient">{accent}</span>
      </h2>
      {children && (
        <p className="mt-[18px] max-w-[600px] text-base leading-relaxed tracking-[-0.01em] text-muted sm:text-lg sm:leading-[1.45]">
          {children}
        </p>
      )}
    </div>
  );
}
