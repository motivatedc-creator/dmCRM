"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { vendorSchema } from '@/lib/utils/validation';

// Infer the TypeScript type from the Zod schema. This keeps the
// form values in sync with your validation rules.
type VendorFormValues = z.infer<typeof vendorSchema>;

export default function NewVendorPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema) as any,
    defaultValues: {
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    },
  });

  const onSubmit = async (data: VendorFormValues) => {
    // Replace this with a real API call to your backend when ready.
    console.log('Submitting vendor:', data);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push('/vendors');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Add Vendor</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Card className="bg-[#111111] border border-[#1A1A1A] rounded-3xl text-white">
          <CardHeader className="p-6 pb-4 border-b border-[#1A1A1A]">
            <CardTitle className="text-sm font-bold">Vendor Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Contact Person
                </label>
                <input
                  type="text"
                  {...register('contact_person')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Address
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className="w-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A855F7] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Notes
              </label>
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
            {isSubmitting ? 'Saving...' : 'Save Vendor'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/vendors')}
            className="bg-transparent border border-[#1A1A1A] hover:bg-white/5 text-white text-xs font-bold px-6 py-3 rounded-full transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}