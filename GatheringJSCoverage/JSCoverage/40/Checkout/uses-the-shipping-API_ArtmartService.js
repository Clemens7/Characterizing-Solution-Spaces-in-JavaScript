import { RequestService } from './RequestService.js'
import { baseUrlArtmart } from './environment.js'

export class ArtmartService {

    /**
     * Requests the available countries.
     * 
     * @returns Returns the available countries.
     */
    async countries(shouldCache) {
        const rs = new RequestService(baseUrlArtmart, shouldCache)
        return rs.get(`shipping`)
    }

}
