export const MET_API = 'https://collectionapi.metmuseum.org/public/collection/v1/'

export const fetchObject = 

// check if object is already cached, if not fetch it
export const getObject = async (id, cache) => {
  return cache.getById(id) 
}

export const getSearchResults = async term => {
  const request = await fetch(`${MET_API}search?hasImages=true&q=${term}`)
  const response = await request.json()
  let ids = response.objectIDs 
  return ids.splice(0, 100) // return only first 100 results
}

class Cache {
  constructor() {
    this.objects = JSON.parse(localStorage.getItem('cache') )
  }

  getById(id) {
    return this.objects.find(object => object.objectID == id)
  }

  add(items) {
    this.objects = Array.from(new Set([...this.objects, ...items]))
    localStorage.setItem('cache', JSON.stringify(this.objects))
  }
}

export const cache = new Cache()
