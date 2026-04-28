import { PRODUCTS, getCategories } from '../../../data/data.js';
import type { CartItem, Product } from '../../../types/Product.js';

let filteredProducts: Product[] = PRODUCTS;
let selectedCategory: string | null = null;
let searchQuery: string = '';

function renderCategories(): void {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = '<button class="active">Ver Todo</button>'; // Reset and add 'All' button
    categoriesList.querySelector('button')?.addEventListener('click', () => filterByCategory('all'));

    const categories = getCategories();
    categories.forEach((category) => {
        const button = document.createElement('button');
        button.textContent = category.nombre;
        button.addEventListener('click', () => filterByCategory(category.nombre));
        categoriesList.appendChild(button);
    });
}

function filterByCategory(category: string): void {
    selectedCategory = category === 'all' ? null : category;
    applyFilters();
}

function searchProducts(query: string): void {
    searchQuery = query;
    applyFilters();
}

function applyFilters(): void {
    let filteredProducts = PRODUCTS.filter(p => p.disponible);

    if (selectedCategory && selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.categorias.some(c => c.nombre === selectedCategory));
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.nombre.toLowerCase().includes(searchQuery)
        );
    }

    renderProducts(filteredProducts);
}

function renderProducts(products: Product[]): void {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;

    productsList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
      <img src="/${product.imagen}" alt="${product.nombre}">
      <h3>${product.nombre}</h3>
      <p>${product.descripcion}</p>
      <p>Precio: $${product.precio}</p>
      <button>Agregar al carrito</button>
    `;
        productCard.querySelector('button')?.addEventListener('click', () => addToCart(product));
        productsList.appendChild(productCard);
    });
}

function addToCart(product: Product): void {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} agregado al carrito`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();

    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;
            searchProducts(query);
        });
    }
});
