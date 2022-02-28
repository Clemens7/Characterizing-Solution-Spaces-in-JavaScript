import * as Model from './models.js'
import * as FrameUtil from './frame.js'

export async function setSubtotal(subtotal) {
    const subtotalContainer = new SpanDocumentContainer('price-subtotal');
    subtotalContainer.addPrice(subtotal);
}

export function setFinalPrices(shippingCosts, total) {
    const shippingContainer = new SpanDocumentContainer('price-shipping');
    shippingContainer.addPrice(shippingCosts);

    const totalContainer = new SpanDocumentContainer('price-total');
    totalContainer.addPrice(total);
}

export function getSubtotal(items){
    let subtotal= 0;
    for (let item of items){
        subtotal += FrameUtil.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    return subtotal;
}

export async function addSelectionDestinations() {
    const destinations = await retrieveDestinations();
    
    const countryContainer = new SelectionDocumentContainer('country');
    countryContainer.addDestinations(destinations);
}

class SelectionDocumentContainer {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    addDestinations(destinations) {
        for (let destination of destinations) {
            //TODO:
            this.container.innerHTML +=
                `<option value="${destination.country}">${destination.displayName}</option> `;
            }
    }
}

class SpanDocumentContainer {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }
    
    addPrice(price) {
        console.log(price);
        this.container.innerText = price;
    }

    
}

export async function retrieveDestinations() {
    const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const responseDestinations = await rawData.destinations;
        console.log(responseDestinations);
        const destinations =  responseDestinations.map(
            destination => new Model.Destination(destination.country,
                                        destination.displayName,
                                        destination.cost)
        );
        return destinations;
    }}

export function isCartEmpty() {
    const cart = Model.retrieveCart();
    if (cart.items.length === 0)
}

export 