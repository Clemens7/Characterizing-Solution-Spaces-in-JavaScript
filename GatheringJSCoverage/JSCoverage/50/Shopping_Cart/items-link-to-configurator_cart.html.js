

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
      if(amount > 0){
        cartLink.innerText = `Cart (${amount})`;
      }
    }
    function getAmountOfItemsInCart(){
      const json = JSON.parse(window.localStorage.getItem('cart'));
      if(json == null)
        
      
      return json.length;
    }
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
        for(let item of cart){
            total += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        }
             
        if(!isNaN(total))
            document.getElementById('price-total').innerText = total.toFixed(2);
    }
    async function createElements(){
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      var i=0;
      //alert(Object.keys(cart).length);
      if (cart==null || Object.keys(cart).length==0)
      
      else
      {
      for(let item of cart){   
        let jsonItem;     
        //var tempNode = document.querySelector("div[data-type='template']").cloneNode(true); //true for deep clone
        var tempNode = document.createElement('div');
        tempNode.setAttribute("class", "cart-item");
        tempNode.className="cart-item";
        tempNode.innerHTML="<div class=\"cart-preview\" id=\"preview-container-0\">\r\n          <a href=\"\">\r\n            <img class=\"cart-thumb\" src=\"\" id=\"preview-0\" alt=\"\">\r\n          <\/a>\r\n        <\/div>\r\n        <div class=\"museum-label\">\r\n          <div>\r\n            <span class=\"artist\"><\/span>\r\n            <span class=\"title\"><\/span>,\r\n            <span class=\"date\"><\/span>\r\n            <br><br>\r\n            <span class=\"frame-description\"><\/span>\r\n          <\/div>\r\n          <div class=\"cart-price\">\u20AC <span id=\"price-0\">0<\/span><\/div>\r\n          <button class=\"cart-remove\"><\/button>\r\n        <\/div>";
        let id;
        if (item.objectId!=null)
         else if (item.objectID!=null) {
          id=item.objectID;
        }
        let json = JSON.parse(window.localStorage.getItem(id));
        if (!json){
          await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(response => response.json()).then(data=>
            
          window.localStorage.setItem(id, JSON.stringify(data))
            );
          json = JSON.parse(window.localStorage.getItem(id));
        }
        tempNode.querySelector("a").setAttribute("href","config.html?objectID="+id+"&printSize="+item.printSize+"&frameStyle="+item.frameStyle+"&frameWidth="+item.frameWidth+"&matColor="+item.matColor+"&matWidth="+item.matWidth);
        tempNode.querySelector("img[class='cart-thumb']").setAttribute("src", json.primaryImageSmall);
        tempNode.querySelector("img[class='cart-thumb']").setAttribute("id", "preview-"+i);
        tempNode.querySelector("div[class='cart-preview']").setAttribute("id", "preview-container-"+i);
        tempNode.querySelector("span[class='artist']").innerText=json.artistDisplayName;
        tempNode.querySelector("span[class='title']").innerText=json.title;
        tempNode.querySelector("span[class='date']").innerText=json.objectDate;
        let textOfSize;
        switch(item.printSize) {
            case 'S':
                textOfSize="Small print in a ";
                break;
            case 'M':
                textOfSize="Medium print in a ";
                break;
            case 'L':
                textOfSize="Large print in a ";
                break;
        }
        let endText;
        switch (item.matColor){
          case 'ivory':
                endText=" with a " + item.matWidth/10 + " cm ivory mat.";
                break;
            case 'mint':
                endText=" with a " + item.matWidth/10 + " cm mint mat.";
                break;
            case 'wine':
                endText=" with a " + item.matWidth/10 + " cm wine mat.";
                break;
            case 'indigo':
                endText=" with a " + item.matWidth/10 + " cm indigo mat.";
                break;
            
        }
        if (item.matWidth==0.0)
          
        tempNode.querySelector("span[class='frame-description']").innerText=textOfSize + item.frameWidth/10 + " cm " + item.frameStyle + " frame"  + endText;
        tempNode.querySelector('#price-0').innerText=calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2);
        tempNode.querySelector("button[class='cart-remove']").id="remove"+i;
        tempNode.querySelector("button[class='cart-remove']").addEventListener('click', );
        await document.getElementById('cart').insertBefore(tempNode, document.getElementById('cart').childNodes[0]);
        render(document.getElementById("preview-"+i), document.getElementById("preview-container-"+i), item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth)
        i++;
      }
      document.getElementById('checkout-button').disabled = false; 
    }
    }
    

    
  