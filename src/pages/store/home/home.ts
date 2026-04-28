import { PRODUCTS, getCategories } from '../../../data/data.js';
import type { Product } from '../../../types/product.js';
import { addToCart } from '../../../utils/cart.js';

let selectedCategory: string | null = null;
let searchQuery: string = '';

function renderCategories(): void {
    const categoriesList = document.getElementById('categories-list')!;
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
    const productsList = document.getElementById('products-list')!;
    productsList.innerHTML = '';

    if (products.length === 0) {
        productsList.innerHTML = '<p class="no-results">No se encontraron productos para tu búsqueda.</p>';
        return;
    }

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

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    const availableProducts = PRODUCTS.filter(p => p.disponible);
    renderProducts(availableProducts);

    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;
            searchProducts(query);
        });
    }
});
