const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";//http://localhost:4445/ https://collectionapi.metmuseum.org/public/collection/v1
/*
for localhost test:

 1)
run two nodejs processes in folder test with params:  "mock-server/server.js 4445" and
"node_modules/static-server/bin/static-server.js -p 4444 ../wwwnode node_m"

2)
in browser set the localstorage item(for cart test)
localStorage.setItem('cart',"[{\"objectID\":1,\"printSize\":\"M\",\"frameStyle\":\"shabby\",\"frameWidth\":24,\"matColor\":\"coal\",\"matWidth\":23},{\"objectID\":2,\"printSize\":\"M\",\"frameStyle\":\"natural\",\"frameWidth\":46,\"matColor\":\"indigo\",\"matWidth\":17},{\"objectID\":3,\"printSize\":\"S\",\"frameStyle\":\"elegant\",\"frameWidth\":20,\"matColor\":\"wine\",\"matWidth\":9}]");
localStorage.setItem('cart',"[{\"objectID\":207059,\"printSize\":\"S\",\"frameStyle\":\"shabby\",\"frameWidth\":20,\"matColor\":\"coal\",\"matWidth\":23},{\"objectID\":2,\"printSize\":\"M\",\"frameStyle\":\"natural\",\"frameWidth\":46,\"matColor\":\"indigo\",\"matWidth\":17},{\"objectID\":3,\"printSize\":\"S\",\"frameStyle\":\"elegant\",\"frameWidth\":20,\"matColor\":\"wine\",\"matWidth\":9}]");

[{"objectID":1,"printSize":"M","frameStyle":"shabby","frameWidth":24,"matColor":"coal","matWidth":23},{"objectID":2,"printSize":"M","frameStyle":"natural","frameWidth":46,"matColor":"indigo","matWidth":17},{"objectID":3,"printSize":"S","frameStyle":"elegant","frameWidth":20,"matColor":"wine","matWidth":9}]

 */


export 

export 

/* Can not be used bc of the fixed tests whichs sets the localStorage Items
function getNextItemID() {
    let currItemID = localStorage.getItem("currentItemID");
    if(currItemID === undefined || currItemID == null){
        localStorage.setItem("currentItemID","1");
        return 1;
    }else{
        currItemID = parseInt(currItemID)+1;
        localStorage.setItem("currentItemID",currItemID);
        return currItemID;
    }
}*/

export 

export 



export function getCartItems() {
    if (localStorage.getItem("cart") === null) {
        return [];
    }}

export function getArtworkMetadata(objectID) {
    return new Promise((resolve, reject) => {
        if (objectID == undefined) 

        if (localStorage.getItem("Cache_" + objectID) === null)  else {
            var data = JSON.parse(localStorage.getItem("Cache_" + objectID));
            resolve(data);
        }
    });
}

export async function retrieveIdsMatchingTerm(term) {
    let rawData = await fetch(API_URL + "/search?hasImages=true&q=" + term)
        .then(response => response.json());

    if(rawData.objectIDs != null) {
        return rawData.objectIDs.slice(0, 100);
    }}

export 