'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Camera, Receipt as ReceiptIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { expenseSchema } from '@/lib/utils/validation';

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export default function NewExpensePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema) as any,
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: 'parts',
      status: 'paid',
    }
  });

  const onSubmit = async (data: ExpenseFormValues) => {
    // In a real app, upload receiptFile to Supabase Storage first,
    // get public URL, attach to data.receipt_url, then insert expense record.
    console.log('Submitting expense:', data, receiptFile);
    
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API
    router.push('/expenses');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeReceipt = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setReceiptFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Record Expense & Receipt</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white">
            <CardHeader className="p-6 pb-4 border-b border-[#1A1A1A]">
              <CardTitle className="text-sm font-bold">Expense Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('amount')}
                    className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                  />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vendor Name</label>
                <input
                  type="text"
                  placeholder="e.g. Gulf Oil Supplies"
                  {...register('vendor_name')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Engine oil and filters batch"
                  {...register('description')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
                  <select
                    {...register('category')}
                    className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors appearance-none"
                  >
                    <option value="parts">Parts & Inventory</option>
                    <option value="labor">Contract Labor</option>
                    <option value="rent">Rent</option>
                    <option value="utilities">Utilities</option>
                    <option value="software">Software & IT</option>
                    <option value="marketing">Marketing</option>
                    <option value="office">Office Supplies</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</label>
                  <select
                    {...register('status')}
                    className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors appearance-none"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending Payment</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reference / Invoice # (Optional)</label>
                <input
                  type="text"
                  {...register('reference_number')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Notes (Optional)</label>
                <textarea
                  rows={3}
                  {...register('notes')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors resize-none"
                />
              </div>

            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#A855F7] hover:bg-[#9333EA] disabled:opacity-50 text-white text-xs font-bold px-6 py-3 rounded-full transition-all"
            >
              {isSubmitting ? 'Saving...' : 'Save Expense'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/expenses')}
              className="bg-transparent border border-[#1A1A1A] hover:bg-white/5 text-white text-xs font-bold px-6 py-3 rounded-full transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Receipt Upload */}
        <div className="space-y-6">
          <Card className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white">
            <CardHeader className="p-6 pb-4 border-b border-[#1A1A1A]">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ReceiptIcon className="w-4 h-4 text-[#A855F7]" />
                Receipt Capture
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              {!previewUrl ? (
                <div 
                  className="border-2 border-dashed border-[#1A1A1A] hover:border-[#A855F7]/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#0D0D0D]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4 text-gray-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium mb-1">Upload Receipt</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">JPG, PNG, PDF</p>
                </div>
              ) : (
                <div className="relative group rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0D0D0D] aspect-[3/4] flex justify-center items-center">
                  <div className="absolute top-2 right-2 z-10">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeReceipt(); }}
                      className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {receiptFile?.type.includes('image') ? (
                    <img src={previewUrl} alt="Receipt preview" className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <ReceiptIcon className="w-12 h-12 mb-2 text-[#A855F7]" />
                      <span className="text-xs font-medium">{receiptFile?.name}</span>
                    </div>
                  )}
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
              />
              
              <p className="text-[10px] text-gray-500 mt-6 leading-relaxed">
                Clear photos of physical receipts or uploaded PDFs allow proper auditing and matching during accountant exports.
              </p>
            </CardContent>
          </Card>
        </div>

      </form>
    </div>
  );
}
