import {
  AIInsightPanel,
  ArticleGrid,
  CalendarDemo,
  ClubGrid,
  HomeHero,
  HomePulse,
  LiveActivityFeed,
  LiveMatchStrip,
  PlayerGrid,
  Section,
  Stories,
  TopStories,
  TransferList,
} from '@/components/UI';

export default function Home() {
  return (
    <>
      <HomeHero />
      <LiveActivityFeed />
      <LiveMatchStrip />
      <Section title="تقويم المباريات" sub="اختر اليوم وشاهد المباريات الخاصة به فوراً">
        <CalendarDemo />
      </Section>
      <Section title="أهم القصص" sub="بديل حديث لشريط الأخبار التقليدي">
        <TopStories />
      </Section>
      <HomePulse />
      <Section title="تحليل اليوم" sub="ملخص AI سريع قبل الدخول إلى مركز المباراة الكامل">
        <AIInsightPanel />
      </Section>
      <Section title="نجوم تحت المجهر" sub="بصمة اللاعب بدل عرض أرقام مكررة">
        <PlayerGrid />
      </Section>
      <Section title="الأندية ونبض الجمهور">
        <ClubGrid />
      </Section>
      <Section title="رادار الانتقالات الذكي">
        <TransferList />
      </Section>
      <Section title="ذاكرة المباراة" sub="قصص تاريخية وأفلام كروية تجعل الموقع مختلفاً عن المواقع التقليدية">
        <Stories />
      </Section>
      <Section title="قراءات وتحليلات">
        <ArticleGrid />
      </Section>
    </>
  );
}
