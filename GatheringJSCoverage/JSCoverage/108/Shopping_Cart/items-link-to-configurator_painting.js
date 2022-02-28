export class Painting {
    constructor(id, name, artistDisplayName, objectDate, primaryImageSmall) {
        this.id = id;
        this.name = name;
        this.artist = artistDisplayName;
        this.date = objectDate;
        this.image = primaryImageSmall;
    }

    static retrieve(id) {
        const key = id;
        if(key in localStorage) 
    }

    static store(painting) {
        const key = painting.id;
        //console.log(`Storing ${key} in local storage`);
        localStorage[key] = JSON.stringify(painting);
    }
}
