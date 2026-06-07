'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp, Users, Car, CalendarCheck, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatting';

const mockData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 59000 },
  { name: 'Jun', revenue: 67000 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Workshop Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Revenue */}
        <Card className="bg-[#111111] border border-[#1A1A1A] text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#A855F7]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">{formatCurrency(332000)}</div>
            <p className="text-[10px] text-emerald-500 mt-2 flex gap-1 items-center font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded w-max">
              +14% from last month
            </p>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card className="bg-[#111111] border border-[#1A1A1A] text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-[#A855F7]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">482</div>
            <p className="text-[10px] text-gray-400 mt-2 flex gap-1 items-center bg-white/5 border border-white/10 px-1.5 py-0.5 rounded w-max">
              +12 this month
            </p>
          </CardContent>
        </Card>

        {/* Vehicles */}
        <Card className="bg-[#111111] border border-[#1A1A1A] text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Vehicles</CardTitle>
            <Car className="h-4 w-4 text-[#A855F7]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">514</div>
            <p className="text-[10px] text-gray-400 mt-2 flex gap-1 items-center bg-white/5 border border-white/10 px-1.5 py-0.5 rounded w-max">
              +18 this month
            </p>
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="bg-[#111111] border border-[#1A1A1A] text-white ring-1 ring-[#A855F7]/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[10px] font-bold text-[#A855F7] uppercase tracking-wider">Appointments</CardTitle>
            <div className="w-4 h-4 rounded-full bg-[#A855F7]/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></div></div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold text-[#A855F7]">24</div>
            <p className="text-[10px] text-gray-400 mt-2 flex gap-1 items-center bg-white/5 border border-[#A855F7]/20 px-1.5 py-0.5 rounded w-max">
              Upcoming next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <Card className="bg-[#111111] border border-[#1A1A1A] col-span-1 lg:col-span-4 text-white overflow-hidden p-6">
          <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">Revenue Overview <span className="font-normal text-gray-500 ml-2">Last 6 Months</span></CardTitle>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#A855F7]"></div> Revenue
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[250px] p-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => (value / 1000) + 'k'}
                />
                <Tooltip
                  cursor={{fill: '#1A1A1A'}}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#1A1A1A', color: '#fff', borderRadius: '12px' }}
                  itemStyle={{ color: '#A855F7' }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Bar dataKey="revenue" fill="#A855F7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border border-[#1A1A1A] col-span-1 lg:col-span-3 text-white flex flex-col p-6 overflow-hidden">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-sm font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0 pr-2">
            <div className="space-y-4">
              {[
                { type: 'invoice', title: 'Invoice INV-2026-042 Paid', desc: 'Ahmed Mansour', amount: 'AED 1,250.00', time: '2h ago' },
                { type: 'appointment', title: 'New Appointment', desc: 'Saeed Al Maktoum', amount: 'Range Rover', time: '4h ago' },
                { type: 'invoice', title: 'Invoice INV-2026-041 Issued', desc: 'Khalid Abdullah', amount: 'AED 3,420.00', time: '1d ago' },
                { type: 'appointment', title: 'Completed Service', desc: 'Fatima Al Qasim', amount: 'Mercedes G63', time: '1d ago' },
                { type: 'invoice', title: 'Invoice INV-2026-040 Paid', desc: 'Omar Youssef', amount: 'AED 890.00', time: '2d ago' },
              ].map((item, i) => (
               <div key={i} className="flex gap-3 items-center">
                  <div className="mt-1">
                    {item.type === 'invoice' ? (
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-blue-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold">{item.title}</p>
                    <p className="text-[10px] text-gray-500">{item.desc} • {item.time}</p>
                  </div>
                  <div className="text-xs font-bold">{item.amount}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-[#1A1A1A] hover:border-gray-700 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-colors">
              View All Activity
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
