import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CreditCard, CheckCircle, AlertCircle, IndianRupee } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface FeeStructure {
  id: number;
  courseCode: string;
  courseName: string;
  paymentPlan: string;
  amount: number;
  description: string | null;
}

const planLabels: Record<string, string> = {
  quarterly: "Quarterly",
  semester: "Per Semester",
  yearly: "Yearly",
  full_course: "Full Course",
};

const planDescriptions: Record<string, string> = {
  quarterly: "Pay every 3 months",
  semester: "Pay every semester",
  yearly: "Pay annually",
  full_course: "One-time payment for entire course",
};

function loadRazorpay(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function StudentFees() {
  const { student, token, isLoading } = useStudentAuth();
  const [, setLocation] = useLocation();
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState<number | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !student) setLocation("/student/login");
  }, [student, isLoading, setLocation]);

  useEffect(() => {
    if (!student) return;
    fetch(`${API_BASE}/fee-structures?courseCode=${student.courseCode}`)
      .then(r => r.json())
      .then(data => setFees(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [student]);

  const handlePayment = async (fee: FeeStructure) => {
    setError("");
    setSuccess("");
    setPaymentLoading(fee.id);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { setError("Failed to load payment gateway. Please try again."); return; }

      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ feeStructureId: fee.id, paymentPlan: fee.paymentPlan }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Failed to create order");

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Avviare Educational Hub",
        description: `${fee.courseName} - ${planLabels[fee.paymentPlan]}`,
        order_id: order.orderId,
        prefill: { name: order.studentName, email: order.studentEmail },
        theme: { color: "#1e3a5f" },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                paymentId: order.paymentId,
              }),
            });
            const result = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(result.error || "Verification failed");
            setSuccess(`Payment successful! Receipt No: ${result.receiptNumber}`);
          } catch (err: any) {
            setError(err.message || "Payment verification failed");
          } finally {
            setPaymentLoading(null);
          }
        },
        modal: {
          ondismiss: () => setPaymentLoading(null),
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Payment failed");
      setPaymentLoading(null);
    }
  };

  if (isLoading || !student) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[hsl(219,40%,16%)] border-t-transparent rounded-full" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Fee Payment</h1>
          <p className="text-gray-500 text-sm mt-1">Course: {student.course} ({student.courseCode})</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">Payment Successful!</p>
              <p className="text-sm text-green-700">{success}</p>
              <p className="text-sm text-green-700 mt-1">A receipt has been generated. <a href="/student/receipts" className="underline font-medium">View Receipts →</a></p>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Payment Failed</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-xl border h-40 animate-pulse" />)}
          </div>
        ) : fees.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No fee structure found for {student.courseCode}. Please contact the admissions office.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fees.map(fee => (
              <div key={fee.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[hsl(219,40%,40%)] hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-[hsl(219,40%,40%)] bg-[hsl(219,40%,16%)]/10 px-2 py-1 rounded-full">{planLabels[fee.paymentPlan]}</span>
                    <p className="text-sm text-gray-500 mt-2">{planDescriptions[fee.paymentPlan]}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-2xl font-bold text-gray-800">
                      <IndianRupee className="h-5 w-5" />
                      {fee.amount.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-gray-400">+ applicable taxes</p>
                  </div>
                </div>
                {fee.description && <p className="text-sm text-gray-500 mb-4">{fee.description}</p>}
                <button
                  onClick={() => handlePayment(fee)}
                  disabled={paymentLoading !== null}
                  className="w-full bg-[hsl(219,40%,16%)] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  {paymentLoading === fee.id ? "Processing..." : `Pay ₹${fee.amount.toLocaleString("en-IN")}`}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-700">
            <span className="font-semibold">🔒 Secure Payments:</span> All payments are processed securely via Razorpay. After successful payment, a receipt will be generated automatically. For any issues, contact the accounts office.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
