import { Product, ProductFilters, PaginatedResponse } from '../types'
import { cache } from 'react'
import { revalidatePath } from 'next/cache'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/**
 * Constrói uma string de consulta a partir de filtros
 */
const buildQueryString = (filters: ProductFilters): string => {
  const params = new URLSearchParams()

  if (filters.search) {
    params.append('search', filters.search)
  }

  if (filters.minPrice !== undefined) {
    params.append('minPrice', filters.minPrice.toString())
  }

  if (filters.maxPrice !== undefined) {
    params.append('maxPrice', filters.maxPrice.toString())
  }

  if (filters.category) {
    params.append('category', filters.category)
  }

  if (filters.sortField) {
    params.append('sortField', filters.sortField)
  }

  if (filters.sortDirection) {
    params.append('sortDirection', filters.sortDirection)
  }

  if (filters.page) {
    params.append('page', filters.page.toString())
  }

  if (filters.limit) {
    params.append('limit', filters.limit.toString())
  }

  return params.toString()
}

export const api = {
  /**
   * Busca produtos com filtragem e paginação (com cache)
   */
  getProducts: cache(
    async (
      filters: ProductFilters = {},
    ): Promise<PaginatedResponse<Product>> => {
      const queryString = buildQueryString(filters)
      const url = `${BASE_URL}/api/products${
        queryString ? `?${queryString}` : ''
      }`

      const response = await fetch(url, {
        next: {
          revalidate: 60,
        },
      })

      if (!response.ok) {
        throw new Error('Falha ao buscar produtos')
      }

      return response.json()
    },
  ),

  /**
   * Busca um produto pelo ID (com cache)
   */
  getProduct: cache(async (id: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) {
      throw new Error('Falha ao buscar produto')
    }

    return response.json()
  }),

  /**
   * Cria um novo produto (Server Action)
   */
  createProduct: async (
    productData: Omit<Product, 'id' | 'createdAt'>,
  ): Promise<Product> => {
    'use server'

    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    if (!response.ok) {
      throw new Error('Falha ao criar produto')
    }

    revalidatePath('/products')

    return response.json()
  },
}
