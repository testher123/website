import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  ShoppingBag,
  Zap,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
import { products } from "@/data/products";

export default function Index() {
  const featuredProducts = products.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    price: `₦${p.price.toLocaleString()}`,
    rating: p.rating,
    image: p.image,
  }));

  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Powered by OPay - Industry-leading payment security",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly across Nigeria",
    },
    {
      icon: Zap,
      title: "Instant Checkout",
      description: "Seamless payment experience with OPay integration",
    },
    {
      icon: ShoppingBag,
      title: "Wide Selection",
      description: "Thousands of products from trusted sellers",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-primary-50 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Illuminate Your Space with Style
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Discover premium lighting solutions from chandeliers to modern fixtures.
                Transform any room with our curated collection of elegant lights.
                Shop with confidence using secure OPay payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                >
                  Start Shopping <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  View Catalog
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary-200 to-primary-100 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <ShoppingBag className="h-32 w-32 text-primary-700 mx-auto opacity-20" />
                  <p className="text-primary-700 font-semibold mt-4">
                    Ready to Shop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose LightHub?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium lighting with expert curation, secure payments, and fast delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary-50">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-2">
                Check out our most popular items
              </p>
            </div>
            <Link
              to="/products"
              className="text-primary hover:text-primary-700 font-semibold flex items-center gap-2 transition-colors"
            >
              View All <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`${product.image} h-48 flex items-center justify-center`}>
                  <ShoppingBag className="h-16 w-16 text-gray-400 opacity-30" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary-600 transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPay Integration Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-700">
        <div className="mx-auto max-w-7xl">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Secure Payments with OPay
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              We use OPay, one of Africa's most trusted payment platforms, to
              ensure your transactions are safe, fast, and reliable. Your financial
              data is protected with industry-leading security standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <Check className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">PCI Compliant</h3>
                <p className="text-sm opacity-90">
                  Full PCI DSS compliance for payment security
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <Check className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Instant Transfers</h3>
                <p className="text-sm opacity-90">
                  Money reaches sellers' accounts instantly
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <Check className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm opacity-90">
                  Round-the-clock customer support available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our extensive catalog and find exactly what you're looking for.
            With secure OPay payments, you can shop with peace of mind.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors"
          >
            Start Shopping Now <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
