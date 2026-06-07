'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, UserCircle, Car, Calendar, Phone } from 'lucide-react';
import Link from 'next/link';
import { Customer } from '@/lib/types';

// Mock data
const mockCustomers: Customer[] = [
  { id: '1', name: 'Ahmed Mansour', phone: '+971 50 123 4567', email: 'ahmed@example.com', address: 'Al Reem Island', city: 'Abu Dhabi', notes: '', postal_code: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', name: 'Saeed Al Maktoum', phone: '+971 55 987 6543', email: 'saeed@example.com', address: 'Yas Island', city: 'Abu Dhabi', notes: '', postal_code: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.phone && c.phone.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Customers</h1>
        <button className="bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">+</div>
          New Customer
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#111111] border border-[#1A1A1A] rounded-full pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(customer => (
          <Link href={`/customers/${customer.id}`} key={customer.id}>
            <Card className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white hover:border-gray-700 transition-colors cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{customer.name}</h3>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {customer.phone || 'No phone'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-[#1A1A1A] text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-4">
                  <div className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-[#A855F7]" />
                    <span>2 Vehicles</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-500" />
                    <span>5 Visits</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-[#111111] rounded-2xl border border-[#1A1A1A]">
          No customers found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
