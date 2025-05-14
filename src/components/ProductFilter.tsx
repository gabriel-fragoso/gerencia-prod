'use client';

import React, { useState, useEffect } from 'react';
import { Option, Select } from './ui/Select';
import { Input } from './ui/Input';
import { InputPrice } from './ui/InputPrice';
import { Button } from './ui/Button';
import { SortField } from '@/lib/types';
import { toggleSortDirection, debounce } from '@/lib/utils';
import { categories } from '@/lib/utils/mockData';
import { useProductFilters } from './ProductFiltersProvider';

const sortOptions: Option[] = [
  { value: 'name', label: 'Nome' },
  { value: 'price', label: 'Preço' },
  { value: 'category', label: 'Categoria' },
  { value: 'createdAt', label: 'Data' },
];

export const ProductFilter: React.FC = () => {
  const { filters, updateFilters } = useProductFilters();

  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [minPrice, setMinPrice] = useState<string>(
    filters.minPrice !== undefined ? filters.minPrice.toString() : ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    filters.maxPrice !== undefined ? filters.maxPrice.toString() : ''
  );

  const categoryOptions: Option[] = [
    { value: '', label: 'Todas as categorias' },
    ...categories.map((category) => ({
      value: category,
      label: category,
    })),
  ];

  const debouncedSearch = debounce((value: string) => {
    updateFilters({ search: value });
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
  };

  const applyPriceFilter = () => {
    const parsedMin = minPrice ? parseFloat(minPrice) : undefined;
    const parsedMax = maxPrice ? parseFloat(maxPrice) : undefined;

    updateFilters({
      minPrice: parsedMin,
      maxPrice: parsedMax,
    });
  };

  const clearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    updateFilters({
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFilters({
      category: value || undefined,
    });
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortField;
    updateFilters({
      sortField: value,
    });
  };

  const handleToggleSortDirection = () => {
    const currentDirection = filters.sortDirection || 'asc';
    updateFilters({
      sortDirection: toggleSortDirection(currentDirection),
    });
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    updateFilters({
      search: '',
      minPrice: undefined,
      maxPrice: undefined,
      category: undefined,
      sortField: 'name',
      sortDirection: 'asc',
    });
  };

  useEffect(() => {
    setSearchTerm(filters.search || '');
    setMinPrice(filters.minPrice !== undefined ? filters.minPrice.toString() : '');
    setMaxPrice(filters.maxPrice !== undefined ? filters.maxPrice.toString() : '');
  }, [filters]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Filtros</h3>

        <div>
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Faixa de Preço
          </label>
          <div className="flex flex-col items-center w-full gap-2">
            <InputPrice
              fullWidth
              placeholder="Mín"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <InputPrice
              fullWidth
              placeholder="Máx"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
            <Button className='w-full' size="sm" onClick={applyPriceFilter}>
              Aplicar
            </Button>
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <Button className='w-full' size="sm" variant="outline" onClick={clearPriceFilter}>
                Limpar
              </Button>
            )}
          </div>
        </div>

        <div>
          <Select
            label="Categoria"
            options={categoryOptions}
            value={filters.category || ''}
            onChange={handleCategoryChange}
            fullWidth
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ordenar Por
          </label>
          <div className="flex items-center space-x-2">
            <Select
              options={sortOptions}
              value={filters.sortField || 'name'}
              onChange={handleSortFieldChange}
              className="flex-1"
            />
            <Button
              onClick={handleToggleSortDirection}
              variant="secondary"
              aria-label={`Ordenar ${filters.sortDirection === 'asc' ? 'crescente' : 'decrescente'
                }`}
            >
              {filters.sortDirection === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            onClick={resetAllFilters}
            fullWidth
          >
            Limpar Todos os Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};
