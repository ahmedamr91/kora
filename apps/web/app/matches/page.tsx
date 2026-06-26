import { CalendarDemo, PageTitle } from '@/components/UI';

export default function MatchesPage() {
  return (
    <>
      <PageTitle kicker="المباريات" title="تقويم المباريات" sub="اختر اليوم الذي تريده، وسيتم عرض مباريات هذا اليوم فقط مع إمكانية فتح مركز المباراة." />
      <CalendarDemo />
    </>
  );
}
