import { useState, useCallback } from "react";
import { searchStore, SearchResult, SearchHistory } from "@/store/search";

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<SearchHistory[]>(
    searchStore.getSearchHistory()
  );
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback((query: string) => {
    setIsSearching(true);
    const searchResults = searchStore.searchProducts(query);
    setResults(searchResults);
    setIsSearching(false);

    if (query.trim()) {
      searchStore.addToSearchHistory(query);
      setHistory(searchStore.getSearchHistory());
    }
  }, []);

  const clearHistory = useCallback(() => {
    searchStore.clearSearchHistory();
    setHistory([]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    searchStore.removeFromSearchHistory(id);
    setHistory(searchStore.getSearchHistory());
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    results,
    history,
    isSearching,
    search,
    clearHistory,
    removeFromHistory,
    clearResults,
  };
}
