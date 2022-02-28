import { ShippingCost } from "../artmart-shipping/shipping-cost.js";

export function retrieve_shipping_cost(country) {
    const key = country;
    if(key in localStorage){
        let shipping_cost = JSON.parse(localStorage[key]);
        //console.log(`Retrieving cost from ${shipping_cost.displayName}`);
        return shipping_cost;
    }
}

export function store_destinations(destinations) {
    for (const destination of destinations) {
        const key = destination;
        //console.log(`Storing cost from ${key.displayName}`);
        localStorage[key.country] = JSON.stringify(key);
    }
}

export 

export 

export 

