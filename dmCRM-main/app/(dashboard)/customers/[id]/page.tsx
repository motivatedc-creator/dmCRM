'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/formatting';
import { Car, FileText, CalendarCheck, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CustomerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  
  // In a real app we'd fetch the customer by ID
  const customer = {
    id: id || '1',
    name: 'Ahmed Mansour',
    phone: '+971 50 123 4567',
    email: 'ahmed@example.com',
    address: 'Al Reem Island',
    city: 'Abu Dhabi',
    total_spend: 15450,
    created_at: '2025-01-10T10:00:00Z',
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-[#111111] border border-[#1A1A1A] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#A855F7] to-[#9333EA] flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            {customer.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{customer.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#A855F7]" /> {customer.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#A855F7]" /> {customer.email}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#A855F7]" /> {customer.city}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Lifetime Spend</span>
          <span className="text-3xl font-bold text-[#A855F7]">{formatCurrency(customer.total_spend)}</span>
          <span className="text-[10px] text-gray-500 bg-[#1A1A1A] px-2 py-0.5 rounded-full border border-[#2A2A2A]">Customer since {new Date(customer.created_at).getFullYear()}</span>
        </div>
      </div>

      <div className="flex gap-4 border-b border-[#1A1A1A] pb-6 overflow-x-auto">
        <Link href={`/vehicles/new?customer=${id}`} className="bg-[#111111] border border-[#1A1A1A] hover:border-[#A855F7]/50 text-white text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2">
          <Car className="w-4 h-4 text-[#A855F7]" /> Register Vehicle
        </Link>
        <Link href={`/invoices/new?customer=${id}`} className="bg-[#111111] border border-[#1A1A1A] hover:border-[#A855F7]/50 text-white text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#A855F7]" /> Create Invoice
        </Link>
        <Link href={`/diagnostic-reports/new?customer=${id}`} className="bg-[#111111] border border-[#1A1A1A] hover:border-[#A855F7]/50 text-white text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-[#A855F7]" /> New Report
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Vehicles */}
        <Card className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white">
          <CardHeader className="p-6 pb-4 border-b border-[#1A1A1A]">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Car className="w-4 h-4 text-[#A855F7]" /> Owned Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 flex items-center justify-between border-b border-[#1A1A1A] hover:bg-white/[0.02] cursor-pointer group">
              <div>
                <h4 className="font-semibold">2022 Mercedes-Benz G63 AMG</h4>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">VIN: WDC463... | Petrol</p>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300">
                AD 12345
              </div>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-white/[0.02] cursor-pointer group">
              <div>
                <h4 className="font-semibold">2019 Toyota Land Cruiser</h4>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">VIN: JTM7... | Petrol</p>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300">
                AD 9821
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white">
          <CardHeader className="p-6 pb-4 border-b border-[#1A1A1A]">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#A855F7]" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {[
              { type: 'invoice', status: 'PAID', text: 'Invoice INV-2026-042', value: 'AED 1,250.00', date: '2 days ago', badge: 'emerald' },
              { type: 'report', status: 'VERIFIED', text: 'Diagnostic Report DM-0021', value: 'G63 AMG', date: '5 days ago', badge: 'blue' },
              { type: 'invoice', status: 'PAID', text: 'Invoice INV-2025-180', value: 'AED 4,800.00', date: 'Jan 15, 2026', badge: 'emerald' }
            ].map((item, i) => (
              <div key={i} className="p-6 border-b border-[#1A1A1A] flex items-center gap-4 hover:bg-white/[0.02] cursor-pointer">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-${item.badge}-500/10`}>
                   {item.type === 'invoice' ? <FileText className={`w-4 h-4 text-${item.badge}-500`} /> : <CalendarCheck className={`w-4 h-4 text-${item.badge}-500`} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.text}</p>
                  <p className="text-[10px] text-gray-500">{item.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-xs">{item.value}</span>
                  <span className={`px-2 py-0.5 rounded-full bg-${item.badge}-500/10 text-${item.badge}-500 text-[8px] font-bold tracking-wider uppercase`}>{item.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
