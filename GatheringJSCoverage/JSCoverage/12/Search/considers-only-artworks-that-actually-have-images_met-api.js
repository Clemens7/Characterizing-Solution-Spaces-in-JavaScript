export const MET_API = 'https://collectionapi.metmuseum.org/public/collection/v1/'

export const fetchObject = 

// check if object is already cached, if not fetch it
export const getObject = 

export const getSearchResults = async term => {
  const request = await fetch(`${MET_API}search?hasImages=true&q=${term}`)
  return ids.splice(0, 100) // return only first 100 results
}

class Cache {
  constructor() {
    this.objects = JSON.parse(localStorage.getItem('cache') || '[]')
  }

  

  
}

export const cache = new Cache()
