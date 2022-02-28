export class SearchItem {
    constructor(id, image, artist, title, date){
        this.id = id;
        this.image = image;
        this.artist = artist;
        this.title = title;
        this.date = date;
    }
}

export var SearchParser = {
    serialize : ,
    parse : function(query) {
        return query.replace('+', ' ');
    }
};
