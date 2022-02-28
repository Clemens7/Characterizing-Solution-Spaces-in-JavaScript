
//////////// +++ ARTWORK +++ ///////////////
export class Artwork {
    
}


/////////// +++ RETRIEVE +++ //////////////////
export async function retrieve(q) {

    if (q in localStorage) {
        let cacheArtworks = JSON.parse(localStorage[q]);
        if (cacheArtworks) return cacheArtworks;
    }}



/////////// +++ DISPLAY +++ //////////////////

export function display(artwork, count){
        console.log(artwork);


     let div = document.createElement('div'); // build gallery element
     div.className = 'thumb';


     console.log(artwork.objectID);
     let a = document.createElement('a');
     a.href = `/config.html?objectID=${artwork.objectID}`;
     a.id = "object-" + 0;

     let img = document.createElement('img');
     img.src = artwork.primaryImageSmall;
     img.alt = "Title: " + artwork.title + " Artist: " + artwork.artistDisplayName + " Date: " + artwork.objectDate;
     img.id = "object-image-" + count;

     let divchild = document.createElement('div');
     divchild.className = 'museum-label';

     let span1 = document.createElement('span');
     span1.className = 'artist';
     span1.innerText = artwork.artistDisplayName;

     let span2 = document.createElement('span');
     span2.className = 'title';
     span2.innerText = artwork.title + ", ";

     let span3 = document.createElement('span');
     span3.className = 'date';
     span3.innerText = artwork.objectDate;

     divchild.appendChild(span1);
     divchild.appendChild(span2);
     divchild.appendChild(span3);

     a.appendChild(img);
     a.appendChild(divchild);

     div.appendChild(a);

     let gallery = document.getElementById('gallery'); // add to gallery
     gallery.appendChild(div);

}


/////////// +++ LOAD HIGHLIGHTS +++ //////////////////

export 
