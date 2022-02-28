const MAX_RESULTS = 100;
const API_URL = "https://collectionapi.metmuseum.org/";
const SEARCH_ENDPOINT = "public/collection/v1/search";
const OBJECT_ENDPOINT = "public/collection/v1/objects/";

export 

export async function getObject(objectId) {
    try {
        const objectRequestUrl = new URL(OBJECT_ENDPOINT + objectId, API_URL);
        const objectResponse = await fetch(objectRequestUrl.toString());
        return await objectResponse.json();
    }}
