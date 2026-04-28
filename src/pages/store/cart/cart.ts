import type { CartItem, Product } from '../../../types/product.js';

// ── Cart utilities ────────────────────────────────────────────────────────────

export function getCart(): CartItem[] {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
}

function saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product: Product) {
    const cart = getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    saveCart(cart);
}

export function removeFromCart(productId: number) {
    saveCart(getCart().filter(item => item.product.id !== productId));
}

export function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const cart = getCart();
    const item = cart.find(i => i.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

export function calculateTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.product.precio * item.quantity, 0);
}

export function getCartCount(): number {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

// ── Cart page logic (only runs on cart.html) ──────────────────────────────────

function createCartItemHTML(item: CartItem): string {
    const product = item.product;
    const categoryName = product.categorias?.[0]?.nombre ?? 'Sin categoría';
    const subtotal = product.precio * item.quantity;

    return `
        <div class="cart-item" data-product-id="${product.id}">
            <img class="cart-item-image" src="/${product.imagen}" alt="${product.nombre}">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${product.nombre}</h4>
                <p class="cart-item-category">${categoryName}</p>
                <p class="cart-item-subtotal">Subtotal: $${subtotal.toFixed(0)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn minus">−</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                <button class="quantity-btn plus">+</button>
            </div>
            <button class="cart-item-remove">Eliminar</button>
        </div>
    `;
}

function renderCart() {
    const cartItemsList = document.getElementById('cart-items-list')!;
    const emptyCartMessage = document.getElementById('empty-cart-message')!;
    const cartRight = document.querySelector('.cart-right') as HTMLElement;
    const subtotalElement = document.getElementById('subtotal')!;
    const totalElement = document.getElementById('total')!;

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsList.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        if (cartRight) cartRight.style.display = 'none';
        subtotalElement.textContent = '$0';
        totalElement.textContent = '$0';
        return;
    }

    cartItemsList.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    if (cartRight) cartRight.style.display = 'block';

    const total = calculateTotal(cart);
    cartItemsList.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    subtotalElement.textContent = `$${total.toFixed(0)}`;
    totalElement.textContent = `$${total.toFixed(0)}`;

    document.querySelectorAll('.cart-item').forEach(itemElement => {
        const productId = Number(itemElement.getAttribute('data-product-id'));

        itemElement.querySelector('.quantity-btn.plus')?.addEventListener('click', () => {
            const current = getCart().find(i => i.product.id === productId)!.quantity;
            updateQuantity(productId, current + 1);
            renderCart();
        });

        itemElement.querySelector('.quantity-btn.minus')?.addEventListener('click', () => {
            const current = getCart().find(i => i.product.id === productId)!.quantity;
            if (current > 1) {
                updateQuantity(productId, current - 1);
                renderCart();
            }
        });

        itemElement.querySelector('.cart-item-remove')?.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que querés eliminar este producto del carrito?')) {
                removeFromCart(productId);
                renderCart();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('cart-items-list')) return;

    renderCart();

    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        alert('El checkout no está disponible en esta versión.');
    });

    document.getElementById('empty-cart-btn')?.addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCart();
    });
});
