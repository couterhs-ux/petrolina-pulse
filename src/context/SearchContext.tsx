import { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react";

type SortBy = "relevance" | "rating" | "name";

interface SearchState {
  query: string;
  neighborhood: string;
  category: string | null;
  sortBy: SortBy;
  setQuery: (q: string) => void;
  setNeighborhood: (n: string) => void;
  setCategory: (c: string | null) => void;
  setSortBy: (s: SortBy) => void;
  clearFilters: () => void;
  scrollToResults: () => void;
  resultsRef: React.RefObject<HTMLDivElement>;
}

const SearchContext = createContext<SearchState | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [neighborhood, setNeighborhood] = useState("Todos");
  const [category, setCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const resultsRef = useRef<HTMLDivElement>(null);

  const clearFilters = useCallback(() => {
    setQuery("");
    setNeighborhood("Todos");
    setCategory(null);
    setSortBy("relevance");
  }, []);

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        neighborhood,
        category,
        sortBy,
        setQuery,
        setNeighborhood,
        setCategory,
        setSortBy,
        clearFilters,
        scrollToResults,
        resultsRef,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
};

// Helpers
export const filterBusinesses = <T extends { name: string; area: string; category: string; subcategory?: string; company?: string; rating?: number }>(
  items: T[],
  state: { query: string; neighborhood: string; category: string | null; sortBy: SortBy }
): T[] => {
  const q = state.query.trim().toLowerCase();
  let filtered = items.filter((item) => {
    if (state.neighborhood !== "Todos" && item.area !== state.neighborhood) return false;
    if (state.category && item.category !== state.category) return false;
    if (q) {
      const haystack = [item.name, item.area, item.category, item.subcategory, item.company]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (state.sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (state.sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }
  return filtered;
};
