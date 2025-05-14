'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { InputPrice } from './ui/InputPrice';
import { createProduct, FormState } from '@/lib/actions';
import { useState } from 'react';

type FormProps = {
  categories: string[];
};

const initialState: FormState = {
  errors: {},
  message: '',
  success: false
};

export function ProductForm({ categories }: FormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(createProduct, initialState);
  const [priceValue, setPriceValue] = useState('');

  if (state.success) {
    router.push('/products');
    return null;
  }

  const handleSubmit = (formData: FormData) => {
    if (priceValue) {
      formData.set('price', priceValue);
    }
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <Input
          name="name"
          label="Nome do Produto"
          required
          error={state.errors?.name?.join(', ')}
        />

        <InputPrice
          name="price"
          label="Preço"
          required
          value={priceValue}
          onChange={setPriceValue}
          error={state.errors?.price?.join(', ')}
        />

        <Select
          name="category"
          label="Categoria"
          options={categories.map(category => ({ value: category, label: category }))}
          required
          error={state.errors?.category?.join(', ')}
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none text-gray-900"
            required
          />
          {state.errors?.description && (
            <p className="text-red-500 text-sm mt-1">{state.errors.description.join(', ')}</p>
          )}
        </div>

        <Input
          name="imageUrl"
          label="URL da Imagem"
          required
          error={state.errors?.imageUrl?.join(', ')}
        />
      </div>

      {state.errors?._form && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-500">{state.errors._form.join(', ')}</p>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Criando...' : 'Criar Produto'}
    </Button>
  );
}
