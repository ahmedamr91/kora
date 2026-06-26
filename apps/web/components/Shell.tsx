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
        <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="modarajMark" x1="10" x2="54" y1="8" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#20e6a4" />
              <stop offset="0.55" stopColor="#7cf7d0" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <rect x="7" y="7" width="50" height="50" rx="18" fill="rgba(3,7,18,.66)" />
          <path d="M19 42c4.9-8.4 21.1-8.4 26 0" fill="none" stroke="url(#modarajMark)" strokeWidth="5.4" strokeLinecap="round" />
          <path d="M21 25h22M21 32h18" stroke="url(#modarajMark)" strokeWidth="5.4" strokeLinecap="round" />
          <circle cx="45" cy="32" r="3.2" fill="url(#modarajMark)" />
          <path d="M32 15v8" stroke="rgba(255,255,255,.52)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <b className="brand-word">مدرج</b>
        <small className="brand-subtitle">منصة ذكاء كرة القدم</small>
      </span>
    </Link>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <header className="site-header">
        <div className="container flex h-[70px] items-center gap-4">
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
