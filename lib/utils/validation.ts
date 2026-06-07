import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  notes: z.string().optional(),
});

export const vehicleSchema = z.object({
  customer_id: z.string().uuid('Invalid customer ID'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  vin: z.string().optional(),
  license_plate: z.string().optional(),
  color: z.string().optional(),
  engine_type: z.enum(['Petrol', 'Diesel', 'Hybrid']),
  current_mileage: z.coerce.number().optional(),
  notes: z.string().optional(),
});

export const appointmentSchema = z.object({
  customer_id: z.string().uuid(),
  vehicle_id: z.string().uuid().optional(),
  scheduled_date: z.string(),
  estimated_duration_minutes: z.coerce.number().min(1),
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).default('pending'),
  technician_assigned: z.string().optional(),
  notes: z.string().optional(),
  service_types: z.array(z.string().uuid()).optional(),
});

export const inventorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().optional(),
  category: z.string().optional(),
  quantity_in_stock: z.coerce.number().min(0).default(0),
  reorder_level: z.coerce.number().min(0).default(0),
  unit_price: z.coerce.number().min(0),
  supplier: z.string().optional(),
  supplier_contact: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const invoiceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().min(1),
  unit_price: z.coerce.number().min(0),
  item_type: z.enum(['service', 'part', 'labor']),
});

export const invoiceSchema = z.object({
  customer_id: z.string().uuid(),
  appointment_id: z.string().uuid().optional(),
  issue_date: z.string(),
  due_date: z.string().optional(),
  discount: z.coerce.number().min(0).default(0),
  tax_rate: z.coerce.number().min(0).default(0.05),
  status: z.enum(['draft', 'issued', 'paid', 'overdue', 'cancelled']).default('draft'),
  payment_method: z.enum(['cash', 'card', 'bank_transfer', 'pending']).default('pending'),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1),
});

export const quotationItemSchema = invoiceItemSchema;

export const quotationSchema = z.object({
  issue_date: z.string(),
  valid_until: z.string().optional(),
  car_make: z.string().optional(),
  car_model: z.string().optional(),
  car_year: z.coerce.number().optional(),
  license_plate: z.string().optional(),
  customer_name: z.string().optional(),
  customer_phone: z.string().optional(),
  discount: z.coerce.number().min(0).default(0),
  tax_rate: z.coerce.number().min(0).default(0.05),
  status: z.enum(['draft', 'sent', 'accepted', 'rejected', 'expired']).default('draft'),
  notes: z.string().optional(),
  items: z.array(quotationItemSchema).min(1),
});

export const expenseSchema = z.object({
  date: z.string(),
  amount: z.coerce.number().min(0),
  category: z.enum(['parts', 'labor', 'rent', 'utilities', 'software', 'marketing', 'office', 'other']),
  description: z.string().min(1, 'Description is required'),
  reference_number: z.string().optional(),
  receipt_url: z.string().optional(),
  vendor_name: z.string().optional(),
  status: z.enum(['pending', 'paid', 'cancelled']).default('paid'),
  notes: z.string().optional(),
});

