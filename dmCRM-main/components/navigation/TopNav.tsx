import { Bell, Search, UserCircle } from 'lucide-react';

export function TopNav() {
  return (
    <header className="h-16 border-b border-[#1A1A1A] bg-[#0D0D0D] px-8 flex items-center justify-between shrink-0">
      <h1 className="text-lg font-bold text-white tracking-tight shrink-0 mr-4">Financial Overview</h1>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="relative hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search jobs, invoices..." 
            className="bg-[#111111] border border-[#1A1A1A] rounded-full py-1.5 pl-10 pr-4 text-xs w-64 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors" 
          />
        </div>
        <button className="bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">+</div>
          New Entry
        </button>
      </div>
    </header>
  );
}
