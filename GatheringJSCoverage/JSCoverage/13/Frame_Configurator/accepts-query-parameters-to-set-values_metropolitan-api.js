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
        if (object) 
        else {
            // read object via api
            let metropolitanResponse = yield fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
            let responseJson = yield metropolitanResponse.json();
            var metropolitanObject = new MetropolitanObject();
            metropolitanObject.fillFromJSON(responseJson);
            let storage = localStorage.getItem('objects');
            var json = storage == null || storage.length == 0  : storage;
            var objects = JSON.parse(json);
            objects.push(metropolitanObject);
            localStorage.setItem('objects', (JSON.stringify(objects).split(",\"_").join(",\"")).split("{\"_").join("{\""));
            return yield Promise.resolve(metropolitanObject);
        }
    });
}
function checkObject(objectID) {
    let storage = localStorage.getItem('objects');
    var json = storage == null || storage.length == 0  : storage;
    var objects = JSON.parse(json);
    let index = objects.findIndex(object => object.objectID == objectID);
    if (index == -1) {
        return undefined;
    }
}
export 
