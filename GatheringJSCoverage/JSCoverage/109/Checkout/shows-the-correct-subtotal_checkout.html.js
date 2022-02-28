

    import { calculatePrice } from  './frame.js';


  /*  var tmp = 
    [{'objectID':459055, 'printSize':'L','frameStyle':'classic','frameWidth':27,'matColor':'indigo','matWidth':31},
    {'objectID':459052, 'printSize':'S','frameStyle':'classic','frameWidth':27,'matColor':'indigo','matWidth':31}];
    localStorage.setItem("cart",JSON.stringify(tmp));*/
   
    //redirect to cart when no items
  
    if (!localStorage.getItem('cart'))

    let price=0;
    console.log(localStorage.getItem('cart'));
    for (let i of JSON.parse(localStorage.getItem('cart'))){
      
      price+=calculatePrice(i.printSize, i.frameStyle, i.frameWidth, i.matWidth);
    }
    console.log(price);
    document.getElementById('price-subtotal').innerHTML = price;

    document.getElementById('country').addEventListener("change",getShipCost);
 
    function addCountry(packet){
      var sel = document.getElementById('country');
      var opt = document.createElement('option');
      opt.appendChild(document.createTextNode(packet.displayName));
      opt.value = packet.country;
      sel.appendChild(opt);
    }
    
    async function getCountries(){
      const response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
      let costJson = await response.json();
      for (let i of costJson.destinations){
        addCountry(i);
      }
    }
    getCountries();

    async function getShipCost(){
      let country = document.getElementById('country').value;
      
      const response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
      let costJson = await response.json();
      //add failed await

      //if country isnt picked yet
      if (country === ''){
        country = costJson.destinations[0].country;
      }
      console.log(country);
      for (let i of costJson.destinations){
        if (i.country === country){
        document.getElementById("price-shipping").innerHTML = (i.cost/100).toFixed(2);
        document.getElementById('price-total').innerHTML = price + parseFloat(document.getElementById("price-shipping").innerHTML);
        break;
        }
      }
      
    }
    getShipCost();
    
  
    
  