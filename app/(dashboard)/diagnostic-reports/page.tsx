'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { DiagnosticReport } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatting';
import Link from 'next/link';

// @ts-ignore
const mockReports: (DiagnosticReport & { customer_name: string; vehicle_name: string })[] = [
  { 
    id: '1', report_number: 'DM-0021', customer_id: '1', vehicle_id: '1', customer_name: 'Ahmed Mansour', vehicle_name: '2022 Mercedes-Benz G63 AMG',
    issue_date: '2026-06-07', status: 'draft',
    lead_engineer: 'John Doe', platform: 'ISTA', reported_symptom: null, occurs_when: null, prior_workshops: null, brief: null,
    fault_codes: [], measurements: [], root_cause: null, recommended_intervention: null, required_parts: [], labour_hours: null, labour_cost: null,
    advisory_notes: null, before_fuel_trim: null, after_fuel_trim: null, verification_status: null, diagnostic_fee: null, internal_notes: null,
    created_at: '', updated_at: ''
  } as any
];

export default function DiagnosticReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockReports.filter(r => 
    r.report_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Diagnostic Reports</h1>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by report #, customer or vehicle..."
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
                <th className="px-6 py-4">Report #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map(report => (
                <tr key={report.id} className="border-b border-[#1A1A1A] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-mono text-[#A855F7]">{report.report_number}</td>
                  <td className="px-6 py-4 font-semibold text-white">{report.customer_name}</td>
                  <td className="px-6 py-4 text-gray-400">{report.vehicle_name}</td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(report.created_at || new Date().toISOString())}</td>
                  <td className="px-6 py-4">
                    {report.status === 'verified' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">VERIFIED</span>
                    ) : report.status === 'confirmed' ? (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold">CONFIRMED</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-400 text-[10px] font-bold uppercase">DRAFT</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No reports found matching "{searchTerm}"
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
