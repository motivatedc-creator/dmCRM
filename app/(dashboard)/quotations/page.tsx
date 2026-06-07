'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Quotation } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';
import Link from 'next/link';

const mockQuotations: Quotation[] = [
  { id: '1', quotation_number: 'QUO-2026-001', issue_date: '2026-06-07', car_make: 'Porsche', car_model: '911', car_year: 2021, license_plate: 'DXB 9876', subtotal: 3000, tax_rate: 0.05, tax_amount: 150, discount: 0, total: 3150, status: 'draft', valid_until: null, customer_name: null, customer_phone: null, notes: null, created_at: '', updated_at: ''}
];

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockQuotations.filter(q => 
    q.quotation_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (q.car_make && q.car_make.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (q.car_model && q.car_model.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Quotations</h1>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by quote # or car make..."
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
                <th className="px-6 py-4">Quotation #</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Plate</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Total (AED)</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map(quote => (
                <tr key={quote.id} className="border-b border-[#1A1A1A] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-[#A855F7]">{quote.quotation_number}</td>
                  <td className="px-6 py-4 font-semibold text-white">{quote.car_year} {quote.car_make} {quote.car_model}</td>
                  <td className="px-6 py-4 font-mono text-gray-400">{quote.license_plate || '-'}</td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(quote.issue_date)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-400 text-[10px] font-bold uppercase">{quote.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-white whitespace-nowrap">
                    {formatCurrency(quote.total)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/print/quotation/${quote.id}`} target="_blank" className="text-gray-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No quotations found matching "{searchTerm}"
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
