const apiUrl = 'https://web-engineering.big.tuwien.ac.at/s20/a2';

export async function fetchShippingCosts() {
    const url = apiUrl + '/shipping';
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        return await responseData.destinations;
    }