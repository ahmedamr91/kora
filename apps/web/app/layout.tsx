import './globals.css';import Shell from '@/components/Shell';
export const metadata={title:'مدرج - منصة ذكاء كرة القدم',description:'Arabic football intelligence platform'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='ar' dir='rtl'><body><Shell>{children}</Shell></body></html>}
