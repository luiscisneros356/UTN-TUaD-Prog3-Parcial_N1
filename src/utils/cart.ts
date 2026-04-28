import type { CartItem, Product } from '../types/product.js';

// Obtiene el carrito del localStorage
export function getCart(): CartItem[] {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : [];
}

// Guarda el carrito en el localStorage
function saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Agrega un producto al carrito
export function addToCart(product: Product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product: product, quantity: 1 });
    }

    saveCart(cart);
    alert(`"${product.nombre}" fue agregado al carrito!`);
}

// Elimina un producto del carrito
export function removeFromCart(productId: number) {
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
}

// Actualiza la cantidad de un producto
export function updateQuantity(productId: number, quantity: number) {
    const cart = getCart();
    const itemToUpdate = cart.find(item => item.product.id === productId);

    if (itemToUpdate) {
        if (quantity > 0) {
            itemToUpdate.quantity = quantity;
        } else {
            // Si la cantidad es 0 o menos, lo eliminamos
            removeFromCart(productId);
            return; // Salimos para evitar guardar dos veces
        }
    }
    saveCart(cart);
}

// Calcula el total del carrito
export function calculateTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.product.precio * item.quantity, 0);
}
