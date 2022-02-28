export class SearchItem {
    
}

export var SearchParser = {
    serialize : ,
    parse : function(query) {
        return query.replace('+', ' ');
    }
};
