import { RequestService } from './RequestService.js'
import { baseUrlMetropolitan } from './environment.js'
import { QueryString, QueryParam } from './Query.js'

export class MetropolitanService {

    /**
     * Searches the Metropolitan-API for objects that match the query.
     *
     * @param q query parameter for the search
     * @param hasImages objects should have images
     * @returns the objects that match the query
     */
    async search(q, hasImages = true, shouldCache) {
        const rs = new RequestService(baseUrlMetropolitan, shouldCache)
        const qp = new QueryString([
            new QueryParam('q', q),
            new QueryParam('hasImages', hasImages)
        ])
        return rs.get(`search${qp}`)
    }

    /**
     * Requests the object with the given id.
     *
     * @param id id of the object to find
     * @returns Returns the object with the id
     */
    async object(id, shouldCache) {
        const rs = new RequestService(baseUrlMetropolitan, shouldCache)
        return rs.get(`objects/${id}`)
    }

}
