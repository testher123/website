import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Star, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useSearch } from "@/hooks/useSearch";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { results, history, removeFromHistory, clearHistory, search } = useSearch();
  const { addItem } = useCart();
  const [showHistory, setShowHistory] = useState(!query);

  useEffect(() => {
    if (query) {
      search(query);
      setShowHistory(false);
    }
  }, [query, search]);

  const handleHistoryClick = (historyQuery: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("q", historyQuery);
    window.history.pushState({}, "", url);
    search(historyQuery);
    setShowHistory(false);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Search</h1>
            {query && (
              <p className="text-muted-foreground">
                Results for "<span className="font-semibold text-foreground">{query}</span>"
              </p>
            )}
          </div>

          {/* Search History */}
          {showHistory && history.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Searches
                </h2>
                <button
                  onClick={clearHistory}
                  className="text-sm text-primary hover:text-primary-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors cursor-pointer group"
                  >
                    <button
                      onClick={() => handleHistoryClick(item.query)}
                      className="flex-1 text-left font-medium text-foreground group-hover:text-primary transition-colors"
                    >
                      {item.query}
                    </button>
                    <button
                      onClick={() => removeFromHistory(item.id)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div>
              {results.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Found {results.length} {results.length === 1 ? "product" : "products"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((product) => (
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
                            <p className="text-xs text-muted-foreground mb-3">
                              {product.category}
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
                </div>
              ) : (
                <div className="text-center py-16">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    No products found
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We couldn't find any products matching "{query}". Try different keywords or browse our categories.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!query && history.length === 0 && (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Start Searching
              </h2>
              <p className="text-muted-foreground mb-8">
                Enter a product name or keyword in the search bar above to find what you're looking for.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
