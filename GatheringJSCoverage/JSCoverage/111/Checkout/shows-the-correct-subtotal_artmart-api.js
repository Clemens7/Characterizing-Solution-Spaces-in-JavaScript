const ARTMART_API = {
    A2: "https://web-engineering.big.tuwien.ac.at/s20/a2/"
}

ARTMART_API.SHIPPING = ARTMART_API.A2 + "shipping";

export async function getShipping() {
    return await fetch(ARTMART_API.SHIPPING)
        .then(response => {
            if (!response.ok) 
            return response.json()
        })
        .then(data => {
            return data;
        })
        .catch();
}
