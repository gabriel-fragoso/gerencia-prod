import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <svg 
              className="h-8 w-8 mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20 8.5V16.5C20 18.433 18.433 20 16.5 20H7.5C5.567 20 4 18.433 4 16.5V7.5C4 5.567 5.567 4 7.5 4H15.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M18 10L16 8M16 8L14 6M16 8L18 6M16 8L14 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M8 14H12M8 17H16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
            <h1 className="text-xl font-bold text-white">GerenciaProd</h1>
          </Link>
          
          <nav className="flex space-x-4">
            <Link 
              href="/products" 
              className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Produtos
            </Link>
            <Link href="/products/new" passHref>
              <Button size="sm" className="bg-indigo-700 text-indigo-50 hover:bg-white hover:text-indigo-700 cursor-pointer">
                Novo Produto
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}; 