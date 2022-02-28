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
export 

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
