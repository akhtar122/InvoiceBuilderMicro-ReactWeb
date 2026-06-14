export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount?: number;
  taxAmount?: number;
  total?: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber?: string;
  invoiceDate: string;
  dueDate: string;
  customerId: string;
  senderId: string;
  items: InvoiceItem[];
  subtotal?: number;
  totalTax?: number;
  grandTotal?: number;
  status?: string;
  notes?: string;
  pdfPath?: string;
  createdAt?: string;
  updatedAt?: string | null;
  isDeleted?: boolean;
}
