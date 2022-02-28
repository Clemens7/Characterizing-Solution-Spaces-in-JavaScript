import * as SHIPPING_CACHE from './shipping-cache.js';

const URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

export class Destinations {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }
}

export const fetchShippingData = async () => {
    try {
        let destinations = {};
        const response = await fetch(URL);
        console.log(`received response ${response.ok}`);
        const data = await response.json();
        if (!data) 
        for (let dest of data.destinations) {
            destinations[dest.country] = new Destinations(dest.country, dest.displayName, dest.cost);
        }
        SHIPPING_CACHE.storeDestinations(destinations);
    } 
}