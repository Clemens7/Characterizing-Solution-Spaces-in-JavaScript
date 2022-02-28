
      //DISABLE THIS IF NOT DEBUGGING
      //initiateMockShoppingCart();
      //localStorage.removeItem("cart");
      var cartContents = JSON.parse(localStorage.getItem("cart"));
      if (cartContents === null || cartContents.length === 0) 

      httpGetWithCallback('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping', function (response) {
        let responseObject = JSON.parse(response);
        let countrySelectObject = document.getElementById("country");
        responseObject.destinations.forEach(destination => {
          let opt = document.createElement('option');
          opt.appendChild(document.createTextNode(destination.displayName));
          opt.value = destination.country;
          countrySelectObject.appendChild(opt);
        });

        //set default value
        if (responseObject.destinations.length >= 0) {
          countrySelectObject.value = responseObject.destinations[0].country;
          recalculateShipping(responseObject.destinations[0].country)
        }
      });

      //Calculate Subtotal Price

      var subtotal = 0.0;
      cartContents.forEach(element => {
        subtotal = subtotal + calculatePrice(element.printSize, element.frameStyle, element.frameWidth, element.matWidth);
      });

      document.getElementById("price-subtotal").innerHTML = 1236;
      document.getElementById("price-subtotal").innerHTML = subtotal;
      console.log(subtotal);





      

      
      function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
        frameWidth = frameWidth / 10;
        matWidth = matWidth / 10;
        let price = 30;
        let framePrices = { "classic": 1, "natural": 0.8, "shabby": 0.9, "elegant": 0.85 };
        price += framePrices[frameStyle] * frameWidth;
        price += 0.05 * matWidth;
        if (printSize == 'M')
          
        else if (printSize == 'L')
          price *= 3.5;
        return (Math.round((price + Number.EPSILON) * 100) / 100);
      }

      //document.getElementById("price-subtotal").innerHTML = 123;

      function httpGetWithCallback(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
        }

        httpRequest.open("GET", url, true);
        httpRequest.send(null);
      }




      function recalculateShipping(country) {

        disableTotal();
        httpGetWithCallback('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping', function (response) {
          let responseObject = JSON.parse(response);
          let countrySelectObject = document.getElementById("country");
          responseObject.destinations.forEach(destination => {
            if (destination.country === country) {
              document.getElementById("price-shipping").innerHTML = (destination.cost / 100).toFixed(2);
            }
          });

          calculateTotal();



        });


      }

      function disableTotal() {
        document.getElementById("pay-button").disabled = true;
        document.getElementById("price-total").innerHTML = "-";
      }

      function calculateTotal() {
        let subtotal2 = parseFloat(document.getElementById("price-subtotal").innerHTML);
        let shippingCost = parseFloat(document.getElementById("price-shipping").innerHTML);
        document.getElementById("price-total").innerHTML = subtotal2 + shippingCost;
        //reenable pay button
        document.getElementById("pay-button").disabled = false;
      }



    