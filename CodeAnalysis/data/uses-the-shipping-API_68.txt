const shipping_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
let cartInfo = JSON.parse(localStorage.getItem('cart'));
let shipping = [];
let subtotalCost = 0;
let shippingCost = 0;
let totalCost = 0;

/*function sendHttpRequest(method, url) {
    const promise = new Promise((resolve, reject) => {
        console.log("sendHttpRequest");
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open(method, url);

        xmlHttp.responseType = 'json';

        xmlHttp.onload = function () {
            if(xmlHttp.status >= 400){
                reject(xmlHttp.response);
            } else {
                resolve(xmlHttp.response);
            }
        };

        xmlHttp.onerror = function () {
            reject(`An error occurred when trying to get data of URL ${shipping_URL}`);
        };

        xmlHttp.send();
    });
    return promise;
}

function getShippingData() {
    sendHttpRequest('GET', shipping_URL)
        .then(shippingData => {
            console.log(shippingData);
            Object.keys(shippingData).forEach((item) => {
                shipping = shippingData[item];
                fillOptions();
            });
        })
        .catch(err => {
            console.log(err);
        });
}*/

async function fetchShippingData() {
    try {
        const response = await fetch(shipping_URL);
        const shippingData = await response.json();
        getShippingData(shippingData);
    } 
}

function getShippingData(shippingData) {
    console.log(shippingData);
    Object.keys(shippingData).forEach((item) => {
        shipping = shippingData[item];
        fillOptions();
    });
}

function fillOptions() {
    let select = document.getElementById('country');
    for (let i = 0; i < shipping.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = shipping[i].displayName;
        option.value = shipping[i].country;
        select.appendChild(option);
    }
    totalPrice();
}

function shippingPrice() {
    try {
        let selected = document.getElementById('country').options.selectedIndex;
        shippingCost = ((shipping[selected].cost) / 100).toFixed(2);
        document.getElementById('price-shipping').textContent = `${shippingCost}`;
        document.getElementById('country').addEventListener('change', totalPrice);
    } 
}

function subtotalPrice() {
    subtotalCost = 0;
    for (let item of cartInfo){
        subtotalCost += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    document.getElementById('price-subtotal').textContent = `${subtotalCost}`;
    document.getElementById('price-subtotal').innerHTML = `${subtotalCost}`;
}

function totalPrice() {
    shippingPrice();
    subtotalPrice();

    totalCost = parseFloat(((+shippingCost) + (+subtotalCost)).toFixed(2));
    document.getElementById('price-total').textContent = `${totalCost}`;
    document.getElementById('pay-button').disabled = false;
}

function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 30.0;
    let frameConstant = 1;
    switch (frameStyle) {
        
        
        case "shabby":
            frameConstant = 0.9;
            break;
        
    }

    price += frameConstant * (frameWidth / 10);
    let matPrice = (matWidth / 10) * 0.05;
    price += matPrice;

    switch (printSize) {
        

        case "L":
            price = price * 3.5;
            break;
    }

    return parseFloat((Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2));
}


function initCheckoutData() {
    if(cartInfo == null || cartInfo.length === 0)
    document.getElementById('pay-button').disabled = true;
    fetchShippingData().catch();
}

initCheckoutData();
