import { useState } from "react";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useNotifications } from "@/hooks/useNotifications";
import { usePromoCode } from "@/hooks/usePromoCode";
import { toast } from "sonner";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clear: clearCart, getTotal } = useCart();
  const { createOrder } = useOrders();
  const { addNotification } = useNotifications();
  const { appliedCode, error: promoError, validateAndApply, removeCode, clearError } = usePromoCode();

  const [step, setStep] = useState<"details" | "shipping" | "payment">(
    "details"
  );
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [promoCodeInput, setPromoCodeInput] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    shippingMethod: "standard",
  });

  const subtotal = getTotal();
  const shipping = formData.shippingMethod === "standard"
    ? 2000
    : formData.shippingMethod === "express"
    ? 5000
    : 10000;
  const discountAmount = appliedCode?.discountAmount || 0;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const tax = Math.round(subtotalAfterDiscount * 0.075);
  const cartTotal = subtotalAfterDiscount + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStepChange = (newStep: typeof step) => {
    setStep(newStep);
  };

  const handlePaymentInitiate = async () => {
    setLoading(true);
    setPaymentStatus("processing");

    try {
      // Simulate OPay API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order
      const order = createOrder({
        items,
        subtotal,
        shipping,
        tax,
        total: cartTotal,
        status: "pending",
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        shippingMethod: formData.shippingMethod as "standard" | "express" | "overnight",
        ...(appliedCode && {
          discount: {
            code: appliedCode.code,
            discountType: appliedCode.discountType,
            discountAmount: appliedCode.discountAmount,
          },
        }),
      });

      // Send notifications
      addNotification(
        "success",
        "Order Confirmed",
        `Your order ${order.orderNumber} has been placed successfully. You'll receive an email confirmation shortly.`,
        order.id
      );

      toast.success(`Order confirmed! Tracking number: ${order.trackingNumber}`);

      setPaymentStatus("success");
      clearCart();

      // Redirect to order tracking after 2 seconds
      setTimeout(() => {
        navigate(`/order/${order.id}`);
      }, 2000);
    } catch (error) {
      setPaymentStatus("error");
      addNotification(
        "error",
        "Payment Failed",
        "There was an issue processing your payment. Please try again."
      );
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndApply(promoCodeInput, subtotal);
    if (!promoError) {
      setPromoCodeInput("");
      toast.success("Promo code applied successfully!");
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Checkout
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Steps */}
            <div className="lg:col-span-2">
              {/* Step Indicators */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[
                    { id: "details", label: "Details" },
                    { id: "shipping", label: "Shipping" },
                    { id: "payment", label: "Payment" },
                  ].map((s, i, arr) => (
                    <div key={s.id} className="flex items-center flex-1">
                      <button
                        onClick={() =>
                          handleStepChange(s.id as typeof step)
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors ${
                          step === s.id
                            ? "bg-primary text-white"
                            : step > s.id ||
                              (step === "payment" && s.id !== "payment")
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step > s.id ||
                        (step === "payment" && s.id !== "payment") ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          i + 1
                        )}
                      </button>
                      <span className="ml-2 text-sm font-medium text-foreground">
                        {s.label}
                      </span>
                      {i < arr.length - 1 && (
                        <div className="flex-1 mx-3 h-1 bg-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Details */}
              {step === "details" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Billing & Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State/Region"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>

                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Postal Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleStepChange("shipping")}
                    className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Shipping <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Step 2: Shipping */}
              {step === "shipping" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Shipping Method
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        id: "standard",
                        name: "Standard Shipping",
                        desc: "5-7 business days",
                        price: 2000,
                      },
                      {
                        id: "express",
                        name: "Express Shipping",
                        desc: "2-3 business days",
                        price: 5000,
                      },
                      {
                        id: "overnight",
                        name: "Overnight Shipping",
                        desc: "Next business day",
                        price: 10000,
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.shippingMethod === method.id
                            ? "border-primary bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={handleInputChange}
                          className="h-4 w-4"
                        />
                        <div className="ml-4 flex-1">
                          <p className="font-semibold text-foreground">
                            {method.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {method.desc}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground">
                          ₦{method.price.toLocaleString()}
                        </p>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => handleStepChange("details")}
                      className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleStepChange("payment")}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === "payment" && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Payment Method
                  </h2>

                  {paymentStatus === "success" ? (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Payment Initiated
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        You will be redirected to OPay to complete your payment
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        Order Reference: ORD-{Date.now()}
                      </p>
                      <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                        Complete Payment with OPay
                      </button>
                    </div>
                  ) : paymentStatus === "error" ? (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                      <div className="flex gap-3">
                        <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-red-900">
                            Payment Failed
                          </h3>
                          <p className="text-sm text-red-700 mt-1">
                            There was an issue initiating the payment. Please
                            try again.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPaymentStatus("idle")}
                        className="mt-4 w-full border-2 border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                        <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">
                            Secure Payment with OPay
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            Your payment will be processed through OPay's secure
                            payment gateway with PCI DSS compliance.
                          </p>
                        </div>
                      </div>

                      {/* Promo Code Section */}
                      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-amber-900 mb-3">
                          Have a promo code?
                        </h3>
                        {appliedCode ? (
                          <div className="flex items-center justify-between p-3 bg-green-100 border border-green-300 rounded-lg">
                            <div>
                              <p className="text-sm font-semibold text-green-900">
                                {appliedCode.code}
                              </p>
                              <p className="text-xs text-green-700">
                                Discount: -₦{appliedCode.discountAmount.toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                removeCode();
                                setPromoCodeInput("");
                                clearError();
                              }}
                              className="p-1 text-green-700 hover:text-green-900 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter promo code"
                              value={promoCodeInput}
                              onChange={(e) => {
                                setPromoCodeInput(e.target.value.toUpperCase());
                                clearError();
                              }}
                              className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none ${
                                promoError ? "border-red-300" : "border-gray-300"
                              }`}
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                            >
                              Apply
                            </button>
                          </form>
                        )}
                        {promoError && (
                          <p className="text-xs text-red-600 mt-2">{promoError}</p>
                        )}
                      </div>

                      <div className="space-y-3 mb-6">
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked
                            className="h-4 w-4"
                          />
                          <div className="ml-4">
                            <p className="font-semibold text-foreground">
                              OPay Wallet
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Fast and secure payment via your OPay wallet
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            className="h-4 w-4"
                          />
                          <div className="ml-4">
                            <p className="font-semibold text-foreground">
                              Bank Transfer
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Transfer funds via bank account
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            className="h-4 w-4"
                          />
                          <div className="ml-4">
                            <p className="font-semibold text-foreground">
                              Card Payment
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Credit or debit card via OPay
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="mt-6 flex gap-4">
                        <button
                          onClick={() => handleStepChange("shipping")}
                          className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePaymentInitiate}
                          disabled={loading}
                          className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Pay ₦{cartTotal.toLocaleString()}
                              <ArrowRight className="h-5 w-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 max-h-48 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No items in cart</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-foreground font-medium">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {appliedCode && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>{appliedCode.code} Discount</span>
                      <span>-₦{appliedCode.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  {appliedCode && (
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="text-muted-foreground">Subtotal after discount</span>
                      <span className="text-foreground font-medium">
                        ₦{subtotalAfterDiscount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">
                      ₦{shipping.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (7.5%)</span>
                    <span className="text-foreground font-medium">
                      ₦{tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Secure payment with OPay
                  </div>
                </div>

                <Link
                  to="/products"
                  className="mt-4 block text-center text-sm text-primary hover:text-primary-600 font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
