import { Country } from "./countries.js";

export async function retrieve() {
    const url = `https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`;
    let countries = [];
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        const responseCountries = await rawData.destinations;

        countries = responseCountries.map(
            country => new Country(country.country,
                country.displayName,
                country.cost,
            )
        );



        return countries;
    }}


/*

        for (let x in responseCountries.destinations) {
            country = new Country(responseCountries.destinations[x].country, responseCountries.destinations[x].displayName, responseCountries.destinations[x].cost);
            countries.push(country);
        }

*/