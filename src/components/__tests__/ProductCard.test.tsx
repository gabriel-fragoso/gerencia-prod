import React from 'react';
import { render } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { Product } from '@/lib/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

jest.mock('@/lib/utils', () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  formatDate: (date: string) => 'January 1, 2023',
}));

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    category: 'Test Category',
    price: 99.99,
    description: 'This is a test product description',
    imageUrl: 'https://example.com/image.jpg',
    createdAt: '2023-01-01T00:00:00.000Z',
  };

  it('renders correctly', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    expect(container).toMatchSnapshot();
  });

  it('displays product information correctly', () => {
    const { getByText } = render(<ProductCard product={mockProduct} />);
    
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('Test Category')).toBeInTheDocument();
    expect(getByText('$99.99')).toBeInTheDocument();
    expect(getByText('This is a test product description')).toBeInTheDocument();
    expect(getByText('Added on January 1, 2023')).toBeInTheDocument();
  });
}); 