export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AE', {
    dateStyle: 'medium',
  }).format(date);
}

export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function generateInvoiceNumber(index: number): string {
  const year = new Date().getFullYear();
  return "INV-" + year + "-" + String(index).padStart(3, '0');
}

export function generateQuotationNumber(index: number): string {
  const year = new Date().getFullYear();
  return "QUO-" + year + "-" + String(index).padStart(3, '0');
}

export function generateDiagnosticReportNumber(index: number): string {
  return "DM-" + String(index).padStart(4, '0');
}
