
    import { getSearchResults, getObject, cache } from '/met-api.js'

    const search = 

    const showHighlights = async () => {
      const request = await fetch(`/highlights.json`)
      const { highlights: ids } = await request.json()
      const results = ids.map(async id => getObject(id, cache))

      // wait until all request are finished
      Promise.all(results).then()
    }

    const renderArtworks = 

    document.querySelector('.search-form').addEventListener('submit', )

    // set value of input to query parameter q
    const term = new URL(window.location).searchParams.get('q')
    if (term)  else {
      showHighlights()
    }

    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart != null 


  