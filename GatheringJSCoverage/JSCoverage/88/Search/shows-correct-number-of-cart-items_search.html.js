
    import {getShoppingCart} from "./Util.js";

    let shoppingCart = getShoppingCart();
    if((localStorage.getItem('cart') != null && shoppingCart.getSize() > 0)) 
    /*
    * EventListener
    */
    const form = document.querySelector('form');
    form.addEventListener('submit', );

    document.addEventListener('DOMContentLoaded', event => {
      const params = (new URL(document.location)).searchParams;
      const actualQuery = params.get('q');
      if(!actualQuery){
        useHighlights(); //use highlights when no parameter is given
        //useJsonHighlights();
        return;
      }});
  