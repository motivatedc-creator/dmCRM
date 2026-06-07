'use client';

import { useState } from 'react';
import { Plus, X, FileText, FileSpreadsheet, CalendarCheck } from 'lucide-react';
import { QuickAddModal } from './QuickAddModal';

export type QuickAddType = 'invoice' | 'quotation' | 'report' | null;

export function QuickAddFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<QuickAddType>(null);

  const openModal = (type: QuickAddType) => {
    setModalType(type);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4">
        {/* Menu items */}
        {isOpen && (
          <div className="flex flex-col gap-3 items-end mb-2">
            <button
              onClick={() => openModal('invoice')}
              className="flex items-center gap-3 group"
            >
              <span className="bg-[#111111] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#1A1A1A] group-hover:border-[#A855F7]/50 transition-colors shadow-lg">
                Quick Invoice
              </span>
              <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1A1A1A] text-[#A855F7] flex items-center justify-center group-hover:bg-[#A855F7] group-hover:text-white transition-all shadow-lg">
                <FileText className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => openModal('quotation')}
              className="flex items-center gap-3 group"
            >
              <span className="bg-[#111111] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#1A1A1A] group-hover:border-[#A855F7]/50 transition-colors shadow-lg">
                Quick Quotation
              </span>
              <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1A1A1A] text-[#A855F7] flex items-center justify-center group-hover:bg-[#A855F7] group-hover:text-white transition-all shadow-lg">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => openModal('report')}
              className="flex items-center gap-3 group"
            >
              <span className="bg-[#111111] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#1A1A1A] group-hover:border-[#A855F7]/50 transition-colors shadow-lg">
                Quick Report
              </span>
              <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1A1A1A] text-[#A855F7] flex items-center justify-center group-hover:bg-[#A855F7] group-hover:text-white transition-all shadow-lg">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#A855F7] hover:bg-[#9333EA] text-white flex items-center justify-center shadow-lg hover:shadow-[#A855F7]/25 hover:scale-105 transition-all outline-none"
          aria-label="Quick Add Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>

        {/* Backdrop for FAB Menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* The actual modal */}
      {modalType && (
        <QuickAddModal 
          type={modalType} 
          onClose={() => setModalType(null)} 
        />
      )}
    </>
  );
}
