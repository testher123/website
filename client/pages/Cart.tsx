import Layout from "@/components/Layout";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 2000;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Shopping Cart
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to add items to your cart
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Continue Shopping <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">
                            {item.name}
                          </h3>
                          <p className="text-primary font-bold text-lg">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 text-foreground hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 text-foreground hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-destructive hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-right text-foreground font-semibold">
                          Subtotal: ₦
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/products"
                  className="mt-8 inline-flex items-center gap-2 text-primary hover:text-primary-600 font-semibold transition-colors"
                >
                  Continue Shopping <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₦${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (7.5%)</span>
                      <span className="text-foreground font-medium">
                        ₦{tax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {shipping === 0 && (
                    <p className="text-sm text-green-600 bg-green-50 p-3 rounded mb-4">
                      ✓ Free shipping on orders over ₦50,000!
                    </p>
                  )}

                  <Link
                    to="/checkout"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="h-5 w-5" />
                  </Link>

                  <button className="w-full mt-3 border-2 border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                    Continue Shopping
                  </button>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-muted-foreground mb-3">
                      💳 Payment secured by OPay
                    </p>
                    <div className="flex gap-2">
                      <div className="flex-1 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-700">
                        OPay
                      </div>
                      <div className="flex-1 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-700">
                        Cards
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
