export function retrieve() {
    if ('shipping-destinations' in localStorage) {
        console.log('Retrieving Shipping Destinations from local Storage');
        return JSON.parse(localStorage['shipping-destinations']);
    }
}
export 
