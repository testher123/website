import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useOrders } from "@/hooks/useOrders";
import { useNotifications } from "@/hooks/useNotifications";
import {
  ArrowLeft,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder } = useOrders();
  const { addNotification } = useNotifications();

  const order = getOrder(orderId || "");

  if (!order) {
    return (
      <Layout>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Order not found
            </h1>
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Orders
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getLatLngBounds = (lat: number, lng: number) => {
    const baseLat = 6.5244; // Lagos
    const baseLng = 3.3792;
    const deliveryLat = 9.0765; // Abuja
    const deliveryLng = 7.3986;

    if (order.status === "delivered") {
      return { lat: deliveryLat, lng: deliveryLng };
    }

    // Interpolate based on status
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "out_for_delivery",
    ];
    const statusIndex = statuses.indexOf(order.status);
    const progress = statusIndex / (statuses.length - 1);

    return {
      lat: baseLat + (deliveryLat - baseLat) * progress,
      lng: baseLng + (deliveryLng - baseLng) * progress,
    };
  };

  const currentPosition = getLatLngBounds(0, 0);

  const statuses = [
    { key: "pending", label: "Order Confirmed", icon: Package },
    { key: "processing", label: "Processing", icon: Package },
    { key: "shipped", label: "Shipped", icon: Package },
    { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.key === order.status);

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => navigate("/orders")}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-semibold mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Orders
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Track Order {order.orderNumber}
            </h1>
            <p className="text-muted-foreground mt-2">
              Tracking Number: {order.trackingNumber}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Status & Timeline */}
            <div className="lg:col-span-2">
              {/* Interactive Map Simulation */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden mb-8 border border-blue-200">
                <div className="aspect-video relative flex items-center justify-center bg-gradient-to-b from-sky-100 to-blue-100">
                  {/* Map Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                      }}
                    />
                  </div>

                  {/* Map Elements */}
                  <div className="absolute inset-0">
                    {/* Start Point - Lagos */}
                    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-blue-200" />
                      <p className="text-xs font-semibold text-blue-900 mt-2 whitespace-nowrap">
                        Lagos Warehouse
                      </p>
                    </div>

                    {/* End Point - Abuja */}
                    <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
                      <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-green-200" />
                      <p className="text-xs font-semibold text-green-900 mt-2 whitespace-nowrap">
                        Delivery Destination
                      </p>
                    </div>

                    {/* Route Line */}
                    <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                      <line
                        x1="25%"
                        y1="25%"
                        x2="75%"
                        y2="75%"
                        stroke="rgba(59, 130, 246, 0.3)"
                        strokeWidth="3"
                      />
                      {/* Progress Line */}
                      {currentStatusIndex >= 0 && (
                        <line
                          x1="25%"
                          y1="25%"
                          x2={`${25 + (50 * currentStatusIndex) / 4}%`}
                          y2={`${25 + (50 * currentStatusIndex) / 4}%`}
                          stroke="rgba(34, 197, 94, 0.6)"
                          strokeWidth="3"
                        />
                      )}
                    </svg>

                    {/* Current Position */}
                    <div
                      className="absolute w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                      style={{
                        left: `${25 + (50 * currentStatusIndex) / 4}%`,
                        top: `${25 + (50 * currentStatusIndex) / 4}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Map Info */}
                {order.currentLocation && (
                  <div className="bg-white border-t border-blue-200 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Current Location
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.currentLocation.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Lat: {order.currentLocation.lat.toFixed(4)}, Lng:{" "}
                          {order.currentLocation.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Timeline */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Delivery Timeline
                </h2>
                <div className="space-y-4">
                  {statuses.map((status, index) => {
                    const Icon = status.icon;
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div key={status.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCompleted
                                ? "bg-primary border-primary text-white"
                                : "bg-gray-100 border-gray-300 text-muted-foreground"
                            } ${isCurrent ? "ring-4 ring-primary ring-opacity-30" : ""}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          {index < statuses.length - 1 && (
                            <div
                              className={`w-1 h-16 mt-2 ${
                                isCompleted
                                  ? "bg-primary"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                        <div className="pt-2 pb-4">
                          <p
                            className={`font-semibold ${
                              isCompleted
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {status.label}
                          </p>

                          {/* Show history for completed statuses */}
                          {order.statusHistory[index] && (
                            <div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {order.statusHistory[index].message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(
                                  order.statusHistory[index].timestamp
                                ).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          )}

                          {/* Show estimate for future statuses */}
                          {!isCompleted && index === currentStatusIndex + 1 && (
                            <p className="text-sm text-primary font-semibold mt-1">
                              Expected soon
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Order Details */}
            <div className="space-y-6">
              {/* Estimated Delivery */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Estimated Delivery
                </h3>
                <p className="text-2xl font-bold text-green-700">
                  {new Date(order.estimatedDelivery).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {order.shippingMethod === "standard"
                    ? "Standard Shipping (5-7 days)"
                    : order.shippingMethod === "express"
                    ? "Express Shipping (2-3 days)"
                    : "Overnight Shipping"}
                </p>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Shipping Address
                </h3>
                <p className="text-foreground font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {order.shippingAddress.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {order.shippingAddress.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {order.shippingAddress.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Order Summary
                </h3>
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
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">
                    ₦{order.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Help */}
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
