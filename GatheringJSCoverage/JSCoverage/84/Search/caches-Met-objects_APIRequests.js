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


    async getObject(id) {
        return this.cachedFetch(baseUrl + "/objects/" + id)
    }

    async search(query) {
        return this.cachedFetch(baseUrl + "/search?" + searchParams + "&q=" + query)
    }

    

    
}

const req = new APIRequests()
export default req