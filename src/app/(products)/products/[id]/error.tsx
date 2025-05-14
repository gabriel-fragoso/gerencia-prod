'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erro ao carregar produto:', error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-red-100 p-4">
          <svg
            className="h-12 w-12 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
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
        Falha ao carregar produto
      </h2>
      
      <p className="text-gray-600 mb-8">
        {error.message || 'Ocorreu um erro ao carregar os detalhes do produto.'}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={reset}>
          Tentar novamente
        </Button>
        <Link href="/products" passHref>
          <Button variant="outline">
            Voltar para a lista de produtos
          </Button>
        </Link>
      </div>
    </div>
  );
} 