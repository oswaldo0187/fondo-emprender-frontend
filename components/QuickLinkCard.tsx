import Link from 'next/link';
import type { ReactNode } from 'react';

interface QuickLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  accentClassName?: string;
}

export default function QuickLinkCard({
  title,
  description,
  href,
  icon,
  accentClassName,
}: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className={`group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${accentClassName ?? ''}`}
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </Link>
  );
}