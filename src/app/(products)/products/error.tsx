'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-200 my-8">
      <div className="text-red-500 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao Carregar Produtos</h2>
      
      <p className="text-gray-600 mb-6 text-center max-w-md">
        {error.message || 'Ocorreu um erro ao carregar os produtos.'}
      </p>
      
      <div className="flex space-x-4">
        <Button onClick={reset} variant="primary">
          Tentar Novamente
        </Button>
        
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
        >
          Recarregar Página
        </Button>
      </div>
    </div>
  );
} 