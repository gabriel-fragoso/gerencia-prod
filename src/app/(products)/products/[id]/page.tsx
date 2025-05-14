import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/services/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  let product;

  try {
    product = await api.getProduct(params.id);
  } catch (error) {
    if ((error as Error).message === 'Falha ao buscar produto') {
      notFound();
    }
    throw error;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/products" passHref>
          <Button variant="outline" className="flex items-center">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para Produtos
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                {product.category}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
            </div>

            <div className="mt-6 flex-grow">
              <h3 className="text-sm font-medium text-gray-900">Descrição</h3>
              <p className="mt-2 text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Adicionado em {formatDate(product.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
