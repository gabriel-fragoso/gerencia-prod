import React from 'react';
import { render } from '@testing-library/react';
import ProductsPage from '../page';
import { useProducts } from '@/lib/hooks/useProducts';

jest.mock('@/lib/hooks/useProducts', () => ({
  useProducts: jest.fn(),
}));

jest.mock('@/components/ProductFilter', () => ({
  ProductFilter: () => <div data-testid="product-filter">Product Filter</div>,
}));

jest.mock('@/components/ProductGrid', () => ({
  ProductGrid: ({ products, isLoading }: { products: any[]; isLoading: boolean }) => (
    <div data-testid="product-grid">
      Product Grid - {products.length} items, Loading: {isLoading ? 'true' : 'false'}
    </div>
  ),
}));

jest.mock('@/components/Pagination', () => ({
  Pagination: () => <div data-testid="pagination">Pagination</div>,
}));

describe('ProductsPage', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Test Product 1',
      category: 'Test Category',
      price: 99.99,
      description: 'This is a test product description',
      imageUrl: 'https://example.com/image1.jpg',
      createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Test Product 2',
      category: 'Another Category',
      price: 149.99,
      description: 'Another test product description',
      imageUrl: 'https://example.com/image2.jpg',
      createdAt: '2023-01-02T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    (useProducts as jest.Mock).mockReset();
  });

  it('renders products page with products', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      filters: {},
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        itemsPerPage: 8,
      },
    });

    const { container, getByText } = render(<ProductsPage />);

    expect(container).toMatchSnapshot();

    expect(getByText('Products')).toBeInTheDocument();

    expect(getByText('Product Grid - 2 items, Loading: false')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
      filters: {},
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 8,
      },
    });

    const { getByText } = render(<ProductsPage />);

    expect(getByText('Product Grid - 0 items, Loading: true')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: false,
      error: 'Failed to load products',
      filters: {},
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 8,
      },
    });

    const { getByText } = render(<ProductsPage />);

    expect(getByText('Error loading products')).toBeInTheDocument();
    expect(getByText('Failed to load products')).toBeInTheDocument();
  });
});
