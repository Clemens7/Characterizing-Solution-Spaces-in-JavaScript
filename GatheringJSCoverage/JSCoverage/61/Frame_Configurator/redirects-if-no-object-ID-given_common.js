export const ARTMART_BASE_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/';
export const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

class CartItem{
    
}

// Use the local storage key cart to store the shopping cart,
// which should be represented as a JSON array of objects containing
// an objectID and the frame configuration parameters, but nothing more
const CART_TEST = [{
    "objectID": 768979,
    "printSize": "L",
    "frameStyle": "shabby",
    "frameWidth": 21,
    "matColor": "wine",
    "matWidth": 6
}];

// initializes the cart in local storage to a test value
const setCartStorage = ;

const OBJ_TEST = {
    "objectID": 45734,
    "isHighlight": false,
    "accessionNumber": "36.100.45",
    "accessionYear": "1936",
    "isPublicDomain": true,
    "primaryImage": "https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg",
    "primaryImageSmall": "https://images.metmuseum.org/CRDImages/as/web-large/DP251139.jpg",
    "additionalImages": [
        "https://images.metmuseum.org/CRDImages/as/original/DP251138.jpg",
        "https://images.metmuseum.org/CRDImages/as/original/DP251120.jpg"
    ],
    "constituents": [
        {
            "role": "Artist",
            "name": "Kiyohara Yukinobu",
            "constituentULAN_URL": "https://vocab.getty.edu/page/ulan/500034433",
            "constituentWikidata_URL": "https://www.wikidata.org/wiki/Q11560527",
            "gender": "Female"
        }
    ],
    "department": "Asian Art",
    "objectName": "Hanging scroll",
    "title": "Quail and Millet",
    "culture": "Japan",
    "period": "Edo period (1615–1868)",
    "dynasty": "",
    "reign": "",
    "portfolio": "",
    "artistRole": "Artist",
    "artistPrefix": "",
    "artistDisplayName": "Kiyohara Yukinobu",
    "artistDisplayBio": "Japanese, 1643–1682",
    "artistSuffix": "",
    "artistAlphaSort": "Kiyohara Yukinobu",
    "artistNationality": "Japanese",
    "artistBeginDate": "1643",
    "artistEndDate": "1682",
    "artistGender": "Female",
    "artistWikidata_URL": "https://www.wikidata.org/wiki/Q11560527",
    "artistULAN_URL": "https://vocab.getty.edu/page/ulan/500034433",
    "objectDate": "late 17th century",
    "objectBeginDate": 1667,
    "objectEndDate": 1682,
    "medium": "Hanging scroll; ink and color on silk",
    "dimensions": "46 5/8 x 18 3/4 in. (118.4 x 47.6 cm)",
    "creditLine": "The Howard Mansfield Collection, Purchase, Rogers Fund, 1936",
    "geographyType": "",
    "city": "",
    "state": "",
    "county": "",
    "country": "",
    "region": "",
    "subregion": "",
    "locale": "",
    "locus": "",
    "excavation": "",
    "river": "",
    "classification": "Paintings",
    "rightsAndReproduction": "",
    "linkResource": "",
    "metadataDate": "2020-02-07T15:50:59.677Z",
    "repository": "Metropolitan Museum of Art, New York, NY",
    "objectURL": "https://wwwstg.metmuseum.org/art/collection/search/45734",
    "tags": [
        {
            "term": "Birds",
            "AAT_URL": "https://vocab.getty.edu/page/aat/300266506"
        },
        {
            "term": "Leaves",
            "AAT_URL": "https://vocab.getty.edu/page/aat/300011892"
        }
    ],
    "objectWikidata_URL": "https://www.wikidata.org/wiki/Q29910832",
    "isTimelineWork": false
};

const setObjStorage = ;

export function showCartNumber() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(cart) ) 
}

export 

export {setCartStorage, CartItem, setObjStorage}
