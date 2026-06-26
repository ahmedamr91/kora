import { AIInsightPanel, ArticleGrid, ClubGrid, IntelligenceRail, MatchCard, MatchGrid, PlayerGrid, Section, Stories, TransferList } from '@/components/UI';
import { matches } from '@/lib/data';
import { Brain, CalendarDays, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div>
        <section className="hero-card card p-6 md:p-9">
          <div className="relative z-10 grid gap-8 xl:grid-cols-[1.08fr_.92fr]">
            <div className="flex flex-col justify-center">
              <span className="chip active w-fit"><Sparkles size={15} />منصة عربية مختلفة لكرة القدم</span>
              <h1 className="hero-title mt-5 font-black">مدرج يحوّل كرة القدم إلى تجربة ذكية.</h1>
              <p className="mt-5 max-w-2xl text-base leading-9 text-slate-300 md:text-lg">
                مباريات، ذاكرة، تحليل، ذكاء اصطناعي، توقعات ومزاج الجمهور في تجربة عربية نظيفة وسريعة.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="/matches"><CalendarDays size={18} />افتح المباريات</a>
                <a className="btn btn-ghost" href="/ai"><Brain size={18} />مركز AI</a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                <div className="metric"><b className="text-2xl">18+</b><p className="text-sm text-slate-500">ميزة فريدة</p></div>
                <div className="metric"><b className="text-2xl">AI</b><p className="text-sm text-slate-500">تحليل مباشر</p></div>
                <div className="metric"><b className="text-2xl">RTL</b><p className="text-sm text-slate-500">عربي أولاً</p></div>
                <div className="metric"><b className="text-2xl">Live</b><p className="text-sm text-slate-500">جاهز للـ API</p></div>
              </div>
            </div>
            <div className="space-y-4">
              <MatchCard m={matches[0]} large />
              <AIInsightPanel />
            </div>
          </div>
        </section>

        <Section title="مباريات اليوم" sub="بطاقات تنقل المستخدم إلى Match Center كامل">
          <MatchGrid />
        </Section>
        <Section title="نجوم تحت المجهر" sub="Football Genome بدل عرض أرقام مملة">
          <PlayerGrid />
        </Section>
        <Section title="الأندية ونبض الجمهور">
          <ClubGrid />
        </Section>
        <Section title="رادار الانتقالات الذكي">
          <TransferList />
        </Section>
        <Section title="Football Netflix / ذاكرة المباراة">
          <Stories />
        </Section>
        <Section title="تحليلات تحريرية">
          <ArticleGrid />
        </Section>
      </div>
      <IntelligenceRail />
    </div>
  );
}
