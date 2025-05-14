import { setupWorker } from 'msw/browser';
import { http, HttpResponse, delay } from 'msw';
import { mockProducts } from '../utils/mockData';
import { Product, ProductFilters, PaginatedResponse } from '../types';

let products = [...mockProducts];

const filterProducts = (filters: ProductFilters): Product[] => {
  let result = [...products];
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    result = result.filter(
      (product) => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.minPrice !== undefined) {
    result = result.filter((product) => product.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    result = result.filter((product) => product.price <= filters.maxPrice!);
  }
  
  if (filters.category) {
    result = result.filter((product) => product.category === filters.category);
  }
  
  if (filters.sortField) {
    const { sortField, sortDirection = 'asc' } = filters;
    result.sort((a, b) => {
      const aValue = a[sortField as keyof Product];
      const bValue = b[sortField as keyof Product];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }
  
  return result;
};

const paginateResults = <T>(
  data: T[],
  page = 1,
  limit = 8
): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalItems: data.length,
      itemsPerPage: limit,
    },
  };
};

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    try {
      await delay(300);
      
      const url = new URL(request.url);
      const search = url.searchParams.get('search') || '';
      const minPrice = url.searchParams.get('minPrice')
        ? Number(url.searchParams.get('minPrice'))
        : undefined;
      const maxPrice = url.searchParams.get('maxPrice')
        ? Number(url.searchParams.get('maxPrice'))
        : undefined;
      const category = url.searchParams.get('category') || undefined;
      const sortField = url.searchParams.get('sortField') || 'name';
      const sortDirection = url.searchParams.get('sortDirection') || 'asc';
      const page = Number(url.searchParams.get('page') || '1');
      const limit = Number(url.searchParams.get('limit') || '8');
      
      const filters: ProductFilters = {
        search,
        minPrice,
        maxPrice,
        category,
        sortField: sortField as any,
        sortDirection: sortDirection as any,
        page,
        limit,
      };
      
      const filteredProducts = filterProducts(filters);
      const paginatedResponse = paginateResults(filteredProducts, page, limit);
      
      return HttpResponse.json(paginatedResponse);
    } catch (error) {
      console.error('Erro ao processar requisição GET /api/products:', error);
      return new HttpResponse(
        JSON.stringify({ message: 'Erro ao buscar produtos' }),
        { status: 500 }
      );
    }
  }),
  
  http.get('/api/products/:id', async ({ params }) => {
    try {
      await delay(300);
      
      const id = params.id as string;
      const product = products.find((p) => p.id === id);
      
      if (!product) {
        return new HttpResponse(
          JSON.stringify({ message: 'Produto não encontrado' }),
          { status: 404 }
        );
      }
      
      return HttpResponse.json(product);
    } catch (error) {
      console.error('Erro ao processar requisição GET /api/products/:id:', error);
      return new HttpResponse(
        JSON.stringify({ message: 'Erro ao buscar produto' }),
        { status: 500 }
      );
    }
  }),
  
  http.post('/api/products', async ({ request }) => {
    try {
      await delay(500);
      
      const body = await request.json() as Omit<Product, 'id' | 'createdAt'>;
      const newProduct: Product = {
        id: String(products.length + 1),
        createdAt: new Date().toISOString(),
        ...body,
      };
      
      products.push(newProduct);
      
      return HttpResponse.json(newProduct, { status: 201 });
    } catch (error) {
      console.error('Erro ao processar requisição POST /api/products:', error);
      return new HttpResponse(
        JSON.stringify({ message: 'Erro ao criar produto' }),
        { status: 500 }
      );
    }
  }),
];

let worker: ReturnType<typeof setupWorker> | null = null;

export const initMockApi = async () => {
  if (typeof window === 'undefined') {
    console.log('Ignorando inicialização da API mock no servidor');
    return;
  }
  
  try {
    if (!worker) {
      console.log('Criando worker MSW...');
      worker = setupWorker(...handlers);
    }
    
    await worker.stop();
    
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          scope: '/',
        },
      },
      quiet: false,
    });
    
    console.log('🔧 API mock iniciada com sucesso!');
    return worker;
  } catch (error) {
    console.error('❌ Falha ao iniciar API mock:', error);
    throw error;
  }
}; 