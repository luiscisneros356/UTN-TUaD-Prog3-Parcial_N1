import type { CartItem } from '../../../types/product.js';
import { calculateTotal, getCart, removeFromCart, updateQuantity } from '../../../utils/cart.js';

const cartItemsList = document.getElementById('cart-items-list')!;
const emptyCartMessage = document.getElementById('empty-cart-message')!;
const cartRight = document.querySelector('.cart-right')! as HTMLElement;
const subtotalElement = document.getElementById('subtotal')!;
const totalElement = document.getElementById('total')!;
const checkoutBtn = document.getElementById('checkout-btn')!;
const emptyCartBtn = document.getElementById('empty-cart-btn')!;

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartItemsList.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        cartRight.style.display = 'none';
        subtotalElement.textContent = '$0';
        totalElement.textContent = '$0';
        return;
    }

    cartItemsList.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    cartRight.style.display = 'block';

    const total = calculateTotal(cart);

    cartItemsList.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    subtotalElement.textContent = `$${total.toFixed(0)}`;
    totalElement.textContent = `$${total.toFixed(0)}`;

    addEventListeners();
}

function createCartItemHTML(item: CartItem): string {
    const product = item.product;
    const categoryName = product.categorias && product.categorias[0] ? product.categorias[0].nombre : 'Sin categoría';
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

function addEventListeners() {
    document.querySelectorAll('.cart-item').forEach(itemElement => {
        const productId = Number(itemElement.getAttribute('data-product-id'));

        itemElement.querySelector('.quantity-btn.plus')?.addEventListener('click', () => {
            const currentQuantity = getCart().find(i => i.product.id === productId)!.quantity;
            updateQuantity(productId, currentQuantity + 1);
            renderCart();
        });

        itemElement.querySelector('.quantity-btn.minus')?.addEventListener('click', () => {
            const currentQuantity = getCart().find(i => i.product.id === productId)!.quantity;
            if (currentQuantity > 1) {
                updateQuantity(productId, currentQuantity - 1);
                renderCart();
            }
        });

        itemElement.querySelector('.cart-item-remove')?.addEventListener('click', () => {
            const productId = Number(itemElement.getAttribute('data-product-id'));
            removeFromCart(productId);
            renderCart();
        });
    });
}

checkoutBtn.addEventListener('click', () => {
    alert('El checkout no está disponible en esta versión.');
});

emptyCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    renderCart();
});

document.addEventListener('DOMContentLoaded', renderCart);

