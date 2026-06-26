import { CalendarDemo, MatchGrid, PageTitle, Section } from '@/components/UI';

export default function MatchesPage() {
  return (
    <>
      <PageTitle kicker="المباريات" title="تقويم وتايملاين المباريات" sub="صفحة مباريات حديثة تعتمد على التقويم، الفلاتر، وملخص AI لليوم." />
      <CalendarDemo />
      <Section title="مباريات مختارة">
        <MatchGrid />
      </Section>
    </>
  );
}
