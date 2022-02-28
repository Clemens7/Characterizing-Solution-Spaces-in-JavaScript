import * as frame from './frame.js';

var url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
var cost_err = '&mdash;';

document.addEventListener("DOMContentLoaded", init());
document.addEventListener("change", getShippingCost)

function init() {
    checkCart();
    getCountries();
    calcSubtotalCosts();
}

function checkCart() {
    const amount = frame.getListFromStorage().length;
    if (amount == 0) 
}

function getCountries() {
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            Object.values(data).forEach(idObject => {
                var selectoptions = "";
                Object.keys(idObject).forEach(countryId => {
                    var countryObject = Object.values(idObject)[countryId];
                    var countryCode = countryObject['country'];
                    var displayName = countryObject['displayName'];
                    selectoptions += '<option value=\"' + countryCode + '\">' + displayName + '</option>';
                });
                document.getElementById("country").innerHTML = selectoptions;
            });
        }).then(getShippingCost)
        .catch();
}

function getShippingCost() {
    var e = document.getElementById("country");
    var value = e.options[e.selectedIndex].value;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            Object.values(data).forEach(idObject => {
                Object.keys(idObject).forEach(countryId => {
                    var countryObject = Object.values(idObject)[countryId];
                    var countryCode = countryObject['country'];
                    var cost = countryObject['cost'];
                    if(countryCode == value) {
                        var shippingCost = "" + (cost / 100.0).toFixed(2);
                        document.getElementById('price-shipping').innerHTML = shippingCost;
                        calcSubtotalCosts();
                    }
                });
            });
        }).then(calcTotalCosts)
        .catch();
}

function calcSubtotalCosts() {
    var costs = 0.0;
    var items = frame.getListFromStorage();
    for (let i = 0; i < items.length; i++) {
        var frameItem = items[i];
        var frameconfig = frameItem;
        costs += frame.calculatePrice(frameconfig['printSize'], frameconfig['frameStyle'], frameconfig['frameWidth'], frameconfig['matWidth']);
    }
    if (costs > 0) {
        document.getElementById("price-subtotal").innerHTML = "" + costs.toFixed(2);
        calcTotalCosts();
    }
}

function calcTotalCosts() {
    var subtotal = document.getElementById("price-subtotal").innerHTML;
    var shippingcosts = document.getElementById("price-shipping").innerHTML;
    if (subtotal != cost_err && shippingcosts != cost_err) {
        var totalcosts = parseFloat(subtotal) + parseFloat(shippingcosts);
        document.getElementById("price-total").innerHTML = "" + totalcosts.toFixed(2);
    }
}



