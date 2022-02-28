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

const loadElementsFromHighlights = () => {
    console.log('Loading elements from highlights')
    rs.get('highlights.json').then(values => {
        gallery.innerHTML = ''
        for (const item of values.highlights) {
            createGalleryItems(item)
        }
    })
}

const search = async (q) => {
    if (q === '') 
    if(q.includes('+'))
        q = q.replace('+', ' ')

    console.log(q)

    console.log('Loading elements from api')

    searchInfo.textContent = `Searching for “${q}”...`

    try {
        const objectIds = (await metropolitanService.search(q, true, true))
        let ids = [];

        if (objectIds.objectIDs)
            ids = objectIds.objectIDs.slice(0, apiResultLimit)

        for (const item of ids)
            createGalleryItems(item)

        searchInfo.textContent = `Found ${objectIds.total} ${objectIds.total !== 1 ? 'artworks' } for “${q}”`

    } 
}

if (urlParams.has('q'))
    
else
    loadElementsFromHighlights()


form.addEventListener('submit', async event => {
    gallery.innerHTML = ''
    event.preventDefault()

    const q = document.getElementById('search')

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('q', q.value)
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString()
    history.pushState(null, '', newRelativePathQuery)

    await search(q.value)
})

const createGalleryItems = (id) => {
    CacheService.set(id, async () => {
        const obj = await metropolitanService.object(id, true)
        gallery.innerHTML = gallery.innerHTML + createGalleryItem(obj)
        return obj
    })
}

const createGalleryItem = ({ objectID, primaryImageSmall, artistDisplayName, title, objectDate }) => {
    return `
        <div class="thumb">
            <a href="config.html?objectID=${objectID}" id="object-${objectID}">
            <img src="${primaryImageSmall}" alt="${artistDisplayName}" id="${objectID}">
                <div class="museum-label">
                    <span class="artist">${artistDisplayName}</span>
                    <span class="title">${title}</span>,
                    <span class="date">${objectDate}</span>
                </div>
            </a>
      </div>`
}
