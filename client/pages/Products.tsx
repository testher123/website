import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Star, Filter, X, ShoppingBag } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { products, lightingCategories } from "@/data/products";
import { useCart } from "@/hooks/useCart";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState("popular");
  const { addItem } = useCart();

  const categories = [
    { id: "all", name: "All Products" },
    ...lightingCategories,
  ];

  const getCategoryCount = (categoryId: string) => {
    return products.filter((p) => p.category === categoryId).length;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [selectedCategory, priceRange]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "price-low") return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [filteredProducts, sortBy]);

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Our Products
            </h1>
            <p className="text-muted-foreground mt-2">
              Browse our complete catalog of quality products
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-20 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const count =
                        cat.id === "all"
                          ? products.length
                          : getCategoryCount(cat.id);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-primary text-white"
                              : "text-foreground hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{cat.name}</span>
                            <span
                              className={`text-sm ${
                                selectedCategory === cat.id
                                  ? "text-white"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {count}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Min</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Max</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-foreground hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>

              {/* Mobile Filters Modal */}
              {mobileFiltersOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={() => setMobileFiltersOpen(false)}
                  />
                  <div className="fixed left-0 top-0 h-full w-full max-w-xs bg-white overflow-y-auto z-50 p-4">
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="mb-4 p-2"
                    >
                      <X className="h-6 w-6" />
                    </button>

                    <div className="space-y-8">
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">
                          Categories
                        </h3>
                        <div className="space-y-2">
                          {categories.map((cat) => {
                            const count =
                              cat.id === "all"
                                ? products.length
                                : getCategoryCount(cat.id);
                            return (
                              <button
                                key={cat.id}
                                onClick={() => {
                                  setSelectedCategory(cat.id);
                                  setMobileFiltersOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                  selectedCategory === cat.id
                                    ? "bg-primary text-white"
                                    : "text-foreground hover:bg-gray-100"
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{cat.name}</span>
                                  <span
                                    className={`text-sm ${
                                      selectedCategory === cat.id
                                        ? "text-white"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {count}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">
                          Price Range
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-muted-foreground">
                              Min
                            </label>
                            <input
                              type="number"
                              value={priceRange[0]}
                              onChange={(e) =>
                                setPriceRange([
                                  parseInt(e.target.value),
                                  priceRange[1],
                                ])
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">
                              Max
                            </label>
                            <input
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([
                                  priceRange[0],
                                  parseInt(e.target.value),
                                ])
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">
                          Sort By
                        </h3>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="popular">Most Popular</option>
                          <option value="rating">Highest Rated</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {sortedProducts.length} products
                </p>
              </div>

              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1"
                      >
                        <div className={`${product.image} h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                          <ShoppingBag className="h-16 w-16 text-gray-400 opacity-30" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-1">
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
                              ({product.reviews})
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                            {product.specifications.brightness}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-xl font-bold text-primary">
                              ₦{product.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="p-4 pt-0">
                        <button
                          onClick={() => addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category,
                          })}
                          className="w-full bg-primary text-white p-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 font-semibold"
                        >
                          <ShoppingBag className="h-5 w-5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
