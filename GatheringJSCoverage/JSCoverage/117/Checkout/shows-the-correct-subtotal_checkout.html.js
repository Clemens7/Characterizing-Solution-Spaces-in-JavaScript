

        import * as Cart from './cart.js';
        import * as Frame from './frame.js';


        /* Task1: if the subtotal in cart is zero then we redirect the page back to the cart */
        if (Cart.getCartItems().length == 0) 

        const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

        fetch(url)
            .then(data => data.json())
            .then((data) => {
                var whatWeNeedToAlter = document.getElementById('country');
                //here we have to introduce the destinations
                for (const i of data.destinations) {
                    var optionTag = document.createElement('option');//we have to create the option tag, which will have the 3 values from destination
                    optionTag.value = i.country; //this value is not seen, it is more like an identifier
                    optionTag.innerHTML = i.displayName; //this will be shown to the user
                    optionTag.setAttribute('costs-for-country', i.cost); //we have to create a new attribute
                    whatWeNeedToAlter.appendChild(optionTag); //we append the option tag to the input
                }
                window.calcTotal();
            })

        window.calcTotal = function(){

            //we calculate the costs of the pictures and frames
          /*  const picture_costs = parseInt(Cart.howMuch());
            document.getElementById('price-subtotal').innerHTML = picture_costs;  */


            let picture_costs = 0;
            Cart.getCartItems().map(product => {  //for each input product we calculate the frame price and add it to the picture costs
                picture_costs += Frame.calculatePrice(product.printSize, product.frameStyle, product.frameWidth, product.matWidth);
            });

            document.getElementById('price-subtotal').innerHTML = picture_costs.toFixed(2);


            //then we calculate the shipping costs depending on the country
            const country_element = document.getElementById('country');
            const index_of_the_choice = parseInt(country_element.selectedIndex);

            if(index_of_the_choice < 0){ //no choice has been made
                document.getElementById('price-shipping').innerHTML = '&mdash;';
                document.getElementById('price-total').innerHTML = '&mdash;';
                document.getElementById('pay-button').disabled = true;
            }else{ //there is a choice and we need to get the costs of the choice
                const shipping_costs = parseInt(country_element.options[index_of_the_choice].getAttribute('costs-for-country'))/100;
                const total_costs = picture_costs + shipping_costs;
                document.getElementById('price-shipping').innerHTML = shipping_costs.toFixed(2);
                document.getElementById('price-total').innerHTML = total_costs.toFixed(2);
                document.getElementById('pay-button').disabled = false;
            }
        };

        window.calcTotal();

    