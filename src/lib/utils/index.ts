import { SortDirection } from '../types';

/**
 * Formata preço para string de moeda (em formato brasileiro R$)
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Formata data para string localizada (português brasileiro)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Gera um intervalo de paginação para exibição
 */
export const generatePaginationRange = (
  currentPage: number,
  totalPages: number,
  maxRangeDisplay = 5
): number[] => {
  if (totalPages <= maxRangeDisplay) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  let startPage = Math.max(currentPage - Math.floor(maxRangeDisplay / 2), 1);
  const endPage = Math.min(startPage + maxRangeDisplay - 1, totalPages);
  
  if (endPage - startPage + 1 < maxRangeDisplay) {
    startPage = Math.max(endPage - maxRangeDisplay + 1, 1);
  }
  
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};

/**
 * Alterna direção de ordenação
 */
export const toggleSortDirection = (direction: SortDirection): SortDirection => {
  return direction === 'asc' ? 'desc' : 'asc';
};

/**
 * Função debounce para limitar a taxa na qual uma função pode ser disparada
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout | null = null;
  
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}; 