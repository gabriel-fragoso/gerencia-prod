'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const productFormSchema = z.object({
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  price: z
    .string()
    .min(1, 'Preço é obrigatório')
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      'Preço deve ser um número positivo',
    ),
  category: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  imageUrl: z
    .string()
    .min(1, 'URL da imagem é obrigatória')
    .url('Por favor, insira uma URL válida'),
})

export type FormState = {
  errors?: {
    name?: string[]
    price?: string[]
    category?: string[]
    description?: string[]
    imageUrl?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

/**
 * Server Action para criar um produto
 */
export async function createProduct(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = productFormSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    category: formData.get('category'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Falha na validação. Por favor, corrija os erros abaixo.',
      success: false,
    }
  }

  const { name, price, category, description, imageUrl } = validatedFields.data

  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        category,
        description,
        imageUrl,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        errors: {
          _form: [errorData.message || 'Falha ao criar produto'],
        },
        message: 'Ocorreu um erro ao criar o produto.',
        success: false,
      }
    }

    revalidatePath('/products')

    return {
      message: 'Produto criado com sucesso!',
      success: true,
    }
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return {
      errors: {
        _form: ['Erro ao conectar com o servidor. Tente novamente mais tarde.'],
      },
      message: 'Erro interno do servidor',
      success: false,
    }
  }
}
