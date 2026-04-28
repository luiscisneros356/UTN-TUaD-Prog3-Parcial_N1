import { PRODUCTS, getCategories } from '../../../data/data';
import { Product } from '../../../types/Product';

let filteredProducts: Product[] = PRODUCTS;
let selectedCategory: string | null = null;

// Renderizar categorías
function renderCategories(): void {
    const categoriesList = document.getElementById('categories-list');
    const categories = getCategories();

    if (!categoriesList) return;

    categoriesList.innerHTML = '<button class="category-btn active" data-category="all">Ver Todo</button>';

    categories.forEach((cat) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = cat.name;
        btn.textContent = cat.name;
        btn.addEventListener('click', () => {
            filterByCategory(cat.name);
        });
        categoriesList.appendChild(btn);
    });
}

// Filtrar por categoría
function filterByCategory(category: string): void {
    selectedCategory = category === 'all' ? null : category;
    applyFilters();
}

// Buscar productos
function searchProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    filteredProducts = PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(lowerQuery);
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });
    renderProducts();
}

// Aplicar filtros
function applyFilters(): void {
    filteredProducts = PRODUCTS.filter((product) => {
        return selectedCategory ? product.category === selectedCategory : true;
    });
    renderProducts();
    updateCategoryButtons();
}

// Actualizar estado de botones de categoría
function updateCategoryButtons(): void {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((btn) => {
        const category = btn.getAttribute('data-category');
        if (
            (category === 'all' && !selectedCategory) ||
            (category === selectedCategory)
        ) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Renderizar productos
function renderProducts(): void {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;

    if (filteredProducts.length === 0) {
        productsList.innerHTML = '<p>No hay productos disponibles</p>';
        return;
    }

    productsList.innerHTML = '';

    filteredProducts.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description || ''}</p>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar</button>
    `;

        productCard.querySelector('.add-to-cart-btn')?.addEventListener('click', () => {
            addToCart(product);
        });

        productsList.appendChild(productCard);
    });
}

// Agregar al carrito
function addToCart(product: Product): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} agregado al carrito`);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;
            searchProducts(query);
        });
    }
});
