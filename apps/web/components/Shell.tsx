'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, CalendarDays, Flame, Home, Menu, Search, Shield, Trophy, UserRound } from 'lucide-react';

const nav = [
  ['/', 'الرئيسية', Home],
  ['/matches', 'المباريات', CalendarDays],
  ['/clubs', 'الأندية', Shield],
  ['/players', 'اللاعبون', UserRound],
  ['/transfers', 'الانتقالات', Flame],
  ['/history', 'الذاكرة', Trophy],
  ['/ai', 'الذكاء', Brain],
  ['/community', 'المجتمع', Menu],
] as const;

export function Logo() {
  return (
    <Link href="/" className="brand-logo group" aria-label="مدرج">
      <span className="logo-emblem" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img">
          <defs>
            <linearGradient id="modarajLogoGradient" x1="8" x2="58" y1="7" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22e6a8" />
              <stop offset="1" stopColor="#6ee7f9" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="52" height="52" rx="17" fill="url(#modarajLogoGradient)" />
          <path d="M18 39.5c8.3-8.2 19.7-8.2 28 0" fill="none" stroke="#061019" strokeWidth="5" strokeLinecap="round" />
          <path d="M22 24h20M22 31h20" stroke="#061019" strokeWidth="5" strokeLinecap="round" />
          <circle cx="32" cy="46" r="3.4" fill="#061019" />
        </svg>
      </span>
      <span className="leading-none">
        <b className="block text-[1.08rem] font-black tracking-[-.03em] md:text-[1.22rem]">مدرج</b>
        <small className="mt-1 block text-[10px] font-bold text-slate-400 md:text-[11px]">ذكاء كرة القدم</small>
      </span>
    </Link>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/82 backdrop-blur-2xl">
        <div className="container flex h-[72px] items-center gap-4">
          <Logo />
          <nav className="desktop-only flex flex-1 items-center justify-center gap-1">
            {nav.map(([href, label, Icon]) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
                <Icon className="ml-1 inline" size={15} />{label}
              </Link>
            ))}
          </nav>
          <Link href="/search" className="chip desktop-only"><Search size={15} />بحث</Link>
        </div>
      </header>
      <main className="container fade py-7 pb-28">{children}</main>
      <nav className="mobile-nav fixed bottom-3 left-3 right-3 z-50 grid-cols-5 gap-2 rounded-[26px] border border-white/10 bg-[#070b12]/90 p-2 backdrop-blur-2xl lg:hidden">
        {nav.slice(0, 5).map(([href, label, Icon]) => (
          <Link key={href} href={href} className={`grid place-items-center rounded-2xl py-2 text-[11px] font-bold ${pathname === href ? 'bg-emerald-300 text-slate-950' : 'text-slate-400'}`}>
            <Icon size={18} />{label}
          </Link>
        ))}
      </nav>
    </>
  );
}
