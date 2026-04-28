import { PRODUCTS, getCategories } from '../../../data/data.js';
import type { Product } from '../../../types/product.js';
import { addToCart, getCartCount } from '../cart/cart.js';

let selectedCategory: string | null = null;
let searchQuery: string = '';

function updateCartBadge(): void {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const count = getCartCount();
        badge.textContent = count.toString();
    }
}

function renderCategories(): void {
    const categoriesList = document.getElementById('categories-list')!;
    categoriesList.innerHTML = '';

    // Agregar botón "Todos los productos"
    const allButton = document.createElement('button');
    allButton.textContent = 'Todos los productos';
    allButton.className = 'category-btn active';
    allButton.addEventListener('click', () => filterByCategory('all'));
    categoriesList.appendChild(allButton);

    const categories = getCategories();
    categories.forEach((category) => {
        const button = document.createElement('button');
        button.textContent = category.nombre;
        button.className = 'category-btn';
        button.addEventListener('click', () => filterByCategory(category.nombre));
        categoriesList.appendChild(button);
    });
}

function filterByCategory(category: string): void {
    selectedCategory = category === 'all' ? null : category;

    document.querySelectorAll('.category-btn').forEach(btn => {
        const matches = category === 'all'
            ? btn.textContent === 'Todos los productos'
            : btn.textContent === category;
        btn.classList.toggle('active', matches);
    });

    applyFilters();
}

function searchProducts(query: string): void {
    searchQuery = query.toLowerCase();
    applyFilters();
}

function applyFilters(): void {
    let filteredProducts = PRODUCTS.filter(p => p.disponible);

    if (selectedCategory) {
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

        const categoryName = product.categorias.length > 0 ? product.categorias[0].nombre : 'Otros';

        productCard.innerHTML = `
            <img src="/${product.imagen}" alt="${product.nombre}">
            <div class="product-card-content">
                <div class="product-category">${categoryName}</div>
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.precio.toFixed(0)}</span>
                    <button class="add-to-cart-btn">+ Agregar</button>
                </div>
            </div>
        `;
        productCard.querySelector('.add-to-cart-btn')?.addEventListener('click', (e) => {
            const button = e.target as HTMLButtonElement;
            addToCart(product);
            updateCartBadge();

            // Cambiar el botón a estado "agregado"
            button.classList.add('added');
            button.innerHTML = '✓ Agregado';

            // Volver al estado normal después de 2 segundos
            setTimeout(() => {
                button.classList.remove('added');
                button.innerHTML = '+ Agregar';
            }, 2000);
        });
        productsList.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    updateCartBadge();
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
