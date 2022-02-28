// TODO
// all request to armart shipping api go here
var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Destination } from "./destination_entities.js";
import * as DestinationCache from "./artmart-shipping-cache.js";
const ARTMART_BASE_URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/';
export function loadDestinations() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = ARTMART_BASE_URL + 'shipping';
        let destinations = [];
        try {
            let responseDestinations = DestinationCache.retrieve();
            if (responseDestinations) {
            }
            console.log(responseDestinations);
            for (let i = 0; i < responseDestinations.length; i++) {
                let destination = new Destination();
                destination.fillFromJSON(responseDestinations[i]);
                destinations.push(destination);
            }
            return yield Promise.resolve(destinations);
        }});
}
