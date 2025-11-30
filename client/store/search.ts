import { products } from "@/data/products";

export interface SearchResult {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  matchType: "name" | "category" | "specification";
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: number;
}

const SEARCH_HISTORY_KEY = "search_history";

export const searchStore = {
  searchProducts(query: string): SearchResult[] {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: Map<string, SearchResult> = new Map();

    products.forEach((product) => {
      // Search by name
      if (product.name.toLowerCase().includes(lowerQuery)) {
        const key = product.id;
        if (!results.has(key)) {
          results.set(key, {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            rating: product.rating,
            reviews: product.reviews,
            matchType: "name",
          });
        }
      }

      // Search by category
      const categories = [product.category];
      if (
        categories.some((cat) =>
          cat.toLowerCase().includes(lowerQuery)
        )
      ) {
        const key = product.id;
        if (!results.has(key)) {
          results.set(key, {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            rating: product.rating,
            reviews: product.reviews,
            matchType: "category",
          });
        }
      }

      // Search by specifications
      const specs = Object.values(product.specifications).join(" ").toLowerCase();
      if (specs.includes(lowerQuery)) {
        const key = product.id;
        if (!results.has(key)) {
          results.set(key, {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            rating: product.rating,
            reviews: product.reviews,
            matchType: "specification",
          });
        }
      }
    });

    return Array.from(results.values());
  },

  addToSearchHistory(query: string): void {
    if (!query.trim()) return;

    const history = this.getSearchHistory();
    const filtered = history.filter((item) => item.query !== query);
    const newItem: SearchHistory = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
    };

    const updated = [newItem, ...filtered].slice(0, 10);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  },

  getSearchHistory(): SearchHistory[] {
    try {
      const data = localStorage.getItem(SEARCH_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  clearSearchHistory(): void {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  },

  removeFromSearchHistory(id: string): void {
    const history = this.getSearchHistory();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
  },
};
