import jsPDF from "jspdf";
import QRCode from "qrcode";
import { Customer } from "@/app/types/customer";
import { Invoice } from "@/app/types/invoice";
import { Sender } from "@/app/types/sender";

const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const normalizeInvoiceItems = (items: Invoice["items"] = []) =>
  items.map((item) => {
    const amount = item.amount ?? item.quantity * item.unitPrice;
    const taxAmount = item.taxAmount ?? (amount * item.taxRate) / 100;
    const total = item.total ?? amount + taxAmount;

    return {
      ...item,
      amount,
      taxAmount,
      total,
    };
  });

 
export const downloadInvoicePdf = async (
  invoice: Invoice,
  customer: Customer,
  sender: Sender,
) => {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

const qrDataUrl = await QRCode.toDataURL(
  invoice.invoiceNumber || "INV-0001"
);
  const margin = 20;
  let y = 40;

  // =====================
  // HEADER
  // =====================

doc.setFillColor(29, 78, 216);
doc.rect(0, 0, pageWidth, 70, "F");

doc.addImage(
  qrDataUrl,
  "PNG",
  pageWidth - 80,
  5,
  60,
  60
);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("INVOICE", margin, 28);

  doc.setFontSize(11);
  doc.text(
    `Invoice # ${invoice.invoiceNumber || "-"}`,
    margin,
    48,
  );

  doc.text(
    `Date: ${new Date(
      invoice.invoiceDate,
    ).toLocaleDateString()}`,
    pageWidth - 160,
    48,
  );

  doc.setTextColor(0, 0, 0);

  // =====================
  // CUSTOMER / SENDER
  // =====================

  y = 95;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text("Sender", margin, y);
  doc.text("Customer", pageWidth / 2 + 10, y);

  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(sender.companyName || "-", margin, y);
  doc.text(customer.name || "-", pageWidth / 2 + 10, y);

  y += 12;

  doc.text(
    `${sender.address || ""}`,
    margin,
    y,
  );

  doc.text(
    `${customer.address || ""}`,
    pageWidth / 2 + 10,
    y,
  );

  y += 12;

  doc.text(
    `${sender.city || ""}, ${sender.state || ""}`,
    margin,
    y,
  );

  doc.text(
    `${customer.city || ""}, ${customer.state || ""}`,
    pageWidth / 2 + 10,
    y,
  );

  y += 12;

  doc.text(
    `${sender.postalCode || ""}`,
    margin,
    y,
  );

  doc.text(
    `${customer.postalCode || ""}`,
    pageWidth / 2 + 10,
    y,
  );

  y += 12;

  doc.text(sender.country || "", margin, y);
  doc.text(
    customer.country || "",
    pageWidth / 2 + 10,
    y,
  );

  y += 30;

  // =====================
  // TABLE CONFIG
  // =====================

  const tableWidth = pageWidth - margin * 2;

  const columns = [
    { title: "Description", width: 100 },
    { title: "Qty", width: 45 },
    { title: "Unit Price", width: 75 },
    { title: "Tax %", width: 50 },
    { title: "Amount", width: 80 },
    { title: "Tax Amount", width: 85 },
    { title: "Total", width: 80 },
  ];

  const drawTableHeader = () => {
    const headerHeight = 24;

    doc.setFillColor(245, 245, 245);
    doc.rect(
      margin,
      y,
      tableWidth,
      headerHeight,
      "FD",
    );

    let x = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    columns.forEach((column) => {
      doc.text(
        column.title,
        x + 4,
        y + 15,
      );

      doc.line(
        x,
        y,
        x,
        y + headerHeight,
      );

      x += column.width;
    });

    doc.line(
      margin + tableWidth,
      y,
      margin + tableWidth,
      y + headerHeight,
    );

    y += headerHeight;
  };

  drawTableHeader();

  // =====================
  // ITEMS
  // =====================

  const items = normalizeInvoiceItems(
    invoice.items ?? [],
  );

  let subtotal = 0;
  let taxTotal = 0;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  items.forEach((item) => {
    const descriptionLines =
      doc.splitTextToSize(
        item.description || "-",
        90, // max description width
      );

    const rowHeight = Math.max(
      descriptionLines.length * 12 + 8,
      24,
    );

    if (y + rowHeight > pageHeight - 120) {
      doc.addPage();
      y = 40;
      drawTableHeader();
    }

    subtotal += item.amount;
    taxTotal += item.taxAmount;

    // Row Border
    doc.rect(
      margin,
      y,
      tableWidth,
      rowHeight,
    );

    let x = margin;

    // Vertical Lines
    columns.forEach((column) => {
      doc.line(
        x,
        y,
        x,
        y + rowHeight,
      );

      x += column.width;
    });

    doc.line(
      margin + tableWidth,
      y,
      margin + tableWidth,
      y + rowHeight,
    );

    const textY = y + 15;

    let currentX = margin;

    // Description
    doc.text(
      descriptionLines,
      currentX + 4,
      textY,
    );

    currentX += columns[0].width;

    // Qty
    doc.text(
      String(item.quantity ?? 0),
      currentX + columns[1].width - 5,
      textY,
      { align: "right" },
    );

    currentX += columns[1].width;

    // Unit Price
    doc.text(
      formatCurrency(item.unitPrice ?? 0),
      currentX + columns[2].width - 5,
      textY,
      { align: "right" },
    );

    currentX += columns[2].width;

    // Tax %
    doc.text(
      `${item.taxRate ?? 0}%`,
      currentX + columns[3].width - 5,
      textY,
      { align: "right" },
    );

    currentX += columns[3].width;

    // Amount
    doc.text(
      formatCurrency(item.amount),
      currentX + columns[4].width - 5,
      textY,
      { align: "right" },
    );

    currentX += columns[4].width;

    // Tax Amount
    doc.text(
      formatCurrency(item.taxAmount),
      currentX + columns[5].width - 5,
      textY,
      { align: "right" },
    );

    currentX += columns[5].width;

    // Total
    doc.text(
      formatCurrency(item.total),
      currentX + columns[6].width - 5,
      textY,
      { align: "right" },
    );

    y += rowHeight;
  });

  // =====================
  // TOTALS
  // =====================

  const grandTotal = items.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  y += 20;

  const totalBoxWidth = 220;
  const totalBoxX =
    pageWidth - margin - totalBoxWidth;

  doc.rect(
    totalBoxX,
    y,
    totalBoxWidth,
    70,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text("Subtotal", totalBoxX + 10, y + 18);

  doc.text(
    formatCurrency(subtotal),
    totalBoxX + totalBoxWidth - 10,
    y + 18,
    { align: "right" },
  );

  doc.text("Tax", totalBoxX + 10, y + 38);

  doc.text(
    formatCurrency(taxTotal),
    totalBoxX + totalBoxWidth - 10,
    y + 38,
    { align: "right" },
  );

  doc.setFontSize(12);

  doc.text(
    "Grand Total",
    totalBoxX + 10,
    y + 60,
  );

  doc.text(
    formatCurrency(grandTotal),
    totalBoxX + totalBoxWidth - 10,
    y + 60,
    { align: "right" },
  );

  doc.save(
    `${invoice.invoiceNumber || "invoice"}.pdf`,
  );
};