const BASE_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2';

/**
 * Cache of available destinations and the respective shipping costs
 * @type {Destination[]}
 */
let destinations = [];

/*
 * Classes
 */

export class Destination {
    
}

/*
 * API calls
 */

/**
 * Return a list of all available shipping destinations and the respective shipping costs.
 * @returns {Promise<Response>}
 */
export async function get_shipping() {
    return fetch(BASE_URL + '/shipping')
        .then(response => {
            return response.json()
        }).then(value => {
            return destinations = value.destinations;
        }).catch();
}
