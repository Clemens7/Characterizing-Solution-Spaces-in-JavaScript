export class Painting {
    

    static retrieve(id) {
        const key = id;
        if(key in localStorage) {
            //console.log(`Retrieving key ${key} from local storage.`);
            return JSON.parse(localStorage[key]);
        }
    }

    static 
}
