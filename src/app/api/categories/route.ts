import { NextResponse } from 'next/server';

const categories = [
  'Eletrônicos',
  'Roupas',
  'Móveis',
  'Livros',
  'Alimentos',
  'Brinquedos',
  'Saúde',
  'Beleza',
  'Esportes',
  'Jardim',
];

export async function GET() {
  return NextResponse.json(categories);
} 