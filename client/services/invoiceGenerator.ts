import { Order } from "@/types/index";

export interface InvoiceData {
  order: Order;
}

export const invoiceGenerator = {
  generateInvoiceHTML(data: InvoiceData): string {
    const { order } = data;
    const discountAmount = order.discount?.discountAmount || 0;
    const subtotalAfterDiscount = order.subtotal - discountAmount;

    const itemsHTML = order.items
      .map(
        (item) =>
          `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">×${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${item.price.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${order.orderNumber}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f9fafb;
      color: #111827;
    }
    .container {
      max-width: 850px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      border-bottom: 2px solid #f3f4f6;
      padding-bottom: 30px;
    }
    .logo-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 24px;
    }
    .company-name {
      font-size: 24px;
      font-weight: bold;
      color: #111827;
    }
    .invoice-details {
      text-align: right;
    }
    .invoice-details h2 {
      margin: 0 0 10px 0;
      color: #111827;
      font-size: 20px;
    }
    .invoice-details p {
      margin: 5px 0;
      color: #6b7280;
      font-size: 14px;
    }
    .info-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
    }
    .info-block h3 {
      margin: 0 0 15px 0;
      color: #374151;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-block p {
      margin: 8px 0;
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th {
      background-color: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 14px;
      border-bottom: 2px solid #e5e7eb;
    }
    .summary {
      display: grid;
      grid-template-columns: 1fr 250px;
      gap: 40px;
      margin-bottom: 40px;
      border-top: 2px solid #f3f4f6;
      padding-top: 30px;
    }
    .summary-section {
      text-align: right;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      color: #6b7280;
    }
    .summary-row.discount {
      color: #10b981;
      font-weight: 600;
    }
    .summary-row.total {
      padding: 15px 0;
      font-size: 18px;
      font-weight: bold;
      color: #111827;
      border-top: 2px solid #e5e7eb;
      border-bottom: 2px solid #e5e7eb;
    }
    .footer {
      text-align: center;
      padding-top: 30px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 12px;
    }
    .note {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 12px;
      margin-bottom: 20px;
      color: #1e40af;
      font-size: 13px;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-section">
        <div class="logo">💡</div>
        <div class="company-name">LightHub</div>
      </div>
      <div class="invoice-details">
        <h2>INVOICE</h2>
        <p><strong>Order #:</strong> ${order.orderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
    </div>

    <div class="info-section">
      <div class="info-block">
        <h3>Bill To</h3>
        <p>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</p>
        <p>${order.shippingAddress.email}</p>
        <p>${order.shippingAddress.phone}</p>
        <p>${order.shippingAddress.address}</p>
        <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
      </div>
      <div class="info-block">
        <h3>Order Details</h3>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString()}</p>
        <p><strong>Shipping Method:</strong> ${order.shippingMethod.charAt(0).toUpperCase() + order.shippingMethod.slice(1)}</p>
        <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th style="text-align: center;">Quantity</th>
          <th style="text-align: right;">Unit Price</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <div class="summary">
      <div></div>
      <div class="summary-section">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>₦${order.subtotal.toLocaleString()}</span>
        </div>
        ${order.discount ? `
          <div class="summary-row discount">
            <span>${order.discount.code} (${order.discount.discountType === 'percentage' ? Math.round((order.discount.discountAmount / order.subtotal) * 100) + '%' : 'Fixed'}):</span>
            <span>-₦${order.discount.discountAmount.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span>Subtotal after discount:</span>
            <span>₦${subtotalAfterDiscount.toLocaleString()}</span>
          </div>
        ` : ''}
        <div class="summary-row">
          <span>Shipping:</span>
          <span>₦${order.shipping.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Tax (7.5%):</span>
          <span>₦${order.tax.toLocaleString()}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>₦${order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <div class="note">
      ✓ Payment processed securely by OPay | Thank you for your purchase!
    </div>

    <div class="footer">
      <p>LightHub © ${new Date().getFullYear()} | Premium Lighting Solutions</p>
      <p>For support, contact: support@lighthub.com</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  },

  generatePDF(invoiceHTML: string, fileName: string): void {
    const element = document.createElement("div");
    element.innerHTML = invoiceHTML;
    document.body.appendChild(element);

    const printWindow = window.open("", "", "width=850,height=1100");
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }

    document.body.removeChild(element);
  },

  openInvoicePreview(invoiceHTML: string): void {
    const previewWindow = window.open("", "invoice_preview", "width=900,height=1200");
    if (previewWindow) {
      previewWindow.document.write(invoiceHTML);
      previewWindow.document.close();
      previewWindow.focus();
    }
  },

  downloadInvoiceHTML(invoiceHTML: string, fileName: string): void {
    const blob = new Blob([invoiceHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  downloadInvoicePDF(order: Order): void {
    const invoiceHTML = this.generateInvoiceHTML({ order });
    const fileName = `invoice_${order.orderNumber}_${new Date().getTime()}.html`;
    this.downloadInvoiceHTML(invoiceHTML, fileName);
  },
};
