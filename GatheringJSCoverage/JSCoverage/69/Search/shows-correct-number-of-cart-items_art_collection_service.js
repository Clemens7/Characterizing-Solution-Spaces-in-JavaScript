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
        if (query !== undefined && query !== null )  else {
            return fetch('highlights.json')
                .then(response => response.json())
                .then(data => Promise.all(data['highlights'].filter((artObj, x) => x < 100).map(oID => this.fetchObject(oID))));
        }
    };
}
export default new ArtCollectionService();
