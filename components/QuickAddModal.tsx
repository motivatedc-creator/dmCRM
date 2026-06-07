'use client';

import { X } from 'lucide-react';
import { QuickAddType } from './QuickAddFAB';
import { useState } from 'react';

export function QuickAddModal({ type, onClose }: { type: QuickAddType; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate quick addition
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const getTitle = () => {
    switch (type) {
      case 'invoice': return 'Quick Add Invoice';
      case 'quotation': return 'Quick Add Quotation';
      case 'report': return 'Quick Add Report';
      default: return 'Quick Add';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#111111] border border-[#1A1A1A] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-[#1A1A1A]">
          <h2 className="text-lg font-bold text-white tracking-tight">{getTitle()}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="quick-add-form" onSubmit={handleSubmit} className="space-y-4">
            
            {(type === 'invoice' || type === 'quotation') && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer Name</label>
                  <input type="text" required placeholder="e.g. Ahmed Mansour" className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount (AED)</label>
                  <input type="number" required placeholder="0.00" className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Description</label>
                  <textarea rows={2} required placeholder="Brief description of service" className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors resize-none" />
                </div>
              </>
            )}

            {type === 'report' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vehicle Details</label>
                  <input type="text" required placeholder="e.g. 2021 Nissan Patrol (AD 82921)" className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reported Symptom</label>
                  <textarea rows={2} required placeholder="Customer issue" className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Diagnostic Brief</label>
                  <textarea rows={3} required placeholder="Initial evaluation notes" className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors resize-none" />
                </div>
              </>
            )}
          </form>
        </div>

        <div className="p-6 border-t border-[#1A1A1A] flex gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-transparent border border-[#1A1A1A] hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="quick-add-form"
            disabled={isSubmitting}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  );
}
