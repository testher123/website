import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { products, lightingCategories } from "@/data/products";
import { Star, ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id || "0"));
  const categoryName = lightingCategories.find(
    (c) => c.id === product?.category
  )?.name;

  if (!product) {
    return (
      <Layout>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-primary hover:underline">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/products" className="text-primary hover:underline">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                to={`/products?category=${product.category}`}
                className="text-primary hover:underline"
              >
                {categoryName}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-semibold">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex flex-col items-center">
              <div
                className={`${product.image} w-full aspect-square rounded-lg flex items-center justify-center mb-6`}
              >
                <ShoppingCart className="h-32 w-32 text-gray-400 opacity-30" />
              </div>
              <div className="flex gap-2 w-full">
                <div className={`${product.image} flex-1 h-20 rounded border-2 border-primary cursor-pointer`} />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-primary font-semibold mb-2">
                  {categoryName}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-foreground">
                      Wattage
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.specifications.wattage}
                    </span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-foreground">
                      Color Temperature
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.specifications.colorTemperature}
                    </span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-foreground">
                      Brightness
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.specifications.brightness}
                    </span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-foreground">
                      Voltage
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.specifications.voltage}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-foreground">
                      Dimensions
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.specifications.dimensions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-white transition-all ${
                    addedToCart
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-primary hover:bg-primary-600"
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors">
                  <Heart className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  ✓ Secure payment with OPay
                </p>
                <p className="text-sm text-blue-900 mt-1">
                  ✓ Fast delivery across Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Products in {categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className={`${p.image} h-48 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <ShoppingCart className="h-16 w-16 text-gray-400 opacity-30" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(p.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({p.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="font-bold text-primary">
                          ₦{p.price.toLocaleString()}
                        </span>
                        <button className="bg-primary text-white p-2 rounded hover:bg-primary-600 transition-colors">
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
