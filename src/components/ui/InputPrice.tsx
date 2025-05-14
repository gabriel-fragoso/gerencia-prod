import React, { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import clsx from 'clsx';

interface InputPriceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const InputPrice = forwardRef<HTMLInputElement, InputPriceProps>(
  ({ className, label, error, fullWidth = false, id, value, onChange, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      if (value && !isNaN(parseFloat(value))) {
        const numericValue = parseFloat(value);
        if (numericValue === 0 && inputValue === '') {
        } else if (inputValue === '') {
          setInputValue(formatCurrency(numericValue));
        }
      }
    }, [value, inputValue]);

    const formatCurrency = (num: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(num);
    };

    const getDigitsOnly = (str: string): string => {
      return str.replace(/\D/g, '');
    };

    const centavosToReais = (centavos: string): number => {
      if (!centavos) return 0;
      return parseInt(centavos, 10) / 100;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const userInput = e.target.value;

      const digitsOnly = getDigitsOnly(userInput);

      if (digitsOnly === '') {
        setInputValue('');
        onChange('0');
        return;
      }

      const valueInReais = centavosToReais(digitsOnly);

      const formattedValue = formatCurrency(valueInReais);
      setInputValue(formattedValue);

      onChange(valueInReais.toString());
    };

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            className={clsx(
              'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder:text-gray-400 px-2 text-sm py-2',
              {
                'w-full': fullWidth,
                'border-red-300 focus:border-red-500 focus:ring-red-500': error,
              },
              className
            )}
            value={inputValue}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-errormessage={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputPrice.displayName = 'InputPrice';
