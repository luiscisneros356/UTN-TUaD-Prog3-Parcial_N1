// src/utils/toast.ts

export function showToast(message: string) {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.error('Toast container not found!');
        return;
    }

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        // Remove the element after the animation ends
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000); // The toast will be visible for 3 seconds
}
