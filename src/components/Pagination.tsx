'use client';

import React from 'react';
import { Button } from './ui/Button';
import { generatePaginationRange } from '@/lib/utils';
import { useProductFilters } from './ProductFiltersProvider';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages 
}) => {
  const { updateFilters } = useProductFilters();
  
  if (totalPages <= 1) {
    return null;
  }
  
  const pageNumbers = generatePaginationRange(currentPage, totalPages);
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateFilters({ page });
  };
  
  return (
    <nav className="flex justify-center mt-8" aria-label="Paginação">
      <ul className="flex items-center -space-x-px">
        <li>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            aria-label="Página anterior"
          >
            <span className="sr-only">Anterior</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </li>
        
        {pageNumbers.map((page) => (
          <li key={page}>
            <Button
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? 'primary' : 'outline'}
              className={`px-4 py-2 border ${
                currentPage === page
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          </li>
        ))}
        
        <li>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            aria-label="Próxima página"
          >
            <span className="sr-only">Próxima</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </li>
      </ul>
    </nav>
  );
}; 