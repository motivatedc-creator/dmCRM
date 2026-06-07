'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PrintInvoicePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  useEffect(() => {
    // Auto-open print dialog after a short delay
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for the layout matching the screenshot
  const invoice = {
    invoice_number: 'INV-2026-010',
    issue_date: '04/06/2026',
    due_date: 'Upon receipt',
    customer: {
      name: 'Adam Frasner',
      phone: '0524771978',
      address: 'Al Rayana, Khalifa City',
    },
    vehicle: {
      make: 'Jeep',
      model: 'Wrangler',
      year: 2008,
      plate: 'AUH 10 72075',
    },
    items: [
      { id: '1', description: 'ABS Module Repair & Programming', quantity: 1, unit_price: 2200, total: 2200 },
    ],
    subtotal: 2200,
    tax_rate: 5,
    tax_amount: 110,
    total: 2310,
    terms: 'Please make bank transfers payable to:\nSIXTH GEAR AUTO WORKSHOP LLC SPC\nBank Name: ABU DHABI COMMERCIAL BANK\nAccount Number: 14387056920001\nIBAN: AE850030014387056920001\nSWIFT/BIC: ADCBAEAAXXX\nReference: INV-2026-010',
  };

  return (
    <div className="bg-white min-h-screen text-black font-sans w-full max-w-4xl mx-auto py-8 [-webkit-print-color-adjust:exact] [print-color-adjust:exact]">
      {/* Top Purple Bar */}
      <div className="h-4 w-full bg-[#A855F7] mb-8" />

      {/* Header section */}
      <div className="px-8 mb-12 flex justify-between items-start">
        {/* Left Side: Logo & Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center relative">
            <div className="absolute w-[110%] h-[110%] border-4 border-black border-dashed rounded-full" />
            <div className="flex flex-col text-center leading-none">
              <span className="text-[#3b82f6] text-[10px] font-black uppercase tracking-wider">Sixth</span>
              <span className="text-[#3b82f6] text-[10px] font-black uppercase tracking-wider">Gear</span>
              <span className="text-white text-[8px] font-bold uppercase">Garage</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-black">Sixth Gear Garage</h1>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Abu Dhabi, UAE</p>
          </div>
        </div>

        {/* Right Side Logo */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-black italic tracking-tighter text-[#3b82f6]">D///</div>
          <span className="text-[10px] font-bold tracking-widest mt-1">Driver Made</span>
        </div>
      </div>

      <div className="px-8 mt-12 mb-8">
        <p className="font-bold text-sm tracking-widest uppercase mb-8">TRN: 100234567800003</p>

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xs font-bold mb-3 uppercase tracking-wider">Bill To</h2>
            <div className="font-bold text-lg mb-1">{invoice.customer.name}</div>
            <div className="text-sm text-gray-700 mb-1">{invoice.customer.phone}</div>
            <div className="text-sm text-gray-700">{invoice.customer.address}</div>
          </div>

          <div>
            <h2 className="text-xs font-bold mb-3 uppercase tracking-wider">Vehicle</h2>
            <div className="font-bold text-lg mb-1">{invoice.vehicle.year} {invoice.vehicle.make} {invoice.vehicle.model}</div>
            <div className="text-sm text-gray-700">Plate: {invoice.vehicle.plate}</div>
          </div>

          <table className="text-sm text-right border-separate border-spacing-y-2">
            <tbody>
              <tr>
                <td className="pr-4 font-bold text-xs tracking-wider uppercase">Invoice #</td>
                <td className="text-gray-800 font-medium">{invoice.invoice_number}</td>
              </tr>
              <tr>
                <td className="pr-4 font-bold text-xs tracking-wider uppercase">Date Issued</td>
                <td className="text-gray-800 font-medium">{invoice.issue_date}</td>
              </tr>
              <tr>
                <td className="pr-4 font-bold text-xs tracking-wider uppercase">Due Date</td>
                <td className="text-gray-800 font-medium">{invoice.due_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Items Table */}
      <div className="px-8 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-black text-white text-xs tracking-wider uppercase">
              <th className="py-2 px-3 text-left w-12 rounded-tl-sm">SR.NO</th>
              <th className="py-2 px-3 text-left">Description</th>
              <th className="py-2 px-3 text-right">QTY</th>
              <th className="py-2 px-3 text-right">Unit Price</th>
              <th className="py-2 px-3 text-right rounded-tr-sm">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 px-3 text-left text-gray-800">{index + 1}</td>
                <td className="py-3 px-3 text-left font-medium">{item.description}</td>
                <td className="py-3 px-3 text-right text-gray-800">{item.quantity}</td>
                <td className="py-3 px-3 text-right text-gray-800">AED {item.unit_price.toLocaleString()}</td>
                <td className="py-3 px-3 text-right text-gray-800">AED {item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals & Signatures */}
      <div className="px-8 grid grid-cols-2 gap-8 mb-16">
        <div className="pt-8">
          <p className="text-xl italic text-gray-400">Thank you for your business!</p>
        </div>
        <div className="pt-2">
          <table className="w-full text-right text-sm border-separate border-spacing-y-3">
            <tbody>
              <tr>
                <td className="pr-6 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Subtotal</td>
                <td className="text-gray-900 font-medium whitespace-nowrap text-right">AED {invoice.subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="pr-6 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Tax Rate</td>
                <td className="text-gray-900 font-medium whitespace-nowrap text-right">{invoice.tax_rate}%</td>
              </tr>
              <tr>
                <td className="pr-6 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Tax</td>
                <td className="text-gray-900 font-medium whitespace-nowrap text-right">AED {invoice.tax_amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="pr-6 font-black text-gray-800 uppercase tracking-widest text-xs pt-1">Total</td>
                <td className="whitespace-nowrap text-right pt-1">
                  <span className="bg-[#A855F7] text-white px-4 py-2 text-base font-bold rounded-sm">
                    AED {invoice.total.toLocaleString()}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-16 flex flex-col items-center ml-auto w-48">
            <div className="h-16 flex items-end justify-center w-full relative mb-1">
              <span className="text-3xl font-[Caveat] sm:font-[Brush_Script_MT,cursive] text-blue-900 transform -rotate-6">A Tariq</span>
              <div className="absolute w-full h-[1px] bg-black bottom-[-4px] left-0"></div>
            </div>
            <span className="text-[9px] font-bold tracking-wider uppercase mt-2">Authorized Signature</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="px-8 mt-12 pb-8">
        <div>
          <div className="w-full border-t border-black mb-4"></div>
          <h3 className="text-[10px] font-bold tracking-widest uppercase mb-3 text-black">Terms & Conditions</h3>
          {invoice.terms.split('\n').map((line, i) => (
            <p key={i} className="text-sm text-gray-800 leading-relaxed font-medium mb-1">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Black Bar */}
      <div className="h-4 w-full bg-black mt-8" />
    </div>
  );
}
