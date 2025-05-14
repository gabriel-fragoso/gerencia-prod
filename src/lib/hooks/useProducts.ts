import { useCallback, useEffect } from 'react';
import useProductStore from '../store/productStore';
import { api } from '../services/api';
import { ProductFilters, Product } from '../types';

/**
 * Hook personalizado para gerenciar produtos com filtragem, ordenação e paginação
 */
export const useProducts = () => {
  const {
    products,
    isLoading,
    error,
    apiStatus,
    filters,
    pagination,
    setProducts,
    setFilters,
    setPagination,
    setLoading,
    setError,
    setApiStatus,
    addProduct,
  } = useProductStore();
  
  /**
   * Buscar produtos com base nos filtros atuais
   */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      setApiStatus('loading');
      
      const response = await api.getProducts(filters);
      
      setProducts(response.data);
      setPagination(response.meta);
      
      setApiStatus('connected');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ocorreu um erro';
      setError(errorMsg);
      
      setApiStatus('error');
      console.error('Erro ao buscar produtos:', errorMsg);
    } finally {
      setLoading(false);
    }
  }, [filters, setError, setLoading, setPagination, setProducts, setApiStatus]);
  
  /**
   * Atualizar filtros e acionar uma nova busca
   */
  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      if (Object.keys(newFilters).some(key => key !== 'page')) {
        setFilters({ ...newFilters, page: 1 });
      } else {
        setFilters(newFilters);
      }
    },
    [setFilters]
  );
  
  /**
   * Criar um novo produto
   */
  const createProduct = useCallback(
    async (productData: Omit<Product, 'id' | 'createdAt'>) => {
      try {
        setLoading(true);
        setError(null);
        setApiStatus('loading');
        
        const newProduct = await api.createProduct(productData);
        
        addProduct(newProduct);
        setApiStatus('connected');
        
        return newProduct;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Falha ao criar produto';
        setError(errorMessage);
        setApiStatus('error');
        console.error('Erro ao criar produto:', errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [addProduct, setError, setLoading, setApiStatus]
  );
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return {
    products,
    isLoading,
    error,
    apiStatus,
    filters,
    pagination,
    updateFilters,
    createProduct,
    fetchProducts,
  };
}; 