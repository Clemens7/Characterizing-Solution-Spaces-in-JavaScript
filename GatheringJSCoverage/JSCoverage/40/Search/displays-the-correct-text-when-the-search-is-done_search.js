import { MetropolitanService } from './MetropolitanService.js'
import { apiResultLimit } from './environment.js'
import { RequestService } from './RequestService.js'
import * as CacheService from './CacheService.js'

const form = document.getElementById('search-form')
const gallery = document.getElementById('gallery')
const searchInfo = document.getElementById('search-info')
const searchBox = document.getElementById('search')

const urlParams = new URLSearchParams(window.location.search)

const metropolitanService = new MetropolitanService()
const rs = new RequestService('')

const searchParams = new URLSearchParams(window.location.search)
searchBox.value = searchParams.get('q')

const cartLabelElement = document.getElementById('cart-link')
const cart = CacheService.get('cart')
cartLabelElement.innerHTML = `Cart ${cart  : ''}`

const loadElementsFromHighlights = 

const search = async (q) => {
    if (q === '') 
    if(q.includes('+'))
        

    console.log(q)

    console.log('Loading elements from api')

    searchInfo.textContent = `Searching for “${q}”...`

    try {
        const objectIds = (await metropolitanService.search(q, true, true))
        let ids = [];

        if (objectIds.objectIDs)
            

        for (const item of ids)
            

        searchInfo.textContent = `Found ${objectIds.total} ${objectIds.total !== 1 ? 'artworks' } for “${q}”`

    } 
}

if (urlParams.has('q'))
    search(urlParams.get('q'))


form.addEventListener('submit', )

const createGalleryItems = 

const createGalleryItem = 
