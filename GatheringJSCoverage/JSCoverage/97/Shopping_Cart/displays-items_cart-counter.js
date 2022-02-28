import { ConfiguredFrameRepository } from "./repository/ConfiguredFrameRepository.js";
const ID_CARTLINK = 'cart-link';
// Update the cart counter on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});
export function updateCartCounter() {
    const configuredFrameRepository = new ConfiguredFrameRepository();
    const cartLink = document.getElementById(ID_CARTLINK);
    if (cartLink !== null) {
        const itemsInCart = configuredFrameRepository.getAllFrames().length;
        if (itemsInCart > 0) {
            cartLink.innerText = `Cart (${itemsInCart})`;
        }
    }
}
