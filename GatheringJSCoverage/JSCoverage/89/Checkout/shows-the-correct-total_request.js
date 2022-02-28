/**
 * metart api wrapper
 * @param {String} term
 */
export 

/**
 *
 * @param {String} Country - short value AT|DE|CH|US
 */
export function shippingCost(Country) {
    return new Promise((res, rej) => {
        request('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
            .then(({ destinations }) => {
                if (!Country) {
                    return res(destinations);
                }})
            .catch(rej);
    });
}

/**
 *
 * @param {Number} objectId
 */
export 

/**
 *
 * @param {Array} objects
 * @param {Number} total
 */
export 

/**
 *
 * @param {string} url
 */
export function request(url) {
    return new Promise((res, rej) => {
        fetch(url, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) 
                res(response.json());
            })
            .catch(rej);
    });
}
