
    import { getSearchResults, getObject, cache } from '/met-api.js'

    const search = async term => {
      const info = document.getElementById('search-info')
      info.innerText = `Searching for “${term}”...`
      renderArtworks([])

      const ids = await getSearchResults(term)}

    const showHighlights = 

    const renderArtworks = objects => {
      document.getElementById('gallery').innerHTML = objects.map().join('')
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


  