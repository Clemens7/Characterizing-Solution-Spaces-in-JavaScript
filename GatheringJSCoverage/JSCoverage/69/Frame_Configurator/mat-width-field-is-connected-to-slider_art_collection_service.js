const STORAGE_KEY = 'object_';
const metApiEndpoint = 'https://collectionapi.metmuseum.org';

class ArtCollectionService {

    fetchObject = (oID) => {
        let cachedObject = window.localStorage.getItem(STORAGE_KEY + oID);
        if (cachedObject === null) {
            return fetch(metApiEndpoint + '/public/collection/v1/objects/' + oID)
                    .then(response => response.json())
                    .then(data => {
                        window.localStorage.setItem(STORAGE_KEY + oID, JSON.stringify(data));
                        return data;
                    });
        }
    };

    search = ;
}
export default new ArtCollectionService();
