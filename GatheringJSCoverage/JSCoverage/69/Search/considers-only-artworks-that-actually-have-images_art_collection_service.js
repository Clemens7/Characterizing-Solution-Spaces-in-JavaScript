const STORAGE_KEY = 'object_';
const metApiEndpoint = 'https://collectionapi.metmuseum.org';

class ArtCollectionService {

    fetchObject = ;

    search = (query) => {
        if (query !== undefined && query !== null && query !== "") {
            return fetch(metApiEndpoint + '/public/collection/v1/search?hasImages=true&q=' + query)
                .then()
                .then();
        }
    };
}
export default new ArtCollectionService();
