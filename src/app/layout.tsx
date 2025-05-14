import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header";
import "./globals.css";
import ClientProviders from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GerenciaProd - Gestão de Produtos",
  description: "Uma aplicação moderna para gerenciamento de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientProviders>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <footer className="bg-white py-6 border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  © {new Date().getFullYear()} GerenciaProd. Todos os direitos reservados.
                </p>
              </div>
            </footer>
            <Toaster 
              position="top-right" 
              toastOptions={{
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '14px',
                }
              }}
            />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
