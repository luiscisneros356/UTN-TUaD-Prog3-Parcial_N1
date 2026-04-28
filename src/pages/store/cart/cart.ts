import type { CartItem } from '../../../types/product.js';
import { calculateTotal, getCart, removeFromCart, updateQuantity } from '../../../utils/cart.js';

const cartContainer = document.getElementById('cart-container')!;
const emptyCartMessage = document.getElementById('empty-cart-message')!;

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        return;
    }

    cartContainer.style.display = 'grid';
    emptyCartMessage.style.display = 'none';

    const total = calculateTotal(cart);

    cartContainer.innerHTML = `
        <div class="cart-items-list">
            ${cart.map(item => createCartItemHTML(item)).join('')}
        </div>
        <div class="cart-summary">
            <h3>Resumen</h3>
            <div class="summary-line">
                <span>Subtotal</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-line total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn-checkout">Finalizar Compra</button>
            <p style="font-size: 0.8rem; text-align: center; margin-top: 1rem; color: #999;">El checkout no está disponible en esta versión.</p>
        </div>
    `;

    addEventListeners();
}

function createCartItemHTML(item: CartItem): string {
    const product = item.product;
    return `
        <div class="cart-item" data-product-id="${product.id}">
            <img src="/${product.imagen}" alt="${product.nombre}">
            <div class="cart-item-info">
                <h4>${product.nombre}</h4>
                <p>Precio: $${product.precio.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus">-</button>
                <span>${item.quantity}</span>
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
            updateQuantity(productId, currentQuantity - 1);
            renderCart();
        });

        itemElement.querySelector('.cart-item-remove')?.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
                removeFromCart(productId);
                renderCart();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', renderCart);

