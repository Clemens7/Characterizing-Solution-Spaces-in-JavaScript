export class ArtAPI{
    constructor(){
        this.url = "https://collectionapi.metmuseum.org/public/collection/v1/"
    }

   

    async getObjectsIdBySearchparameter(query){
        if (!query)
        console.log(query);
        const response = await fetch(this.url + "search?q=" + query + "&hasImages=true");}
}
