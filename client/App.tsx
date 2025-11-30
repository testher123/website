import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Categories from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";
import Search from "./pages/Search";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProductManagement from "./pages/Admin/ProductManagement";
import { OrderManagement } from "./pages/Admin/OrderManagement";
import { PromoCodeManagement } from "./pages/Admin/PromoCodeManagement";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:orderId" element={<OrderTracking />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="products" replace />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="promocodes" element={<PromoCodeManagement />} />
              </Route>

              {/* Placeholder Routes */}
              <Route
                path="/about"
                element={
                  <Placeholder
                    title="About TradeHub"
                    description="Learn more about our mission and values"
                  />
                }
              />
              <Route
                path="/contact"
                element={
                  <Placeholder
                    title="Contact Us"
                    description="Get in touch with our support team"
                  />
                }
              />
              <Route
                path="/deals"
                element={
                  <Placeholder
                    title="Deals & Offers"
                    description="Discover special offers and discounts"
                  />
                }
              />
              <Route
                path="/faq"
                element={
                  <Placeholder
                    title="Frequently Asked Questions"
                    description="Find answers to common questions"
                  />
                }
              />
              <Route
                path="/privacy"
                element={
                  <Placeholder
                    title="Privacy Policy"
                    description="Our privacy and data protection policy"
                  />
                }
              />
              <Route
                path="/terms"
                element={
                  <Placeholder
                    title="Terms of Service"
                    description="Our terms and conditions"
                  />
                }
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
