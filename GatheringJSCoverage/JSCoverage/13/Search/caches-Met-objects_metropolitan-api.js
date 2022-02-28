// TODO 
// all requests to metropolitan museum of art collection api go here
var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MetropolitanObject, MetropolitanSearchResponseObject } from "./metropolitan_entities.js";
export function getObject(objectID) {
    return __awaiter(this, void 0, void 0, function* () {
        //check if object already was requested
        let object = checkObject(objectID);
        if (object) {
            return yield Promise.resolve(object);
        }
    });
}
function checkObject(objectID) {
    let storage = localStorage.getItem('objects');
    var json = storage == null || storage.length == 0  : storage;
    var objects = JSON.parse(json);
    let index = objects.findIndex(object => object.objectID == objectID);
    if (index == -1) 
    else {
        var object = new MetropolitanObject();
        object.fillFromJSON(objects[index]);
        return object;
    }
}
export function searchMET(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=true`);
        console.log("got here");
        let responseJson = yield response.json();
        var metropolitanSearchResponseObject = new MetropolitanSearchResponseObject();
        metropolitanSearchResponseObject.fillFromJSON(responseJson);
        console.log('Search returned: ', metropolitanSearchResponseObject);
        return yield Promise.resolve(metropolitanSearchResponseObject);
    });
}
