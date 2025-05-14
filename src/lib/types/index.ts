/**
 * Interface que define a estrutura de um produto
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

/**
 * Campos pelos quais produtos podem ser ordenados
 */
export type SortField = 'name' | 'price' | 'category' | 'createdAt';

/**
 * Direções possíveis para ordenação
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Interface para definir filtros de busca de produtos
 */
export interface ProductFilters {
  search?: string;        
  minPrice?: number;       
  maxPrice?: number;       
  category?: string;       
  sortField?: SortField;   
  sortDirection?: SortDirection;
  page?: number;         
  limit?: number;         
}

/**
 * Interface para resposta paginada da API
 */
export interface PaginatedResponse<T> {
  data: T[];              
  meta: {
    currentPage: number; 
    totalPages: number;  
    totalItems: number;   
    itemsPerPage: number; 
  };
} 