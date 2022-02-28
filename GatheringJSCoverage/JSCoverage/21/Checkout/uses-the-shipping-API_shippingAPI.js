export async function getShippingDict() {
    const url = shippingApiUrl();
    try {
        // fetch(url).then(function(response) {
        // response.json().then(function(parsedJson) {
        //     console.log('This is the parsed json', parsedJson);
        //     return parsedJson
        // })
        const response = await fetch(url);
        const rawData = await response.json();
        return rawData.destinations;
    }}
function shippingApiUrl(){
    const API_URL = `https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`;
    return API_URL;
}