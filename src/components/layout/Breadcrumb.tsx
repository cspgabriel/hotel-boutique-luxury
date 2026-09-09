import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Trilha de navegação" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-[11px] uppercase tracking-[0.15em] text-hotel-slate-800/60 font-medium">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-hotel-gold-600 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-hotel-slate-800/40" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-hotel-gold-600 transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-hotel-gold-600 font-semibold" aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
