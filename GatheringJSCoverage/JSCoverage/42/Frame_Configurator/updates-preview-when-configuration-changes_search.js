
document.addEventListener('DOMContentLoaded', event => {
    //ingredients
    if(retrieveFromLocal("cart"))else{
        addCart(0)
    }
    const params = (new URL(document.location)).searchParams;
    const termQuery = params.get('q');
    if (!termQuery) {
      retrieveHighlights();
        return;
    }});

const form = document.querySelector('form');
console.log(form)
form.addEventListener('submit', );

async function retrieveHighlights(){
    var req=new XMLHttpRequest();
    req.open("GET",'/highlights.json',true);
    req.send();
    req.onload=
      
}











function retrieveFromLocal(key){
    if(key in localStorage)
}



