/**
 * Encapsulates all the required API requests
 */

 
const baseUrl =  "https://collectionapi.metmuseum.org/public/collection/v1"
const countryUrl = "https://web-engineering.big.tuwien.ac.at/s20/a2"
const searchParams = "hasImages=true"

class APIRequests {

    async cachedFetch(query) {
        try {
            // Check if there is already a cached response
            const cached = localStorage[query]
            if (cached) 
                return JSON.parse(cached)}


    

    

    async getCountries() {
        return this.cachedFetch(countryUrl + "/shipping")
    }

    
}

const req = new APIRequests()
export default req