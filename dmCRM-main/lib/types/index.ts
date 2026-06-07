export type DatabaseStatus = 'pending' | 'active' | 'in_progress' | 'completed' | 'cancelled';
export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled';
export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
export type ItemType = 'service' | 'part' | 'labor';
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'pending';
export type ExpenseCategory = 'parts' | 'labor' | 'rent' | 'utilities' | 'software' | 'marketing' | 'office' | 'other';
export type ExpenseStatus = 'pending' | 'paid' | 'cancelled';
export type DiagnosticReportStatus = 'draft' | 'confirmed' | 'verified';

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  customer_id: string;
  make: string;
  model: string;
  year: number;
  vin: string | null;
  license_plate: string | null;
  color: string | null;
  engine_type: 'Petrol' | 'Diesel' | 'Hybrid';
  mileage_at_registration: number | null;
  current_mileage: number | null;
  last_service_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceType {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  base_price: number;
  estimated_duration_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string;
  vehicle_id: string | null;
  scheduled_date: string;
  estimated_duration_minutes: number;
  status: DatabaseStatus;
  technician_assigned: string | null;
  completion_time: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentService {
  appointment_id: string;
  service_type_id: string;
}

export interface Part {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  quantity_in_stock: number;
  reorder_level: number;
  unit_price: number;
  /**
   * The price paid to acquire this part from a vendor. While
   * `unit_price` reflects what you charge customers, `cost_price`
   * captures your actual cost. This allows tracking true parts
   * margins by comparing selling price against the cost at the
   * moment of sale. New parts should always specify a cost price,
   * even if it matches the selling price. Defaults to 0 when
   * migrating existing data where cost information was not
   * previously captured.
   */
  cost_price: number;
  supplier: string | null;
  supplier_contact: string | null;
  last_restocked: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  appointment_id: string | null;
  customer_id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  payment_method: PaymentMethod;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  /**
   * The cost price of the item at the time it was added to the
   * invoice. For services and labour this may simply mirror
   * `unit_price`, but for parts it should reflect the part’s
   * recorded cost at the moment of invoicing. Capturing this
   * snapshot prevents historic margins from shifting when part
   * costs change later on.
   */
  cost_price: number;
  total: number;
  item_type: ItemType;
  created_at: string;
}

// Vendors represent suppliers and service providers your
// organisation purchases from. They are separate from customers and
// allow you to track expenses, bills and outstanding payables to
// each supplier. The optional fields support flexible capture of
// contact details and internal notes.
export interface Vendor {
  id: string;
  name: string;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Quotation {
  id: string;
  quotation_number: string;
  issue_date: string;
  valid_until: string | null;
  car_make: string | null;
  car_model: string | null;
  car_year: number | null;
  license_plate: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount: number;
  total: number;
  status: QuotationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuotationItem {
  id: string;
  quotation_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  item_type: ItemType;
  created_at: string;
}

export interface ServiceHistory {
  id: string;
  vehicle_id: string;
  appointment_id: string | null;
  service_description: string;
  parts_used: string | null;
  mileage_at_service: number | null;
  date_completed: string;
  total_cost: number | null;
  technician: string | null;
  notes: string | null;
  created_at: string;
}

export interface Expense {
  id: string;
  vendor_name: string | null;
  vendor_id: string | null;
  amount: number;
  date: string;
  category: ExpenseCategory;
  description: string;
  reference_number: string | null;
  receipt_url: string | null;
  status: ExpenseStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DiagnosticReport {
  id: string;
  report_number: string;
  customer_id: string;
  vehicle_id: string;
  lead_engineer: string | null;
  platform: string | null;
  status: DiagnosticReportStatus;
  reported_symptom: string | null;
  occurs_when: string | null;
  prior_workshops: string | null;
  brief: string | null;
  fault_codes: { code: string; description: string }[];
  measurements: { parameter: string; value: string }[];
  root_cause: string | null;
  recommended_intervention: string | null;
  required_parts: { name: string; quantity: number }[];
  labour_hours: number | null;
  labour_cost: number | null;
  advisory_notes: string | null;
  before_fuel_trim: string | null;
  after_fuel_trim: string | null;
  verification_status: string | null;
  diagnostic_fee: number | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

