import * as MUSEUM_API from "../museum/museum-api.js"

export async function retrieveByObjectIds(objectIDs) {
    return await Promise.all(
        objectIDs.map()
    );
}
