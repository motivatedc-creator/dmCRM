'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FileText } from 'lucide-react';
import { Invoice } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';
import Link from 'next/link';

// Mock 
const mockInvoices: (Invoice & { customer_name: string })[] = [
  { id: '1', invoice_number: 'INV-2026-042', issue_date: '2026-06-05', customer_name: 'Ahmed Mansour', total: 1250, status: 'paid', customer_id: '1', appointment_id: null, due_date: null, subtotal: 1000, tax_rate: 0.05, tax_amount: 50, discount: 0, payment_method: 'card', notes: null, created_at: '', updated_at: '' },
  { id: '2', invoice_number: 'INV-2026-041', issue_date: '2026-06-06', customer_name: 'Khalid Abdullah', total: 3420, status: 'issued', customer_id: '2', appointment_id: null, due_date: null, subtotal: 3000, tax_rate: 0.05, tax_amount: 150, discount: 0, payment_method: 'pending', notes: null, created_at: '', updated_at: '' },
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockInvoices.filter(i => 
    i.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Invoices</h1>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by invoice # or customer..."
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
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount (AED)</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map(invoice => (
                <tr key={invoice.id} className="border-b border-[#1A1A1A] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-[#A855F7]">{invoice.invoice_number}</td>
                  <td className="px-6 py-4 font-semibold text-white">{invoice.customer_name}</td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(invoice.issue_date)}</td>
                  <td className="px-6 py-4">
                    {invoice.status === 'paid' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">PAID</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">ISSUED</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-white whitespace-nowrap">
                    {formatCurrency(invoice.total)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/print/invoice/${invoice.id}`} target="_blank" className="text-gray-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No invoices found matching "{searchTerm}"
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
