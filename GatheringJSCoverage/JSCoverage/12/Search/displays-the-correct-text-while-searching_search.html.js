
    import { getSearchResults, getObject, cache } from '/met-api.js'

    const search = async term => {
      const info = document.getElementById('search-info')
      info.innerText = `Searching for “${term}”...`
      renderArtworks([])

      const ids = await getSearchResults(term)
      const results = ids.map(async id => getObject(id, cache))

      // wait until all request are finished
      Promise.all(results).then(objects => {
        info.innerText = `Found ${objects.length} artwork${objects.length !== 1 && 's' } for “${term}”`
        renderArtworks(objects)
        cache.add(objects)
      })
    }

    const showHighlights = 

    const renderArtworks = objects => {
      document.getElementById('gallery').innerHTML = objects.map(item => `
          <div class="thumb">
            <a href="/config.html?objectID=${item.objectID}" id="object-0">
              <img src="${item.primaryImageSmall}" alt="${item.title}" id="object-image-0">
              <div class="museum-label">
                <span class="artist">${item.artistDisplayName}</span>
                <span class="title">${item.title}</span>,
                <span class="date">${item.objectDate}</span>
              </div>
            </a>
          </div>
        `).join('')
    }

    document.querySelector('.search-form').addEventListener('submit', )

    // set value of input to query parameter q
    const term = new URL(window.location).searchParams.get('q')
    if (term) {
      document.getElementById('search').value = term
      search(term)
    }

    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart != null 


  