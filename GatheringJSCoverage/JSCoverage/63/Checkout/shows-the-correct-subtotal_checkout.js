const API_URL = `https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`;
export async function retrieve() {
    try {
        const response = await fetch(API_URL);
        const rawData = await response.json();
        const responseDestinations = await rawData.destinations;
        console.log('response is:' +responseDestinations);
        let destinations = responseDestinations.map(
            destination => new Destination(destination.country.trim(),destination.displayName.trim(),destination.cost)
        );
        console.log(destinations);
        return destinations;
    }}

export class Destination{
    constructor(country, displayName,cost){
        this.country=country;
        this.displayName=displayName;
        this.cost=cost;
    }
}