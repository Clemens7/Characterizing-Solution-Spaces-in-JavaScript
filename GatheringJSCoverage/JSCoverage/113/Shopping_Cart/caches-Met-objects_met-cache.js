export const storeImage = 

export const fetchImage = (id) => {
  if(id in localStorage){
    console.log(`Fetching image with id ${id} from local storage.`);
    return JSON.parse(localStorage[id]);
  }
}