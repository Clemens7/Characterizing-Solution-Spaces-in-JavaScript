import {Art} from './search.js';
import * as ArtCache from './art-cache.js';
import {ArtDocumentContainer} from './art-dom.js'

var highlights;
const artContainer = new ArtDocumentContainer();

export async function retrieve(searchTerm){
    let arts = ArtCache.retrieve(searchTerm);
    if(arts){
        for(let art of arts){
            artContainer.addArtToDocument(art);
        }
        return arts.length;
    }}



