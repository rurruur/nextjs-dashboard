import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from './ui/dashboard/sidenav';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        {/* <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          {children}
        </div> */}
      </body>
    </html>
  );
}