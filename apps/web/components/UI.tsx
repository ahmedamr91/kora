'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  Brain,
  CalendarDays,
  Flame,
  Gauge,
  MessageCircle,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { activities, articles, clubs, matchDays, matches, players, stories, topStories, transfers } from '@/lib/data';

type Match = typeof matches[number];

export function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="section-heading">{title}</h2>
          {sub && <p className="mt-1 text-sm text-slate-400 md:text-base">{sub}</p>}
        </div>
        <button className="chip desktop-only">عرض الكل <ArrowLeft size={14} /></button>
      </div>
      {children}
    </section>
  );
}

function Team({ name, code, big = false }: { name: string; code?: string; big?: boolean }) {
  return (
    <div className="grid place-items-center gap-3 text-center">
      <div className={`crest ${big ? 'big real' : ''}`}>{code || name.slice(0, 2)}</div>
      <b className="text-sm md:text-base">{name}</b>
    </div>
  );
}

function Momentum({ values }: { values: number[] }) {
  return (
    <div className="flex h-16 items-end gap-1 rounded-3xl bg-white/[.035] p-3">
      {values.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-full bg-gradient-to-t from-emerald-400 to-sky-300 opacity-90"
          style={{ height: `${Math.max(18, v)}%` }}
        />
      ))}
    </div>
  );
}

export function MatchCard({ m = matches[0], large = false }: { m?: Match; large?: boolean }) {
  return (
    <Link href={`/match/${m.id}`} className={`glass card group block overflow-hidden p-5 transition hover:-translate-y-1 hover:border-emerald-300/30 ${large ? 'min-h-[360px]' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="chip active">{m.league}</span>
        <span className="chip">{m.status} · {m.time}</span>
      </div>
      <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <Team name={m.home} code={m.homeCode} />
        <div>
          <div className="scoreline compact">{m.score}</div>
          <div className="mt-2 text-xs text-slate-500">مركز المباراة</div>
        </div>
        <Team name={m.away} code={m.awayCode} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="metric"><b>{m.prob[0]}%</b><p>فوز الأول</p></div>
        <div className="metric"><b>{m.prob[1]}%</b><p>تعادل</p></div>
        <div className="metric"><b>{m.prob[2]}%</b><p>فوز الثاني</p></div>
      </div>
      <p className="mt-4 rounded-3xl bg-white/[.045] p-4 text-sm leading-7 text-slate-300">{m.mood}</p>
    </Link>
  );
}

export function MatchGrid({ items = matches }: { items?: typeof matches }) {
  return <div className="grid gap-4 lg:grid-cols-3">{items.map((m) => <MatchCard key={m.id} m={m} />)}</div>;
}

export function HomeHero() {
  const featured = matches[0];
  return (
    <section className="hero-shell card p-5 md:p-8">
      <div className="pitch-lines" />
      <div className="hero-layout relative z-10">
        <div className="hero-content order-2 xl:order-1">
          <div className="featured-match-card">
            <div className="flex items-center justify-between gap-3">
              <span className="chip active"><Trophy size={14} />{featured.league}</span>
              <span className="chip">{featured.status} · {featured.time}</span>
            </div>
            <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
              <Team name={featured.home} code={featured.homeCode} big />
              <div>
                <div className="scoreline">{featured.score}</div>
                <div className="mt-2 text-xs font-bold text-slate-500">مركز المباراة</div>
              </div>
              <Team name={featured.away} code={featured.awayCode} big />
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="metric"><b>{featured.stadium}</b><p>الملعب</p></div>
              <div className="metric"><b>xG {featured.xg[0]} - {featured.xg[1]}</b><p>الأهداف المتوقعة</p></div>
              <div className="metric"><b>{featured.possession[0]}% - {featured.possession[1]}%</b><p>الاستحواذ</p></div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_.75fr]">
              <p className="rounded-3xl bg-white/[.045] p-4 text-sm leading-7 text-slate-300">{featured.insight}</p>
              <Momentum values={featured.momentum} />
            </div>
          </div>
        </div>

        <div className="hero-showcase order-1 flex flex-col justify-center xl:order-2">
          <span className="chip active w-fit"><Sparkles size={15} />مدرج — كرة قدم بذكاء عربي</span>
          <h1 className="hero-title mt-5">كرة القدم كما لم تُعرض بالعربية من قبل.</h1>
          <p className="hero-copy mt-4 max-w-2xl">
            تقويم مباريات، مركز مباراة حي، ذاكرة تاريخية، تحليل AI، رادار انتقالات، ومزاج جمهور في تجربة عربية نظيفة وسريعة.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/matches"><CalendarDays size={18} />اختر يوم المباراة</Link>
            <Link className="btn btn-ghost" href={`/match/${featured.id}`}><Brain size={18} />افتح مركز المباراة</Link>
          </div>
          <div className="home-live-panel">
            <div className="live-tile"><b>3 مباشر</b><span>مباريات الآن</span></div>
            <div className="live-tile"><b>12 انتقال</b><span>رادار نشط</span></div>
            <div className="live-tile"><b>5 AI</b><span>تحليلات اليوم</span></div>
            <div className="live-tile"><b>91%</b><span>نبض الجمهور</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LiveActivityFeed() {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="section-heading">نبض مباشر</h2>
          <p className="mt-1 text-sm text-slate-400">بديل حديث لشريط الأخبار التقليدي: أحداث قابلة للقراءة والنقر.</p>
        </div>
        <span className="chip active"><Activity size={14} />مباشر</span>
      </div>
      <div className="activity-strip">
        {activities.map((a) => (
          <div className="activity-card" key={a.title}>
            <span className="chip">{a.tone} {a.type}</span>
            <b>{a.title}</b>
            <p>{a.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TopStories() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {topStories.map((s, i) => (
        <article className="story-card card p-5" key={s.title}>
          <div className="flex items-center justify-between gap-3"><span className="chip active">{s.tag}</span><span className="text-xs text-slate-500">{s.time}</span></div>
          <h3 className="story-heading mt-5">{s.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">قصة مختصرة بتنسيق حديث بدلاً من شريط أخبار متحرك قديم.</p>
          <button className="btn btn-ghost mt-5"><Play size={15} />اقرأ القصة</button>
        </article>
      ))}
    </div>
  );
}

export function HomePulse() {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-4">
      <div className="glass card p-5 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <b className="section-heading"><Activity className="ml-2 inline text-emerald-300" />نبض المدرج</b>
          <span className="chip active">Live</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {['ثقة جماهير الأهلي 91%', 'رادار صلاح +12%', 'الكلاسيكو الأكثر تداولاً'].map((x) => <div className="soft rounded-2xl p-4 text-sm text-slate-300" key={x}>{x}</div>)}
        </div>
      </div>
      <div className="glass card p-5">
        <b className="section-heading"><Gauge className="ml-2 inline text-sky-300" />مؤشر اليوم</b>
        <div className="mt-4 space-y-3 text-sm text-slate-300"><div className="flex justify-between"><span>مباريات مباشرة</span><b>3</b></div><div className="flex justify-between"><span>تحليلات AI</span><b>5</b></div><div className="flex justify-between"><span>قصص ذاكرة</span><b>1</b></div></div>
      </div>
      <div className="glass card p-5">
        <b className="section-heading"><ShieldCheck className="ml-2 inline text-cyan-300" />ميزات حصرية</b>
        <div className="mt-4 flex flex-wrap gap-2">{['بصمة اللاعب', 'فيلم المباراة', 'مزاج الجمهور', 'كشاف AI'].map((x) => <span className="chip" key={x}>{x}</span>)}</div>
      </div>
    </section>
  );
}

export function LiveMatchStrip() {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="section-heading">مباريات اليوم</h2>
          <p className="mt-1 text-sm text-slate-400">نظرة سريعة، ثم افتح اليوم الكامل من صفحة المباريات.</p>
        </div>
        <Link href="/matches" className="chip active">التقويم <ArrowLeft size={14} /></Link>
      </div>
      <div className="match-strip">
        {matches.slice(0, 5).map((m) => (
          <Link href={`/match/${m.id}`} className="strip-card" key={m.id}>
            <span>{m.time} · {m.status}</span>
            <b>{m.home}</b>
            <strong>{m.score}</strong>
            <b>{m.away}</b>
            <em>{m.league}</em>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DNABars({ data = matches[0].dna }: { data?: Record<string, number> }) {
  return (
    <div className="space-y-4">
      {Object.entries(data).map(([k, v]) => (
        <div key={k}>
          <div className="mb-2 flex justify-between text-sm"><b>{k}</b><span className="text-emerald-300">{v}%</span></div>
          <div className="bar"><span style={{ width: `${v}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

export function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState(matchDays[0].date);
  const selectedDay = matchDays.find((d) => d.date === selectedDate) || matchDays[0];
  const selectedMatches = useMemo(() => matches.filter((m) => m.date === selectedDate), [selectedDate]);

  return (
    <div className="glass card p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="section-heading"><CalendarDays className="ml-2 inline text-emerald-300" />اختر يوم المباراة</h3>
          <p className="mt-1 text-sm text-slate-400">اضغط على أي يوم لعرض مبارياته فقط.</p>
        </div>
        <span className="chip active">{selectedDay.weekday} · {selectedDay.date}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {matchDays.map((day) => {
          const count = matches.filter((m) => m.date === day.date).length;
          const active = day.date === selectedDate;
          return (
            <button key={day.date} type="button" onClick={() => setSelectedDate(day.date)} className={`calendar-select ${active ? 'active' : ''}`}>
              <span className="text-xs text-slate-400">{day.label}</span>
              <b className="text-2xl">{day.short}</b>
              <small>{day.weekday}</small>
              <em>{count} مباريات</em>
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        {selectedMatches.length ? <MatchGrid items={selectedMatches} /> : <div className="soft rounded-3xl p-6 text-center text-slate-400">لا توجد مباريات لهذا اليوم.</div>}
      </div>
    </div>
  );
}

export function PlayerGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {players.map((p) => (
        <Link href={`/player/${p.id}`} className="glass card p-5 transition hover:-translate-y-1 hover:border-emerald-300/30" key={p.id}>
          <div className="flex items-start justify-between">
            <div className="team-badge">{p.name[0]}</div>
            <span className="chip text-emerald-300"><TrendingUp size={14} />{p.trend}</span>
          </div>
          <h3 className="card-heading mt-4">{p.name}</h3>
          <p className="text-sm text-slate-400">{p.club} · {p.pos}</p>
          <div className="mt-5 flex items-center justify-between"><b className="text-3xl text-emerald-300">{p.rating}</b><span className="text-xs text-slate-500">بصمة اللاعب</span></div>
          <div className="mt-3 grid grid-cols-5 gap-1">
            {p.dna.map((d, i) => <div key={i} className="h-14 rounded-full bg-white/10" style={{ background: `linear-gradient(to top, rgba(36,240,173,.9) ${d}%, rgba(255,255,255,.08) ${d}%)` }} />)}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ClubGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {clubs.map((c) => (
        <Link href={`/club/${c.id}`} className="glass card p-5 transition hover:-translate-y-1 hover:border-emerald-300/30" key={c.id}>
          <div className="flex justify-between gap-3">
            <div className="team-badge text-emerald-300">{c.name[0]}</div>
            <span className="chip"><Sparkles size={14} />Mood {c.mood}%</span>
          </div>
          <h3 className="card-heading mt-4">{c.name}</h3>
          <p className="text-sm text-slate-400">Form: {c.form}</p>
          <div className="mt-5"><DNABars data={c.dna} /></div>
        </Link>
      ))}
    </div>
  );
}

export function TransferList() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {transfers.map((t) => (
        <div className="glass card p-5" key={t.player}>
          <div className="flex items-center justify-between"><span className="chip"><Flame size={14} />{t.tier}</span><b className="text-2xl text-emerald-300">{t.confidence}%</b></div>
          <h3 className="card-heading mt-4">{t.player}</h3>
          <p className="text-sm text-slate-400">{t.from} ← {t.to}</p>
          <div className="my-4 bar"><span style={{ width: `${t.confidence}%` }} /></div>
          <p className="text-sm leading-7 text-slate-300">{t.reason}</p>
        </div>
      ))}
    </div>
  );
}

export function Stories() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {stories.map((s) => (
        <article className="story-card card p-6" key={s.title}>
          <span className="chip active">{s.tag} · {s.year}</span>
          <h3 className="story-heading mt-5">{s.title}</h3>
          <p className="mt-3 text-sm leading-8 text-slate-300">{s.text}</p>
          <button className="btn btn-ghost mt-5"><Play size={15} />افتح الفيلم الكروي</button>
        </article>
      ))}
    </div>
  );
}

export function ArticleGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {articles.map((a) => <article className="glass card p-5" key={a.title}><span className="chip"><Star size={14} />{a.tag}</span><h3 className="card-heading mt-4">{a.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">محتوى تحليلي قابل للإدارة لاحقاً من Admin Studio ومرتبط بالبيانات الحية.</p></article>)}
    </div>
  );
}

export function AdminPreview() {
  return <div className="grid gap-4 lg:grid-cols-4">{['المباريات', 'المقالات', 'اللاعبون', 'ذاكرة المباراة', 'الانتقالات', 'التوقعات', 'المجتمع', 'الإعدادات'].map((x, i) => <div className="glass card p-5" key={x}><span className="chip">{i + 1}</span><h3 className="card-heading mt-4">{x}</h3><p className="mt-2 text-sm text-slate-400">إدارة ديناميكية Demo الآن، API لاحقاً.</p></div>)}</div>;
}

export function CommunityBlocks() {
  return <div className="grid gap-4 lg:grid-cols-3">{['من يفوز بالكلاسيكو؟', 'أفضل لاعب عربي هذا الأسبوع؟', 'هل يحتاج الأهلي لمهاجم؟'].map((q, i) => <div className="glass card p-5" key={q}><span className="chip"><MessageCircle size={14} />استطلاع</span><h3 className="card-heading mt-4">{q}</h3><div className="mt-4 space-y-3"><div><b>اختيار الجمهور</b><div className="bar mt-2"><span style={{ width: `${70 - i * 12}%` }} /></div></div><div><b>الرأي الآخر</b><div className="bar mt-2"><span style={{ width: `${30 + i * 12}%` }} /></div></div></div></div>)}</div>;
}

export function AIInsightPanel() {
  const m = matches[0];
  return (
    <div className="glass card p-5">
      <div className="flex items-center justify-between"><b><Brain className="ml-2 inline text-emerald-300" />نبض المباراة بالذكاء</b><span className="chip active">مباشر</span></div>
      <p className="mt-4 text-sm leading-8 text-slate-300">{m.insight}</p>
      <div className="mt-4"><DNABars data={m.dna} /></div>
    </div>
  );
}

export function IntelligenceRail() {
  return <HomePulse />;
}

export function QuickSearch() {
  return <div className="glass card flex items-center gap-3 p-4"><Search size={18} className="text-emerald-300" /><input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="ابحث عن فريق، لاعب، مباراة أو قصة..." /></div>;
}

export function PageTitle({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <section className="glass card mb-6 overflow-hidden p-6 md:p-8">
      <div className="pitch-lines" />
      <div className="relative z-10 max-w-3xl">
        {kicker && <span className="chip active">{kicker}</span>}
        <h1 className="page-heading mt-4">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-400 md:text-base">{sub}</p>}
      </div>
    </section>
  );
}
