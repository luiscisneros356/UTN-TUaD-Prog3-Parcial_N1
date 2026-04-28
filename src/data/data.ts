import type { ICategoria } from '../types/ICategoria.js';
import type { Product } from '../types/Product.js';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    price: 250,
    category: 'Burgers',
    description: 'Hamburguesa con queso y vegetales'
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    price: 320,
    category: 'Pizza',
    description: 'Pizza italiana tradicional'
  },
  {
    id: 3,
    name: 'Hot Dog',
    price: 180,
    category: 'Hot Dogs',
    description: 'Hot dog con salsas variadas'
  },
  {
    id: 4,
    name: 'Pepperoni Pizza',
    price: 380,
    category: 'Pizza',
    description: 'Pizza con pepperoni'
  },
  {
    id: 5,
    name: 'Doble Hamburguesa',
    price: 400,
    category: 'Burgers',
    description: 'Hamburguesa con doble carne'
  },
  {
    id: 6,
    name: 'Ensalada César',
    price: 200,
    category: 'Ensaladas',
    description: 'Ensalada fresca con pollo'
  },
  {
    id: 7,
    name: 'Papas Fritas',
    price: 80,
    category: 'Acompañamientos',
    description: 'Papas fritas crujientes'
  },
  {
    id: 8,
    name: 'Bebida Gaseosa',
    price: 60,
    category: 'Bebidas',
    description: 'Gaseosa 500ml'
  }
];

export const getCategories = (): ICategoria[] => {
  const categories = new Set(PRODUCTS.map(p => p.category));
  return Array.from(categories).map((cat, idx) => ({
    id: idx + 1,
    name: cat
  }));
};



