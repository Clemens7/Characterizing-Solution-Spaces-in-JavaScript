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
                
            const data = await fetch(query)
            // check if the response code is 404
            if (data.status == 404)
                
            const json = await data.json()
            // Put the response in the local storage
            localStorage[query] = JSON.stringify(json)
            return json
        }}


    

    async search(query) {
        return this.cachedFetch(baseUrl + "/search?" + searchParams + "&q=" + query)
    }

    

    
}

const req = new APIRequests()
export default req