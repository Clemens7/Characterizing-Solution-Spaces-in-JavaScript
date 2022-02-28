export const MET_API = 'https://collectionapi.metmuseum.org/public/collection/v1/'

export const fetchObject = async id => {
  console.log(`Fetch object with id ${id} from API`)
  const request = await fetch(`${MET_API}objects/${id}`)
  const response = await request.json()

  if (response.message)  else {
    return response
  }}

// check if object is already cached, if not fetch it
export const getObject = async (id, cache) => {
  return cache.getById(id) || await fetchObject(id)
}

export const getSearchResults = async term => {
  const request = await fetch(`${MET_API}search?hasImages=true&q=${term}`)
  const response = await request.json()
  let ids = response.objectIDs 
  return ids.splice(0, 100) // return only first 100 results
}

class Cache {
  constructor() {
    this.objects = JSON.parse(localStorage.getItem('cache') || '[]')
  }

  getById(id) {
    return this.objects.find()
  }

  add(items) {
    this.objects = Array.from(new Set([...this.objects, ...items]))
    localStorage.setItem('cache', JSON.stringify(this.objects))
  }
}

export const cache = new Cache()
