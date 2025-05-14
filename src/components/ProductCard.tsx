import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, category, price, description, imageUrl, createdAt } = product;
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg hover:translate-y-[-4px]">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-64 relative">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${id}`} className="hover:text-indigo-600">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        
        <div className="flex flex-1 flex-col justify-between">
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <p className="text-base font-medium text-gray-900">{formatPrice(price)}</p>
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
              {category}
            </span>
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            Adicionado em {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}; 