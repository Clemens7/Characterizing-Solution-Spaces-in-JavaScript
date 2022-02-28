export function retrieve(search){
    if(search in localStorage){
        return JSON.parse(localStorage[search]);
    }
}
export 
