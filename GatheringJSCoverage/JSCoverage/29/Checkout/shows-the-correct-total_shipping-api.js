

export async function retrieve() {

    const url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";
    try {
        //with cors proxy
        //const response = await fetch(cors_proxy_url(url));
        //without proxy
        const response = await fetch(url);

        const countries = await response.json();

        return countries.destinations;

    }}

// Helper function that 'wraps' URLs to go through a proxy
// See: https://github.com/Rob--W/cors-anywhere
// Basic Info on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//
// Attention: Do this only for APIs you trust
// (or, as in this case, for demonstration purposes)
// There is a good reason why CORS restrictions exist:
// https://www.pivotpointsecurity.com/blog/cross-origin-resource-sharing-security/

