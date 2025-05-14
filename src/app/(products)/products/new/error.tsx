'use client';

import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Erro na página de criação de produtos:', error);
  }, [error]);

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 p-4">
            <svg
              className="h-10 w-10 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Algo deu errado
        </h2>
        
        <p className="text-gray-600 mb-8">
          Não foi possível carregar o formulário de criação de produtos. {error.message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Tentar novamente
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/products'}
          >
            Voltar para Produtos
          </Button>
        </div>
      </div>
    </div>
  );
} 