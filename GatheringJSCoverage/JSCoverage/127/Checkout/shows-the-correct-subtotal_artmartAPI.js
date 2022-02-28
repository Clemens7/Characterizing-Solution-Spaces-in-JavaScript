import {Destination} from './destination.js';

export async function retrieve() {
    const url = api_url();
    try{
        const response = await fetch(url);
        const rawData = await response.json();
        const responseDestinations = await rawData.destinations;
        console.log(responseDestinations);
        const destinations = responseDestinations.map(
            destination => new Destination(destination.country,
                destination.displayName,
                destination.cost)
        );
        return destinations;
    }}


function api_url(){
    const API_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping'
    return API_URL;
}


