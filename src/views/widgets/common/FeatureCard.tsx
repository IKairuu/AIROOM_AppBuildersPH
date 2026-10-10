import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

type FeatureCardProps = {
  icon: IconName;
  title: string;
  children: ReactNode;
  iconClassName?: string;
  footer?: ReactNode;
};

export default function FeatureCard({ icon, title, children, iconClassName = "text-lilac", footer }: FeatureCardProps) {
  return (
    <div className="flex w-full flex-col rounded-[20px] border border-card-line bg-card p-5 transition-colors hover:border-white/12">
      <Icon name={icon} className={`size-[22px] ${iconClassName}`} />
      <h3 className="mt-[15px] text-[17px] leading-6 font-semibold tracking-[-0.03em] text-white">{title}</h3>
      <p className="mt-1.5 text-sm leading-[21px] tracking-[-0.02em] text-muted">{children}</p>
      {footer && <div className="mt-auto pt-[17px]">{footer}</div>}
    </div>
  );
}
