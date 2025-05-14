import { Product } from '@/lib/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro X1',
    category: 'Eletrônicos',
    price: 7500.0,
    description: 'Laptop de alta performance para profissionais.',
    imageUrl:
      'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjgwNzc3fGltYWdlL3BuZ3xoOWUvaGI4LzE0MDgwNDY4MDkwOTEwLnBuZ3w4MzIxNDk3M2E4NTA5ZjY5ZjYzYTc5ZDk3MWYwNjk3OTczNzYxMjM2MDU0ZTQ0MDBjMTU0ZmRhZWUxM2Q2ODYx/lenovo-laptop-thinkpad-x1-carbon-gen-8-hero.png',
    createdAt: new Date('2023-01-15T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    name: 'Smartphone Gamer YZ',
    category: 'Eletrônicos',
    price: 3200.5,
    description: 'Smartphone otimizado para jogos com tela de 120Hz.',
    imageUrl:
      'https://images0.kabum.com.br/produtos/fotos/227860/smartphone-asus-rog-phone-5s-256gb-ram-12gb-octa-core-camera-tripla-64mp-tela-6-78-preto-90ai0091-m00200_1631557904_g.jpg',
    createdAt: new Date('2023-03-20T14:30:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'Camiseta Casual Comfort',
    category: 'Roupas',
    price: 89.9,
    description: 'Camiseta de algodão macio para o dia a dia.',
    imageUrl:
      'https://static.ecosweb.com.br/public/produtos/mkp83/moda-masculina/camiseta/camiseta-sb-vamoqvamo-casual-conforto-reserva-preto_2201871_600_4.webp',
    createdAt: new Date('2023-05-10T09:15:00Z').toISOString(),
  },
  {
    id: '4',
    name: 'Sofá Modular Espaçoso',
    category: 'Móveis',
    price: 2999.0,
    description: 'Sofá modular com chaise, ideal para salas grandes.',
    imageUrl:
      'https://images.tcdn.com.br/img/img_prod/1301312/sofa_modular_grande_quiloa_su_44643_3925_1_5e982e520f7c2090dd707ac41c65594f.jpg',
    createdAt: new Date('2023-02-25T18:00:00Z').toISOString(),
  },
  {
    id: '5',
    name: 'Livro: A Arte da Programação',
    category: 'Livros',
    price: 120.0,
    description: 'Um clássico sobre algoritmos e estruturas de dados.',
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_612850-CBT80176773509_102024-O-livro-arte-da-programaco-de-computadores-volume-1-fascic.webp',
    createdAt: new Date('2023-04-01T11:00:00Z').toISOString(),
  },
]
