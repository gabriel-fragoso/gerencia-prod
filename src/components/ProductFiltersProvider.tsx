'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProductFilters } from '@/lib/types';

interface ProductFiltersContextType {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const ProductFiltersContext = createContext<ProductFiltersContextType | null>(null);

export const useProductFilters = () => {
  const context = useContext(ProductFiltersContext);
  if (!context) {
    throw new Error('useProductFilters deve ser usado dentro de um ProductFiltersProvider');
  }
  return context;
};

interface ProductFiltersProviderProps {
  children: ReactNode;
  initialFilters: ProductFilters;
}

export const ProductFiltersProvider: React.FC<ProductFiltersProviderProps> = ({ 
  children, 
  initialFilters 
}) => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const router = useRouter();
  const pathname = usePathname();

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    
    if (Object.keys(newFilters).some(key => key !== 'page')) {
      updatedFilters.page = 1;
    }

    setFilters(updatedFilters);
    
    const searchParams = new URLSearchParams();
    
    if (updatedFilters.search) {
      searchParams.set('search', updatedFilters.search);
    }
    
    if (updatedFilters.minPrice !== undefined) {
      searchParams.set('minPrice', updatedFilters.minPrice.toString());
    }
    
    if (updatedFilters.maxPrice !== undefined) {
      searchParams.set('maxPrice', updatedFilters.maxPrice.toString());
    }
    
    if (updatedFilters.category) {
      searchParams.set('category', updatedFilters.category);
    }
    
    if (updatedFilters.sortField) {
      searchParams.set('sortField', updatedFilters.sortField);
    }
    
    if (updatedFilters.sortDirection) {
      searchParams.set('sortDirection', updatedFilters.sortDirection);
    }
    
    if (updatedFilters.page !== undefined && updatedFilters.page > 1) {
      searchParams.set('page', updatedFilters.page.toString());
    }
    
    if (updatedFilters.limit !== undefined && updatedFilters.limit !== 8) {
      searchParams.set('limit', updatedFilters.limit.toString());
    }
    
    const url = `${pathname}?${searchParams.toString()}`;
    router.push(url);
  }, [filters, router, pathname]);

  return (
    <ProductFiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </ProductFiltersContext.Provider>
  );
}; 