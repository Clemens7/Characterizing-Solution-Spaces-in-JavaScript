export class ArtAPI{
    constructor(){
        this.url = "https://collectionapi.metmuseum.org/public/collection/v1/"
    }

   async getObjectById(id){
        if(!id)
        if(window.localStorage.getItem(id)){
           return JSON.parse(window.localStorage.getItem(id));
       }}

    async getObjectsIdBySearchparameter(query){
        if (!query)
        console.log(query);
        const response = await fetch(this.url + "search?q=" + query + "&hasImages=true");
        return await response.json();
    }
}
