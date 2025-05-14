import React from 'react';

export default function ProductsLoading() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mb-4 sm:mb-0"></div>
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 min-h-[400px] animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 mb-6 rounded"></div>
            <div className="h-10 w-full bg-gray-200 mb-4 rounded"></div>
            <div className="h-20 w-full bg-gray-200 mb-4 rounded"></div>
            <div className="h-12 w-full bg-gray-200 mb-4 rounded"></div>
            <div className="h-12 w-full bg-gray-200 mb-4 rounded"></div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-lg">
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 