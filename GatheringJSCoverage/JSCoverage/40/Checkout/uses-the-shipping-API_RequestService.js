import * as CacheService from './CacheService.js';
export class RequestService {

    /**
     * @param baseUrl base-url that is prepended to the request.
     * @param shouldCache Determines whether the request should be cached
     */
    constructor(baseUrl, shouldCache = false) {
        this.baseUrl = baseUrl
        this.shouldCache = shouldCache;
    }

    /**
     * Performs a get request to the provided endpoint.
     *
     * @param path path that is requested from the base-url
     * @returns the data from the url
     */
    async get(path) {
        let resp = null;
        const cachedResponse = CacheService.get(`cachedResponse-${path}`);

        if (cachedResponse ) 
        else {
            resp = await (await fetch(this.baseUrl + path, { method: 'GET' })).json()
            CacheService.set(`cachedResponse-${path}`, _ => resp);
        }
        return await resp
    }
}
