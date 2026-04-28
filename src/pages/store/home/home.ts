import { PRODUCTS, getCategories } from '../../../data/data.js';
import type { CartItem, Product } from '../../../types/Product.js';

let filteredProducts: Product[] = PRODUCTS;
let selectedCategory: string | null = null;

function renderCategories(): void {
    const categoriesList = document.getElementById('categories-list');
    const categories = getCategories();

    if (!categoriesList) return;

    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn active';
    allBtn.dataset.category = 'all';
    allBtn.textContent = 'Ver Todo';
    allBtn.addEventListener('click', () => {
        filterByCategory('all');
    });
    categoriesList.appendChild(allBtn);

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

function filterByCategory(category: string): void {
    selectedCategory = category === 'all' ? null : category;
    applyFilters();
}

function searchProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    filteredProducts = PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(lowerQuery);
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });
    renderProducts();
}

function applyFilters(): void {
    filteredProducts = PRODUCTS.filter((product) => {
        return selectedCategory ? product.category === selectedCategory : true;
    });
    renderProducts();
    updateCategoryButtons();
}

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
