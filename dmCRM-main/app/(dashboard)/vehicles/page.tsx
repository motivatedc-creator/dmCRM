'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Car, User, SearchIcon } from 'lucide-react';
import { Vehicle } from '@/lib/types';

const mockVehicles: Vehicle[] = [
  { id: '1', customer_id: '1', make: 'Mercedes-Benz', model: 'G63 AMG', year: 2022, license_plate: 'AD 12345', engine_type: 'Petrol', current_mileage: 45000, color: 'Black', vin: '', created_at: '', updated_at: '', last_service_date: null, notes: null, mileage_at_registration: null },
  { id: '2', customer_id: '2', make: 'Porsche', model: '911 Carrera', year: 2021, license_plate: 'DXB 9876', engine_type: 'Petrol', current_mileage: 18000, color: 'White', vin: '', created_at: '', updated_at: '', last_service_date: null, notes: null, mileage_at_registration: null },
];

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockVehicles.filter(v => 
    v.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.license_plate && v.license_plate.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Vehicles</h1>
        <button className="bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">+</div>
          New Vehicle
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search make, model, or plate..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#111111] border border-[#1A1A1A] rounded-full pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(vehicle => (
          <Card key={vehicle.id} className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white hover:border-gray-700 transition-colors cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                    <Car className="w-6 h-6 text-[#A855F7] opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                    <div className="inline-block px-2 py-0.5 mt-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-300">
                      {vehicle.license_plate || 'No Plate'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-[#1A1A1A] text-[10px] mt-4 uppercase font-bold text-gray-500 tracking-wider">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <User className="w-3 h-3 text-[#A855F7]" />
                  <span>Owner ID: {vehicle.customer_id}</span>
                </div>
                <div className="text-gray-400 font-mono text-xs">
                  {vehicle.current_mileage ? vehicle.current_mileage.toLocaleString() + ' km' : 'N/A'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
