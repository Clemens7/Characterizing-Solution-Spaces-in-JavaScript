

    import{calculatePrice} from './frame.js';
    import{render} from './frame.js';
    adjustCartsTextIfNecessary();
    document.addEventListener('DOMContentLoaded', event =>{
        document.getElementById('checkout-button').disabled = true;
        createContent();
    });

    document.getElementById('checkout-button').addEventListener('click', );


    function adjustCartsTextIfNecessary(){
      const amount = getAmountOfItemsInCart();
      const cartLink = document.getElementById("cart-link");
      if(amount > 0)
      else 
      {cartLink.innerText = 'Cart';
      document.getElementById('checkout-button').disabled = true;}
    }
    function getAmountOfItemsInCart(){
      const json = JSON.parse(window.localStorage.getItem('cart'));
      if(json == null)
        return 0;}
    function createContent(){
      createElements();
      calcTotal();


    }
    function calcTotal(){
        let cart = JSON.parse(window.localStorage.getItem('cart'));
        /*if(!cart || cart.length === 0){
            document.getElementById('price-total').value = document.getElementById('price-total').defaultValue;
            window.location.replace('config.html');
            return;
        }*/
        let total = 0.00;
        for(let item of cart)
    }
    async function createElements(){
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      var i=0;
      //alert(Object.keys(cart).length);
      if (cart==null )
      {
          var div = document.createElement('div');
          div.textContent = 'There are no items in your shopping cart.';
          document.getElementById('cart').insertBefore(div, document.getElementById('cart').childNodes[0]);
          //document.body.appendChild(div);
          
      }
    }
    

    
  