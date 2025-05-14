import { NextResponse, NextRequest } from 'next/server'
import { ProductFilters, Product, SortDirection, SortField } from '@/lib/types'
import { products } from '../db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filters: ProductFilters = {
    search: searchParams.get('search') || undefined,
    minPrice: searchParams.has('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined,
    maxPrice: searchParams.has('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined,
    category: searchParams.get('category') || undefined,
    sortField: (searchParams.get('sortField') as SortField) || 'name',
    sortDirection:
      (searchParams.get('sortDirection') as SortDirection) || 'asc',
    page: searchParams.has('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.has('limit') ? Number(searchParams.get('limit')) : 8,
  }

  let filteredProducts = [...products]

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm),
    )
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category,
    )
  }

  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.minPrice!,
    )
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= filters.maxPrice!,
    )
  }

  if (filters.sortField) {
    filteredProducts.sort((a, b) => {
      const fieldA = a[filters.sortField!]
      const fieldB = b[filters.sortField!]
      let comparison = 0

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        comparison = fieldA.localeCompare(fieldB)
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        comparison = fieldA - fieldB
      }
      return filters.sortDirection === 'desc' ? comparison * -1 : comparison
    })
  }

  const page = filters.page || 1
  const limit = filters.limit || 8
  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return NextResponse.json({
    data: paginatedProducts,
    meta: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, category, description, imageUrl } = body

    if (!name || !price || !category || !description || !imageUrl) {
      return NextResponse.json(
        {
          message:
            'Todos os campos são obrigatórios (exceto ID e Data de Criação que são automáticos)',
        },
        { status: 400 },
      )
    }

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { message: 'Preço deve ser um número positivo.' },
        { status: 400 },
      )
    }

    const newId =
      products.length > 0
        ? String(Math.max(...products.map((p) => Number(p.id))) + 1)
        : '1'

    const newProduct: Product = {
      id: newId,
      name,
      price,
      category,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto (API Mock):', error)
    let errorMessage = 'Erro interno do servidor ao processar a requisição.'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
