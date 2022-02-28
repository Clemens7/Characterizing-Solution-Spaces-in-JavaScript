const STORAGE_KEY = 'object_';
const metApiEndpoint = 'https://collectionapi.metmuseum.org';

class ArtCollectionService {

    fetchObject = (oID) => {
        let cachedObject = window.localStorage.getItem(STORAGE_KEY + oID);
        if (cachedObject === null)  else {
            return Promise.resolve(JSON.parse(cachedObject));
        }
    };

    search = (query) => {
        if (query !== undefined && query !== null && query !== "") {
            return fetch(metApiEndpoint + '/public/collection/v1/search?hasImages=true&q=' + query)
                .then(response => response.json())
                .then(data => data.total === 0  : Promise.all(data.objectIDs.filter((artObj, x) => x < 100).map(oID => this.fetchObject(oID))));
        }
    };
}
export default new ArtCollectionService();
