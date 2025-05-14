import { NextResponse, NextRequest } from 'next/server'
import { products } from '../../db'

interface Params {
  id: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = params
  const product = products.find((p) => p.id === id)

  if (product) {
    return NextResponse.json(product)
  } else {
    return NextResponse.json(
      { message: 'Produto não encontrado' },
      { status: 404 },
    )
  }
}
