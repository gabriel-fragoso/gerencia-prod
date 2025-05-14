import { create } from 'zustand';
import { Product, ProductFilters, PaginatedResponse } from '../types';

export type ApiStatus = 'idle' | 'loading' | 'connected' | 'error';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  apiStatus: ApiStatus;
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setPagination: (pagination: PaginatedResponse<Product>['meta']) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setApiStatus: (status: ApiStatus) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  apiStatus: 'idle',
  filters: {
    search: '',
    minPrice: undefined,
    maxPrice: undefined,
    category: undefined,
    sortField: 'name',
    sortDirection: 'asc',
    page: 1,
    limit: 8,
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 8,
  },
  
  setProducts: (products) => set({ products }),
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, product],
  })),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  
  setPagination: (pagination) => set({
    pagination,
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setApiStatus: (apiStatus) => set({ apiStatus }),
}));

export default useProductStore; 