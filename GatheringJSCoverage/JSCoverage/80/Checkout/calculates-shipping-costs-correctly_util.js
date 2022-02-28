// Helper function that 'wraps' URLs to go through a proxy
// See: https://github.com/Rob--W/cors-anywhere
// Basic Info on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//
// Attention: Do this only for APIs you trust
// (or, as in this case, for demonstration purposes)
// There is a good reason why CORS restrictions exist:
// https://www.pivotpointsecurity.com/blog/cross-origin-resource-sharing-security/
export 

/**
 * Formats the given price given in cent euros "EUROS.CENT" eg. 1595 becomes "15.95", 1000 becomes "10.00"
 * @param cost given in cent euros
 * @returns {string} price in format "X.XX"
 */
export function formatPrice(cost) {
    return (cost / 100).toFixed(2);
}