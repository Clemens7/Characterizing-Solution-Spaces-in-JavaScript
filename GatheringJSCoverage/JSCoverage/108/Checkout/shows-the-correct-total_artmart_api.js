/**
 * Looks up all available destinations
 * @returns array with destination objects
 */
export async function retrieve() {
    const url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";

    try {
        const response = await fetch(url);
        const rawData = await response.json();
        return await rawData.destinations;
    }