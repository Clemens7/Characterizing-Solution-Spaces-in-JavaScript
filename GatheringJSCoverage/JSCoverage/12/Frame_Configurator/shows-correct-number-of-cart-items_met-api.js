export const MET_API = 'https://collectionapi.metmuseum.org/public/collection/v1/'

export const fetchObject = 

// check if object is already cached, if not fetch it
export const getObject = async (id, cache) => {
  return cache.getById(id) 
}

export const getSearchResults = 

class Cache {
  constructor() {
    this.objects = JSON.parse(localStorage.getItem('cache') )
  }

  getById(id) {
    return this.objects.find(object => object.objectID == id)
  }

  
}

export const cache = new Cache()
