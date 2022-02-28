import * as ShippingCache from '../cache/artmart-shipping-cache.js'

export async function get_all_available_shipping_destinations() {
    const url = api_url();
    try{
        const response = await fetch(url);
        const rawData = await response.json();
        const destinations = await rawData.destinations;
        //console.log(destinations);

        ShippingCache.store_destinations(destinations);
        return destinations;
    }}

export async function get_shipping_cost(country) {
    let shipping_cost = ShippingCache.retrieve_shipping_cost(country);
    if(shipping_cost){
        return shipping_cost.cost;
    }}

function api_url() {
    const SHIPPING_API_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    return SHIPPING_API_URL;
}

