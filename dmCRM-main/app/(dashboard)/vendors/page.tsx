"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Phone, Mail } from 'lucide-react';
import { Vendor } from '@/lib/types';

// A small set of example vendors for demonstration. In a real
// application these would be loaded from your Supabase backend. Each
// vendor record includes optional contact information and notes to
// assist with managing suppliers.
const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Gulf Oil Supplies',
    contact_person: 'Ahmed Khan',
    phone: '+971 50 123 4567',
    email: 'ahmed@gulfoil.com',
    address: 'Mussafah, Abu Dhabi',
    notes: 'Primary engine oil and lubricant supplier',
    created_at: '',
    updated_at: ''
  },
  {
    id: '2',
    name: 'DEWA Utilities',
    contact_person: 'Billing Department',
    phone: '+971 4 601 9999',
    email: 'billing@dewa.gov',
    address: 'Dubai Electricity & Water Authority',
    notes: 'Utility provider for power and water',
    created_at: '',
    updated_at: ''
  },
  {
    id: '3',
    name: 'Workshop Rent',
    contact_person: 'Facility Manager',
    phone: '+971 55 987 6543',
    email: 'manager@workspace.ae',
    address: 'Industrial Zone, Abu Dhabi',
    notes: 'Monthly facility lease provider',
    created_at: '',
    updated_at: ''
  }
];

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockVendors.filter(v => {
    const term = searchTerm.toLowerCase();
    return (
      v.name.toLowerCase().includes(term) ||
      (v.contact_person ? v.contact_person.toLowerCase().includes(term) : false) ||
      (v.notes ? v.notes.toLowerCase().includes(term) : false)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Vendors</h1>
        <Link
          href="/vendors/new"
          className="bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2"
        >
          <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">+</div>
          Add Vendor
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search vendors..."
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
                <th className="px-6 py-4">Vendor Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b border-[#1A1A1A] hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-white font-semibold">
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {vendor.contact_person || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {vendor.phone || '—'}
                  </td>
                    <td className="px-6 py-4 text-gray-400">
                    {vendor.email ? (
                      <a href={`mailto:${vendor.email}`} className="underline hover:text-[#A855F7]">
                        {vendor.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-sm">
                    {vendor.notes || '—'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No vendors found matching "{searchTerm}"
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