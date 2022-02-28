const STORAGE_KEY = 'object_';
const metApiEndpoint = 'https://collectionapi.metmuseum.org';

class ArtCollectionService {

    fetchObject = (oID) => {
        let cachedObject = window.localStorage.getItem(STORAGE_KEY + oID);
        if (cachedObject === null)  else {
            return Promise.resolve(JSON.parse(cachedObject));
        }
    };

    search = ;
}
export default new ArtCollectionService();
