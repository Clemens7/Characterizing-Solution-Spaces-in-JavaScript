var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
/**
 * fetches the API given with the constant API_URL.
 * The array of Destination objects is provided in the field 'destinations' of the response.
 */
function fetchAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        // for local development in the browser, uncomment/comment the following lines
        const response = yield fetch(API_URL);
        //const response = await fetch(cors_proxy_url(API_URL));
        const data = yield response.json();
        return data.destinations;
    });
}
/**
 * Returns an array of Country objects, representing all countries supported by the API.
 */
export function getAvailableCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchAPI();
        return data.map(destination => {
            return { code: destination.country, name: destination.displayName };
        });
    });
}
/**
 * Given a unique country code, returns the shipping cost to this country as specified in the API
 * @param country a unique country code, e.g. 'AT', 'US'
 */
export function getShippingCost(country) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchAPI();
        let destination = data.find(destination => destination.country === country.toUpperCase());
        return destination !== undefined ? destination.cost ;
    });
}
// The following is from the live demo that Prof. Cito did:
// Helper function that 'wraps' URLs to go through a proxy
// See: https://github.com/Rob--W/cors-anywhere
// Basic Info on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//
// Attention: Do this only for APIs you trust
// (or, as in this case, for demonstration purposes)
// There is a good reason why CORS restrictions exist:
// https://www.pivotpointsecurity.com/blog/cross-origin-resource-sharing-security/

