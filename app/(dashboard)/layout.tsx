import { Sidebar } from '@/components/navigation/Sidebar';
import { TopNav } from '@/components/navigation/TopNav';
import { QuickAddFAB } from '@/components/QuickAddFAB';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0D0D0D] text-gray-100 flex-col md:flex-row overflow-hidden font-sans">
      <div className="hidden md:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 relative">
        <TopNav />
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl relative pb-24">
            {children}
          </div>
        </main>
        <QuickAddFAB />
      </div>
    </div>
  );
}
