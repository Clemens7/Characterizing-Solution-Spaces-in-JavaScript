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


export function getQueryVariables() {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    var parameters = {};
    vars.forEach(element => {
        parameters[element.split("=")[0]] = element.split("=")[1];
    });
    return parameters;
}

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

export function removeCartItem(cartItem) {
    if (localStorage.getItem("cart") === null) 
    const cartItems = getCartItems();
    const itemToRemove = cartItems.find(item => equalsCartItem(cartItem,item));
    console.log("itemToRemove"+itemToRemove);
    localStorage.setItem("cart", JSON.stringify(cartItems.filter(item => item !== itemToRemove)));
}

function equalsCartItem(itemA,itemB) {
    if(itemA === itemB)
    if(itemA.objectID !== itemB.objectID){
        return false;
    }
    if(itemA.printSize !== itemB.printSize)
    if(itemA.frameWidth !== itemB.frameWidth )
    if(itemA.frameStyle !== itemB.frameStyle )
    if(itemA.matWidth  !== itemB.matWidth )
    if(itemA.matColor  !== itemB.matColor )
    return true;
}

export function getCartItems() {
    if (localStorage.getItem("cart") === null) 
    return JSON.parse(localStorage.getItem("cart"));
}

export function getArtworkMetadata(objectID) {
    return new Promise((resolve, reject) => {
        if (objectID == undefined) 

        if (localStorage.getItem("Cache_" + objectID) === null) {
            const Http = new XMLHttpRequest();
            const url = API_URL + "/objects/" + objectID;
            Http.open("GET", url);
            Http.send();

            Http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        localStorage.setItem("Cache_" + objectID, Http.responseText);
                        resolve(JSON.parse(Http.responseText));
                    }
                }
            }
        } else {
            var data = JSON.parse(localStorage.getItem("Cache_" + objectID));
            resolve(data);
        }
    });
}

export 

export 