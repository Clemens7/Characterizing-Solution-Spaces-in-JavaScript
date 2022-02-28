
    import {getShoppingCart, addSelectCountryOptions} from "./Util.js";
    import Country from "./Country.js";
    // TODO delete test code
    // let item1 = new CartItem(1,'S','shabby',4,'red',5);
    // let tempShopItems = new ShoppingItems([item1]);
    // setCurrentCartItems(tempShopItems);
    // TODO end test code

    // get the shopping cart
    let shoppingCart = getShoppingCart();

    // redirect to the cart.html if the shopping cart is empty
    if (shoppingCart) {
        if (shoppingCart.getSize() === 0) 
    }

    //prevent default submit
    const form = document.querySelector('#checkout-form');
    form.addEventListener('submit', );
    // add listener to country selection
    const selectOptionElement = document.querySelector('#country');
    selectOptionElement.addEventListener('change', onCountrySelect);

    // show the subtotal since we now this information already
    const subTotalSpan = document.querySelector('#price-subtotal');
    subTotalSpan.innerText = shoppingCart.getSubTotal();

    // countries map
    let countryMap = new Map();

    // fetch data from Shipping API
    fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then(function (data) {
            return data.json();
        }).then(function (jsonData) {
            jsonData.destinations.map(
                country => new Country(country.country, country.displayName, country.cost))
                    .forEach((ctry) => countryMap.set(ctry.country, ctry));

            const selectCountry = document.querySelector('#country');
            addSelectCountryOptions(selectCountry, countryMap.values());
            onCountrySelect();
        })
        .catch();


    // get the country which was selected and get the shipping price from the map
    // then calculate the total cost
    function onCountrySelect() {
        const shippingPriceSpan = document.querySelector('#price-shipping');
        let counryCode = selectOptionElement.options[selectOptionElement.selectedIndex].value;
        let countryObj = countryMap.get(counryCode);
        if (countryObj) {
            shippingPriceSpan.innerHTML = (countryObj.cost / 100).toFixed(2);
            setTotalPrice(countryObj.cost / 100);
        }
    }

    // calculate and show the total cost
    function setTotalPrice(shippingCost) {
        const totalPriceElement = document.querySelector('#price-total');
        let totalCost = 0.0;
        totalCost = totalCost + shoppingCart.getSubTotal();
        totalCost = totalCost + shippingCost;
        totalPriceElement.innerHTML = totalCost.toFixed(2);
    }


