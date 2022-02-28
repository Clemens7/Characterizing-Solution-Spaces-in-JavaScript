
    import { retrieve } from './cart.js';
    let cart;
    async function cartItemSearch() {
      cart = await retrieve();
      if (!cart) {
        console.log("No cart found!");
      }
    }
  
    

    
    document.addEventListener('DOMContentLoaded', (event) => {
      cartItemSearch();
      
    });
  