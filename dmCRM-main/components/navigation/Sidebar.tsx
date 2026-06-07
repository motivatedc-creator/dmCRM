'use client';

import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  FileText,
  FileSpreadsheet,
  Package,
  Receipt,
  CreditCard,
  BarChart4,
  Factory
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Vehicles', href: '/vehicles', icon: Car },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Quotations', href: '/quotations', icon: FileSpreadsheet },
  { name: 'Reports', href: '/diagnostic-reports', icon: FileText },
  { name: 'Inventory', href: '/inventory', icon: Package },
];

const bookkeepingItems = [
  { name: 'Expenses', href: '/expenses', icon: Receipt },
  { name: 'Vendors', href: '/vendors', icon: Factory },
  { name: 'Bills & Payments', href: '/bills', icon: CreditCard },
  { name: 'P&L Reports', href: '/reports', icon: BarChart4 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-60 flex-col bg-[#111111] border-r border-[#1A1A1A] h-full text-gray-300">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#A855F7] rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase text-white">Driver<span className="text-[#A855F7]">Balance</span></span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 space-y-1">
        <div className="text-[10px] uppercase text-gray-500 font-bold px-2 py-2 tracking-widest">Main</div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    'group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer',
                    isActive
                      ? 'bg-[#A855F7]/10 text-[#A855F7] font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'h-5 w-5 shrink-0 transition-colors',
                      isActive ? 'text-[#A855F7]' : 'group-hover:text-white'
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="text-[10px] uppercase text-gray-500 font-bold px-2 pt-4 pb-2 tracking-widest text-white/90">Bookkeeping</div>
        <ul className="space-y-1">
          {bookkeepingItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    'group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer',
                    isActive
                      ? 'bg-[#A855F7]/10 text-[#A855F7] font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'h-5 w-5 shrink-0 transition-colors',
                      isActive ? 'text-[#A855F7]' : 'group-hover:text-white'
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 mt-auto border-t border-[#1A1A1A]">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#9333EA]"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin User</p>
            <p className="text-[10px] text-gray-500">DriverMade AD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
