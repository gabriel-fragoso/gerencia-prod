import { ProductForm } from '@/components/ProductForm';
import { Suspense } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/api/categories`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Falha ao carregar categorias');
  }

  return response.json();
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Novo Produto</h1>
        <p className="text-gray-600 mt-2">Preencha o formulário abaixo para criar um novo produto.</p>
      </div>

      <Suspense fallback={<div>Carregando formulário...</div>}>
        <ProductForm categories={categories} />
      </Suspense>
    </div>
  );
}
