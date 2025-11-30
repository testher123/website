import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import NotificationCenter from "./NotificationCenter";

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
}

export default function Layout({ children, showSearch = true }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const shouldShowSearch = showSearch && !isHomePage;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
                💡
              </div>
              <span className="hidden sm:inline text-lg font-bold text-foreground">
                LightHub
              </span>
            </Link>

            {/* Search Bar */}
            {shouldShowSearch && (
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 max-w-md">
                <div className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:border-primary transition-colors focus-within:border-primary focus-within:bg-white">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </form>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/orders"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                My Orders
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <NotificationCenter />
              <Link
                to="/cart"
                className="relative p-2 text-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {getItemCount()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-gray-200 py-4 space-y-3">
              {shouldShowSearch && (
                <form onSubmit={handleSearch} className="px-3 mb-3">
                  <div className="border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-2 hover:border-primary transition-colors focus-within:border-primary focus-within:bg-white">
                    <Search className="h-4 w-4 text-gray-400 ml-2" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none py-2"
                    />
                  </div>
                </form>
              )}
              <Link
                to="/products"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-primary-50 rounded-lg transition-colors"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-primary-50 rounded-lg transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/orders"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-primary-50 rounded-lg transition-colors"
              >
                My Orders
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-primary-50 rounded-lg transition-colors"
              >
                About
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">LightHub</h3>
              <p className="text-sm text-muted-foreground">
                Premium lighting solutions for every space. Chandeliers, lamps, and fixtures for home and office.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/products" className="hover:text-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="hover:text-primary transition-colors">
                    Deals & Offers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 LightHub. All rights reserved. Powered by secure OPay payments.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
