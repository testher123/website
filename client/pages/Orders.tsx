import Layout from "@/components/Layout";
import { useOrders } from "@/hooks/useOrders";
import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function Orders() {
  const { orders } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "out_for_delivery":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "out_for_delivery":
        return <MapPin className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              My Orders
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your orders
            </p>
          </div>
        </div>

        {/* Orders Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No orders yet
              </h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to place your first order
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Start Shopping <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">
                        Order {order.orderNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div
                      className={`mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {formatStatus(order.status)}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="font-semibold text-foreground mb-3">
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-foreground">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="text-muted-foreground">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">
                          ₦{order.subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">
                          ₦{order.shipping.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="text-foreground">
                          ₦{order.tax.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        Total
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ₦{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="p-6 flex gap-3">
                    <Link
                      to={`/order/${order.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                    >
                      Track Order <Truck className="h-5 w-5" />
                    </Link>
                    {order.status !== "delivered" &&
                      order.status !== "cancelled" && (
                        <button className="flex-1 border-2 border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                          Cancel Order
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
