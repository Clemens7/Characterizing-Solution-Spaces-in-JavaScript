const MAX_RESULTS = 100;
const API_URL = "https://collectionapi.metmuseum.org/";
const SEARCH_ENDPOINT = "public/collection/v1/search";
const OBJECT_ENDPOINT = "public/collection/v1/objects/";

export async function getObjectIds(searchQuery) {
    try {
        const searchRequestUrl = new URL(SEARCH_ENDPOINT, API_URL);
        searchRequestUrl.searchParams.set("hasImages", "true");
        searchRequestUrl.searchParams.set("q", searchQuery);

        const searchResponse = await fetch(searchRequestUrl.toString());
        let searchObjectIds = (await searchResponse.json()).objectIDs;
        if (!searchObjectIds) {
            return [];
        }}

export 
