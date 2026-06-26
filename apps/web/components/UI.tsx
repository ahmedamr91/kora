'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { matches, matchDays, players, transfers, stories, clubs, articles } from '@/lib/data';
import { Activity, ArrowLeft, Brain, CalendarDays, Flame, MessageCircle, ShieldCheck, Sparkles, Star, TrendingUp } from 'lucide-react';

export function PageTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <span className="chip active">{kicker}</span>
      <h1 className="mt-4 text-3xl font-black tracking-[-.035em] md:text-5xl">{title}</h1>
      {sub && <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">{sub}</p>}
    </div>
  );
}

export function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-[-.025em] md:text-2xl">{title}</h2>
          {sub && <p className="mt-1 text-sm text-slate-400 md:text-base">{sub}</p>}
        </div>
        <button className="chip desktop-only">عرض الكل <ArrowLeft size={14} /></button>
      </div>
      {children}
    </section>
  );
}

function Team({ name, code }: { name: string; code?: string }) {
  return (
    <div className="grid place-items-center gap-3 text-center">
      <div className="team-badge">{code || name.slice(0, 1)}</div>
      <b className="text-base md:text-lg">{name}</b>
    </div>
  );
}

export function MatchCard({ m = matches[0], large = false }: { m?: any; large?: boolean }) {
  return (
    <Link href={`/match/${m.id}`} className={`glass card block overflow-hidden p-5 transition hover:-translate-y-1 hover:border-emerald-300/30 ${large ? 'min-h-[350px]' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="chip active">{m.league}</span>
        <span className="chip">{m.status} · {m.time}</span>
      </div>
      <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <Team name={m.home} code={m.homeCode} />
        <div>
          <div className="text-3xl font-black md:text-4xl">{m.score}</div>
          <div className="mt-2 text-xs text-slate-500">مركز المباراة</div>
        </div>
        <Team name={m.away} code={m.awayCode} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="metric"><b>{m.prob[0]}%</b><p className="text-slate-500">فوز الأول</p></div>
        <div className="metric"><b>{m.prob[1]}%</b><p className="text-slate-500">تعادل</p></div>
        <div className="metric"><b>{m.prob[2]}%</b><p className="text-slate-500">فوز الثاني</p></div>
      </div>
      <p className="mt-4 rounded-3xl bg-white/[.045] p-4 text-sm leading-7 text-slate-300">{m.mood}</p>
    </Link>
  );
}

export function MatchGrid({ items = matches }: { items?: typeof matches }) {
  return <div className="grid gap-4 lg:grid-cols-3">{items.map((m) => <MatchCard key={m.id} m={m} />)}</div>;
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

export function PlayerGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {players.map((p) => (
        <Link href={`/player/${p.id}`} className="glass card p-5 transition hover:-translate-y-1 hover:border-emerald-300/30" key={p.id}>
          <div className="flex items-start justify-between">
            <div className="team-badge">{p.name[0]}</div>
            <span className="chip text-emerald-300"><TrendingUp size={14} />{p.trend}</span>
          </div>
          <h3 className="mt-4 text-xl font-black">{p.name}</h3>
          <p className="text-sm text-slate-400">{p.club} · {p.pos}</p>
          <div className="mt-5 flex items-center justify-between"><b className="text-3xl text-emerald-300">{p.rating}</b><span className="text-xs text-slate-500">بصمة اللاعب</span></div>
          <div className="mt-3 grid grid-cols-5 gap-1">
            {p.dna.map((d, i) => <div key={i} className="h-14 rounded-full bg-white/10" style={{ background: `linear-gradient(to top, rgba(34,230,168,.9) ${d}%, rgba(255,255,255,.08) ${d}%)` }} />)}
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
          <h3 className="mt-4 text-2xl font-black">{c.name}</h3>
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
          <h3 className="mt-4 text-2xl font-black">{t.player}</h3>
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
        <article className="hero-card card p-6" key={s.title}>
          <span className="chip active">{s.tag} · {s.year}</span>
          <h3 className="mt-5 text-2xl font-black md:text-3xl">{s.title}</h3>
          <p className="mt-3 text-sm leading-8 text-slate-300">{s.text}</p>
          <button className="btn btn-ghost mt-5">افتح الفيلم الكروي</button>
        </article>
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
          <h3 className="text-xl font-black md:text-2xl"><CalendarDays className="ml-2 inline text-emerald-300" />اختر يوم المباراة</h3>
          <p className="mt-1 text-sm text-slate-400">اضغط على أي يوم لعرض مبارياته فقط.</p>
        </div>
        <span className="chip active">{selectedDay.weekday} · {selectedDay.date}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {matchDays.map((day) => {
          const count = matches.filter((m) => m.date === day.date).length;
          const active = day.date === selectedDate;
          return (
            <button
              key={day.date}
              type="button"
              onClick={() => setSelectedDate(day.date)}
              className={`calendar-select ${active ? 'active' : ''}`}
            >
              <span className="text-xs text-slate-400">{day.label}</span>
              <b className="text-2xl">{day.short}</b>
              <small>{day.weekday}</small>
              <em>{count} مباريات</em>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {selectedMatches.length ? (
          <MatchGrid items={selectedMatches} />
        ) : (
          <div className="soft rounded-3xl p-6 text-center text-slate-400">لا توجد مباريات لهذا اليوم.</div>
        )}
      </div>
    </div>
  );
}

export function IntelligenceRail() {
  return (
    <aside className="sidebar desktop-only space-y-4">
      <div className="glass card p-5"><h3 className="text-xl font-black"><Activity className="ml-2 inline text-emerald-300" />نبض المدرج</h3><div className="mt-4 space-y-3">{['ثقة جماهير الأهلي 91%', 'رادار صلاح +12%', 'الكلاسيكو الأكثر تداولاً'].map((x) => <div className="soft rounded-2xl p-3 text-sm text-slate-300" key={x}>{x}</div>)}</div></div>
      <div className="glass card p-5"><h3 className="text-xl font-black"><ShieldCheck className="ml-2 inline text-cyan-300" />ميزات حصرية</h3><div className="mt-4 flex flex-wrap gap-2">{['بصمة اللاعب', 'فيلم المباراة', 'مزاج الجمهور', 'كشاف AI', 'ذاكرة المباراة'].map((x) => <span className="chip" key={x}>{x}</span>)}</div></div>
    </aside>
  );
}

export function ArticleGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {articles.map((a) => <article className="glass card p-5" key={a.title}><span className="chip"><Star size={14} />{a.tag}</span><h3 className="mt-4 text-2xl font-black">{a.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">محتوى تحليلي قابل للإدارة لاحقاً من Admin Studio ومرتبط بالبيانات الحية.</p></article>)}
    </div>
  );
}

export function AdminPreview() {
  return <div className="grid gap-4 lg:grid-cols-4">{['المباريات', 'المقالات', 'اللاعبون', 'ذاكرة المباراة', 'الانتقالات', 'التوقعات', 'المجتمع', 'الإعدادات'].map((x, i) => <div className="glass card p-5" key={x}><span className="chip">{i + 1}</span><h3 className="mt-4 text-2xl font-black">{x}</h3><p className="mt-2 text-sm text-slate-400">إدارة ديناميكية Demo الآن، API لاحقاً.</p></div>)}</div>;
}

export function CommunityBlocks() {
  return <div className="grid gap-4 lg:grid-cols-3">{['من يفوز بالكلاسيكو؟', 'أفضل لاعب عربي هذا الأسبوع؟', 'هل يحتاج الأهلي لمهاجم؟'].map((q, i) => <div className="glass card p-5" key={q}><span className="chip"><MessageCircle size={14} />استطلاع</span><h3 className="mt-4 text-2xl font-black">{q}</h3><div className="mt-4 space-y-3"><div><b>اختيار الجمهور</b><div className="bar mt-2"><span style={{ width: `${70 - i * 12}%` }} /></div></div><div><b>الرأي الآخر</b><div className="bar mt-2"><span style={{ width: `${30 + i * 12}%` }} /></div></div></div></div>)}</div>;
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
