import type { Metadata } from 'next';
import './globals.css';
import Shell from '@/components/Shell';

export const metadata: Metadata = {
  title: 'مدرج | منصة ذكاء كرة القدم',
  description: 'منصة عربية مختلفة لكرة القدم تجمع المباريات، الذاكرة، التحليل والذكاء الاصطناعي.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
