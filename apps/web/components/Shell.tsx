'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Brain,
  CalendarDays,
  Flame,
  HelpCircle,
  Home,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  Star,
  Trophy,
  UserRound,
  X,
} from 'lucide-react';

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

const drawerExtras = [
  ['/search', 'البحث المتقدم', Search],
  ['/profile', 'المفضلة', Star],
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

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle('drawer-open', open);
    return () => document.body.classList.remove('drawer-open');
  }, [open]);

  return (
    <div className={`mobile-drawer-wrap ${open ? 'open' : ''}`} aria-hidden={!open}>
      <button className="mobile-drawer-backdrop" onClick={onClose} aria-label="إغلاق القائمة" />
      <aside className="mobile-drawer" role="dialog" aria-modal="true" aria-label="قائمة مدرج">
        <div className="drawer-top">
          <Logo />
          <button className="drawer-close" onClick={onClose} aria-label="إغلاق القائمة">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-profile">
          <div>
            <b>أهلاً بك في مدرج</b>
            <span>اختر فريقك المفضل قريباً لتخصيص التجربة.</span>
          </div>
          <span className="drawer-profile-mark">M</span>
        </div>

        <nav className="drawer-nav" aria-label="روابط الهاتف">
          {[...nav, ...drawerExtras].map(([href, label, Icon]) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={onClose} className={`drawer-link ${active ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="drawer-actions">
          <button type="button" className="drawer-action">
            <Moon size={17} />
            <span>الوضع الداكن</span>
          </button>
          <button type="button" className="drawer-action">
            <Settings size={17} />
            <span>الإعدادات</span>
          </button>
          <button type="button" className="drawer-action">
            <HelpCircle size={17} />
            <span>المساعدة</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          <button type="button" className="mobile-menu-button mobile-only" onClick={() => setDrawerOpen(true)} aria-label="فتح القائمة">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="container fade py-7 pb-28">{children}</main>

      <nav className="mobile-nav fixed bottom-3 left-3 right-3 z-40 grid-cols-5 gap-1.5 rounded-[26px] border border-white/10 bg-[#070b12]/90 p-1.5 backdrop-blur-2xl lg:hidden" aria-label="التنقل السريع">
        {nav.slice(0, 5).map(([href, label, Icon]) => (
          <Link key={href} href={href} className={`mobile-nav-item ${pathname === href ? 'active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
