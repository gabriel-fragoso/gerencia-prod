import React, { Suspense } from 'react';
import Link from 'next/link';
import { ProductFilter } from '@/components/ProductFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { Pagination } from '@/components/Pagination';
import { api } from '@/lib/services/api';
import { ProductFiltersProvider } from '@/components/ProductFiltersProvider';

interface ProductsPageProps {
  searchParams: {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    sortField?: string;
    sortDirection?: string;
    page?: string;
    limit?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const filters = {
    search: params.search || '',
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    category: params.category,
    sortField: params.sortField as any || 'name',
    sortDirection: params.sortDirection as any || 'asc',
    page: params.page ? Number(params.page) : 1,
    limit: params.limit ? Number(params.limit) : 8,
  };

  const productsData = await api.getProducts(filters);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Produtos</h1>
        <div className="inline-flex rounded-md shadow">
          <Link
            href="/products/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <svg
              className="-ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Adicionar Produto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProductFiltersProvider initialFilters={filters}>
          <div className="md:col-span-1">
            <Suspense fallback={<div className="h-[500px] animate-pulse bg-gray-100 rounded-lg"></div>}>
              <ProductFilter />
            </Suspense>
          </div>

          <div className="md:col-span-3">
            <Suspense fallback={<div className="h-[500px] animate-pulse bg-gray-100 rounded-lg"></div>}>
              <ProductGrid products={productsData.data} />
              <Pagination
                currentPage={productsData.meta.currentPage}
                totalPages={productsData.meta.totalPages}
              />
            </Suspense>
          </div>
        </ProductFiltersProvider>
      </div>
    </div>
  );
}
