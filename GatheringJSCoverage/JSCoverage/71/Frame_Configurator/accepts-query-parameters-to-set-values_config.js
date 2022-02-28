import {round} from "./frame.js";
import {Label} from "./label.js";

let rawData = null;
const MET_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";


export function updateWidth(inputValue, min, max) {
    let width = 0;
    let value = round(inputValue, 0);
    if (value >= min) {
        if (value <= max) {
            width = value;
        }
    }
    return width;
}

export 

export 
