'use client';

import { ReactNode, useEffect, useState } from 'react';
import { initMockApi } from '@/lib/services/mockApi';
import { toast } from 'react-hot-toast';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [isApiInitialized, setIsApiInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      const setupMockApi = async () => {
        try {
          await initMockApi();
          console.log('API mock inicializada com sucesso');
          setIsApiInitialized(true);
        } catch (error) {
          console.error('Erro ao inicializar API mock:', error);
          toast.error('Falha ao conectar ao servidor. Tente novamente mais tarde.');
        }
      };

      setupMockApi();
    }
  }, []);

  if (!isClient) {
    return null;
  }

  if (!isApiInitialized && typeof window !== 'undefined') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Inicializando aplicação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {children}
    </div>
  );
} 