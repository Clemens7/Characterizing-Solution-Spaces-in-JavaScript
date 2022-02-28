import * as Cart from './cart.js';
export async function displayCartSize() {
    let htmlTemplateElement = document.getElementById('cart-link');
    const size = await Cart.cartSize();
    console.log('=========');
    console.log(size);
    if (size > 0)

}