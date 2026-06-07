'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Receipt, Plus } from 'lucide-react';
import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';
import Link from 'next/link';

// Mock expenses
const mockExpenses: Expense[] = [
  { id: '1', vendor_name: 'Gulf Oil Supplies', vendor_id: null, amount: 4200, date: '2026-06-05', category: 'parts', description: 'Engine oil and filters batch', reference_number: 'INV-GOS-891', receipt_url: null, status: 'paid', notes: null, created_at: '', updated_at: '' },
  { id: '2', vendor_name: 'DEWA Utilities', vendor_id: null, amount: 1850, date: '2026-06-02', category: 'utilities', description: 'May Electricity & Water', reference_number: 'DEWA-2026-05', receipt_url: null, status: 'paid', notes: null, created_at: '', updated_at: '' },
  { id: '3', vendor_name: 'Workshop Rent', vendor_id: null, amount: 15000, date: '2026-06-01', category: 'rent', description: 'Monthly Facility Rent', reference_number: 'RENT-JUN-26', receipt_url: null, status: 'paid', notes: null, created_at: '', updated_at: '' },
  { id: '4', vendor_name: 'Facebook Ads', vendor_id: null, amount: 850, date: '2026-06-06', category: 'marketing', description: 'Service Promotion Campaign', reference_number: null, receipt_url: null, status: 'pending', notes: null, created_at: '', updated_at: '' },
];

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = mockExpenses.filter(e => 
    (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (e.vendor_name && e.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Expenses</h1>
        <Link href="/expenses/new" className="bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">+</div>
          Record Expense
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by vendor or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#111111] border border-[#1A1A1A] rounded-full pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors"
        />
      </div>

      <div className="bg-[#111111] border border-[#1A1A1A] rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-500 uppercase border-b border-[#1A1A1A] bg-[#0F0F0F] tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Vendor / Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Receipt</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map(expense => (
                <tr key={expense.id} className="border-b border-[#1A1A1A] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{expense.vendor_name || 'Unknown Vendor'}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{expense.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#1A1A1A] text-gray-300 border border-[#2A2A2A] px-2 py-1 rounded text-[10px] font-mono uppercase">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {expense.status === 'paid' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">PAID</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">PENDING</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {expense.receipt_url ? (
                      <div className="flex items-center gap-1.5 text-[#A855F7]">
                        <Receipt className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase hover:underline">View</span>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-[10px] uppercase font-bold">Missing</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-white whitespace-nowrap">
                    {formatCurrency(expense.amount)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No expenses found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
