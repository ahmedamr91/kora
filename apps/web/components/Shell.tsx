'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, CalendarDays, Flame, Home, LayoutDashboard, Menu, Search, Shield, Trophy, UserRound } from 'lucide-react';

const nav = [
  ['/', 'الرئيسية', Home],
  ['/matches', 'المباريات', CalendarDays],
  ['/clubs', 'الأندية', Shield],
  ['/players', 'اللاعبون', UserRound],
  ['/transfers', 'الانتقالات', Flame],
  ['/history', 'الذاكرة', Trophy],
  ['/ai', 'مركز AI', Brain],
  ['/community', 'المجتمع', Menu],
  ['/admin', 'Studio', LayoutDashboard],
] as const;

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="logo-mark"><span>م</span></span>
      <span>
        <b className="block text-xl font-black tracking-tight">مدرج</b>
        <small className="block text-[11px] font-bold text-slate-400">منصة ذكاء كرة القدم</small>
      </span>
    </Link>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/82 backdrop-blur-2xl">
        <div className="container flex h-[76px] items-center gap-5">
          <Logo />
          <nav className="desktop-only flex flex-1 items-center justify-center gap-1">
            {nav.slice(0, 8).map(([href, label, Icon]) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
                <Icon className="ml-1 inline" size={16} />{label}
              </Link>
            ))}
          </nav>
          <Link href="/search" className="chip desktop-only"><Search size={16} />بحث</Link>
          <Link href="/admin" className="btn btn-primary desktop-only">Admin Studio</Link>
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
