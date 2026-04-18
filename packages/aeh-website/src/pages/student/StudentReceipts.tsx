import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Receipt, Download, CheckCircle, Clock, XCircle, IndianRupee, Eye } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Payment {
  id: number;
  receiptNumber: string;
  courseName: string;
  courseCode: string;
  paymentPlan: string;
  amount: number;
  status: string;
  razorpayPaymentId: string | null;
  razorpayOrderId: string | null;
  paidAt: string | null;
  createdAt: string;
  studentName: string;
  studentEmail: string;
  rollNumber: string;
}

const planLabels: Record<string, string> = {
  quarterly: "Quarterly (3 Months)",
  semester: "Semester Fee",
  yearly: "Annual Fee",
  full_course: "Full Course Fee",
};

const planDescriptions: Record<string, string> = {
  quarterly: "Fee for one quarter (3 months)",
  semester: "Fee for one complete semester",
  yearly: "Annual academic year fee",
  full_course: "One-time fee for entire course duration",
};

function generateReceiptHTML(p: Payment, studentName: string, rollNumber: string, course: string): string {
  const paidDate = p.paidAt
    ? new Date(p.paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "N/A";
  const createdDate = new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const academicYear = (() => {
    const d = p.paidAt ? new Date(p.paidAt) : new Date(p.createdAt);
    const yr = d.getFullYear();
    const month = d.getMonth();
    return month >= 6 ? `${yr}-${yr + 1}` : `${yr - 1}-${yr}`;
  })();
  const amountInWords = (n: number): string => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
      "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const convert = (num: number): string => {
      if (num < 20) return a[num];
      if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
      if (num < 1000) return a[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + convert(num % 100) : "");
      if (num < 100000) return convert(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + convert(num % 1000) : "");
      if (num < 10000000) return convert(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + convert(num % 100000) : "");
      return convert(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + convert(num % 10000000) : "");
    };
    return (convert(n) || "Zero") + " Rupees Only";
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fee Receipt - ${p.receiptNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', Times, serif; background: #f5f5f5; padding: 20px; color: #1a1a1a; }
    .page { background: white; max-width: 800px; margin: 0 auto; padding: 0; box-shadow: 0 2px 20px rgba(0,0,0,0.15); }

    /* HEADER */
    .header { background: #1e3a5f; color: white; padding: 0; }
    .header-top { display: flex; align-items: center; justify-content: space-between; padding: 20px 30px; border-bottom: 3px solid #b8860b; }
    .logo-circle { width: 70px; height: 70px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; color: #1e3a5f; flex-shrink: 0; border: 3px solid #b8860b; }
    .inst-name { text-align: center; flex: 1; padding: 0 20px; }
    .inst-name h1 { font-size: 24px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
    .inst-name .tagline { font-size: 11px; color: #d4af37; letter-spacing: 2px; margin-top: 3px; text-transform: uppercase; }
    .inst-name .address { font-size: 11px; color: #c8d8e8; margin-top: 4px; }
    .inst-name .contact { font-size: 10px; color: #a0b8cc; margin-top: 2px; }
    .receipt-badge { text-align: right; flex-shrink: 0; }
    .receipt-badge .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #d4af37; }
    .receipt-badge .number { font-size: 15px; font-weight: bold; font-family: 'Courier New', monospace; color: white; background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid #b8860b; margin-top: 4px; display: block; }

    .doc-title { background: #b8860b; text-align: center; padding: 8px; }
    .doc-title h2 { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; color: white; }

    /* STATUS BAR */
    .status-bar { display: flex; justify-content: space-between; align-items: center; padding: 10px 30px; background: #f0f4f8; border-bottom: 1px solid #dce6f0; }
    .status-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
    .status-chip.success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .status-chip.pending { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
    .status-chip.failed { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
    .date-info { font-size: 11px; color: #64748b; text-align: right; }
    .date-info strong { display: block; color: #374151; }

    /* CONTENT */
    .content { padding: 24px 30px; }
    .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #1e3a5f; font-weight: bold; border-bottom: 2px solid #1e3a5f; padding-bottom: 4px; margin-bottom: 12px; margin-top: 20px; }
    .section-title:first-child { margin-top: 0; }

    /* TABLES */
    table { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
    .info-table td { padding: 6px 8px; font-size: 13px; vertical-align: top; }
    .info-table td:first-child { color: #64748b; width: 160px; font-weight: normal; }
    .info-table td:nth-child(2) { color: #374151; width: 10px; }
    .info-table td:last-child { color: #111827; font-weight: 600; }
    .info-table tr:nth-child(odd) { background: #f8fafc; }

    .fee-table { border: 1px solid #e2e8f0; }
    .fee-table thead { background: #1e3a5f; color: white; }
    .fee-table thead th { padding: 8px 12px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
    .fee-table thead th:last-child { text-align: right; }
    .fee-table tbody tr { border-bottom: 1px solid #f1f5f9; }
    .fee-table tbody tr:last-child { border-bottom: none; }
    .fee-table tbody td { padding: 10px 12px; font-size: 13px; color: #374151; }
    .fee-table tbody td:last-child { text-align: right; font-weight: 600; }
    .fee-table tfoot { background: #1e3a5f; color: white; }
    .fee-table tfoot td { padding: 10px 12px; font-size: 14px; font-weight: bold; }
    .fee-table tfoot td:last-child { text-align: right; }

    .amount-words { background: #f0f4f8; border: 1px dashed #94a3b8; border-radius: 6px; padding: 8px 12px; margin-top: 8px; font-size: 12px; color: #374151; font-style: italic; }
    .amount-words strong { color: #1e3a5f; font-style: normal; }

    /* TRANSACTION */
    .txn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
    .txn-item { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
    .txn-item:nth-child(odd) { border-right: 1px solid #e2e8f0; }
    .txn-item label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 2px; }
    .txn-item span { font-size: 13px; font-weight: 600; color: #111827; font-family: 'Courier New', monospace; }

    /* SIGNATURE */
    .signature-area { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 30px; padding-top: 16px; border-top: 1px dashed #cbd5e1; }
    .sig-block { text-align: center; }
    .sig-line { border-bottom: 1px solid #374151; margin: 0 10px 6px; height: 40px; }
    .sig-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

    /* FOOTER */
    .footer { background: #f8fafc; border-top: 2px solid #1e3a5f; padding: 14px 30px; }
    .footer-note { font-size: 10px; color: #64748b; text-align: center; line-height: 1.6; }
    .footer-note strong { color: #374151; }
    .watermark { text-align: center; margin-top: 10px; }
    .watermark span { font-size: 11px; color: #94a3b8; font-style: italic; }
    .serial-bar { display: flex; justify-content: space-between; background: #1e3a5f; color: #94a3b8; padding: 6px 30px; font-size: 10px; font-family: 'Courier New', monospace; }

    /* PRINT BUTTON */
    .print-actions { text-align: center; padding: 20px; background: white; }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
    .btn-primary { background: #1e3a5f; color: white; margin-right: 10px; }
    .btn-secondary { background: #f1f5f9; color: #374151; border: 1px solid #e2e8f0; }

    @media print {
      body { padding: 0; background: white; }
      .page { box-shadow: none; }
      .print-actions { display: none; }
      .page { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <div class="header-top">
        <div class="logo-circle">AEH</div>
        <div class="inst-name">
          <h1>Avviare Educational Hub</h1>
          <div class="tagline">Inspiring Minds. Building Futures.</div>
          <div class="address">Near Bilaspur Railway Station, Bilaspur, Chhattisgarh - 495001</div>
          <div class="contact">Ph: +91 9876543210 | accounts@avviare.edu.in | www.avviare.edu.in</div>
        </div>
        <div class="receipt-badge">
          <div class="label">Receipt No.</div>
          <span class="number">${p.receiptNumber}</span>
        </div>
      </div>
      <div class="doc-title">
        <h2>Official Fee Payment Receipt</h2>
      </div>
    </div>

    <!-- STATUS BAR -->
    <div class="status-bar">
      <span class="status-chip ${p.status === "success" ? "success" : p.status === "pending" ? "pending" : "failed"}">
        ${p.status === "success" ? "✓ Payment Confirmed" : p.status === "pending" ? "⏳ Payment Pending" : "✗ Payment Failed"}
      </span>
      <div class="date-info">
        <strong>Date of Payment</strong>
        ${paidDate}
      </div>
    </div>

    <!-- CONTENT -->
    <div class="content">

      <!-- STUDENT INFORMATION -->
      <div class="section-title">Student Information</div>
      <table class="info-table">
        <tr><td>Student Name</td><td>:</td><td>${studentName}</td></tr>
        <tr><td>Roll Number</td><td>:</td><td>${rollNumber}</td></tr>
        <tr><td>Course</td><td>:</td><td>${p.courseName} (${p.courseCode})</td></tr>
        <tr><td>Academic Year</td><td>:</td><td>${academicYear}</td></tr>
        <tr><td>Email ID</td><td>:</td><td>${p.studentEmail || "N/A"}</td></tr>
      </table>

      <!-- FEE DETAILS -->
      <div class="section-title">Fee Details</div>
      <table class="fee-table">
        <thead>
          <tr>
            <th style="width:40px">#</th>
            <th>Description</th>
            <th>Payment Type</th>
            <th>Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${p.courseName}</td>
            <td>${planLabels[p.paymentPlan] || p.paymentPlan}</td>
            <td>₹ ${p.amount.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total Amount Paid</td>
            <td>₹ ${p.amount.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>
      <div class="amount-words">
        <strong>Amount in Words:</strong> ${amountInWords(p.amount)}
      </div>

      <!-- TRANSACTION DETAILS -->
      <div class="section-title">Transaction Details</div>
      <div class="txn-grid">
        <div class="txn-item"><label>Payment Mode</label><span>Online (Razorpay)</span></div>
        <div class="txn-item"><label>Receipt Number</label><span>${p.receiptNumber}</span></div>
        <div class="txn-item"><label>Razorpay Order ID</label><span>${p.razorpayOrderId || "N/A"}</span></div>
        <div class="txn-item"><label>Razorpay Payment ID</label><span>${p.razorpayPaymentId || "N/A"}</span></div>
        <div class="txn-item"><label>Payment Status</label><span>${p.status.toUpperCase()}</span></div>
        <div class="txn-item"><label>Payment Date & Time</label><span>${paidDate}</span></div>
        <div class="txn-item"><label>Receipt Generated On</label><span>${createdDate}</span></div>
        <div class="txn-item"><label>Currency</label><span>INR (Indian Rupee)</span></div>
      </div>

      <!-- AUTHORIZED SIGNATORIES -->
      <div class="signature-area">
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-label">Student Signature</div>
        </div>
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-label">Accounts Department</div>
        </div>
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-label">Authorised Signatory</div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-note">
        <strong>Important Notice:</strong> This is a computer-generated receipt and is valid without physical signature. |
        Retain this receipt for future reference. | For payment queries: accounts@avviare.edu.in | +91 9876543210<br/>
        <strong>Note:</strong> Fees once paid are non-refundable as per institutional policy. | This receipt is subject to clearance of online payment.
      </div>
      <div class="watermark">
        <span>Generated by Avviare Educational Hub Student Portal • ${new Date().toLocaleString("en-IN")}</span>
      </div>
    </div>
    <div class="serial-bar">
      <span>AEH/FEE/${p.receiptNumber}</span>
      <span>VERIFIED DIGITAL RECEIPT</span>
      <span>Page 1 of 1</span>
    </div>

    <!-- PRINT BUTTON (hidden in print) -->
    <div class="print-actions">
      <button class="btn btn-primary" onclick="window.print()">🖨️ Print Receipt</button>
      <button class="btn btn-secondary" onclick="window.close()">✕ Close</button>
    </div>
  </div>
</body>
</html>`;
}

export default function StudentReceipts() {
  const { student, token, isLoading } = useStudentAuth();
  const [, setLocation] = useLocation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewReceipt, setViewReceipt] = useState<Payment | null>(null);

  useEffect(() => {
    if (!isLoading && !student) setLocation("/student/login");
  }, [student, isLoading, setLocation]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/payments/my-payments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setPayments(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [token]);

  const openReceipt = (p: Payment) => {
    const html = generateReceiptHTML(p, student?.name || p.studentName || "N/A", student?.rollNumber || p.rollNumber || "N/A", student?.course || p.courseName || "N/A");
    const win = window.open("", "_blank", "width=900,height=700,scrollbars=yes");
    if (!win) { alert("Please allow popups to view receipt."); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
  };

  if (isLoading || !student) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-[hsl(219,40%,16%)] border-t-transparent rounded-full" />
    </div>
  );

  const successPayments = payments.filter(p => p.status === "success");
  const totalPaid = successPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Receipts</h1>
            <p className="text-gray-500 text-sm mt-1">Track all your fee payment history</p>
          </div>
          {successPayments.length > 0 && (
            <div className="text-right bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-xs text-green-600">Total Paid</p>
              <div className="flex items-center gap-0.5 text-xl font-bold text-green-700">
                <IndianRupee className="h-4 w-4" />
                {totalPaid.toLocaleString("en-IN")}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl border h-24 animate-pulse" />)}
          </div>
        ) : payments.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No payment records found</p>
            <p className="text-sm text-gray-400 mt-1">Your payment history will appear here once you make a payment.</p>
            <a href="/student/fees" className="inline-block mt-4 bg-[hsl(219,40%,16%)] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">Pay Fees Now</a>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${p.status === "success" ? "bg-green-100" : p.status === "pending" ? "bg-amber-100" : "bg-red-100"}`}>
                      {p.status === "success"
                        ? <CheckCircle className="h-5 w-5 text-green-600" />
                        : p.status === "pending"
                          ? <Clock className="h-5 w-5 text-amber-600" />
                          : <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-semibold text-gray-700">{p.receiptNumber}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === "success" ? "bg-green-100 text-green-700" : p.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{p.courseName} — {planLabels[p.paymentPlan] || p.paymentPlan}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.paidAt
                          ? `Paid on ${new Date(p.paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`
                          : `Initiated ${new Date(p.createdAt).toLocaleDateString("en-IN")}`}
                        {p.razorpayPaymentId && ` • ID: ${p.razorpayPaymentId}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:shrink-0">
                    <div className="flex items-center gap-0.5 text-lg font-bold text-gray-800">
                      <IndianRupee className="h-4 w-4" />
                      {p.amount.toLocaleString("en-IN")}
                    </div>
                    {p.status === "success" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => openReceipt(p)}
                          className="flex items-center gap-1.5 text-sm text-[hsl(219,40%,40%)] border border-[hsl(219,40%,40%)] px-3 py-1.5 rounded-lg hover:bg-[hsl(219,40%,40%)] hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" /> View
                        </button>
                        <button
                          onClick={() => openReceipt(p)}
                          className="flex items-center gap-1.5 text-sm bg-[hsl(219,40%,16%)] text-white px-3 py-1.5 rounded-lg hover:bg-[hsl(219,40%,24%)] transition-colors"
                        >
                          <Download className="h-4 w-4" /> Print
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Receipt Download:</span> Click "View" or "Print" on any successful payment to open a full college-format receipt. Use your browser's print dialog to save as PDF.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
