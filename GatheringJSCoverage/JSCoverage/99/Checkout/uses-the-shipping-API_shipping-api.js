
export async function getDestinations() {
    const url = `https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`;
    try {
        const response = await fetch(url);
        if(response.status !== 200) 

        const destinations = await response.json();
        console.log(destinations);
        return destinations;
    }