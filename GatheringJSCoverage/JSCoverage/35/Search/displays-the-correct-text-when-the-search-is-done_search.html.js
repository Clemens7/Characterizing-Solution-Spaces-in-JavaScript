
    import { retrieveArtworksList, retrieveArtworks } from './artworks.js';
    import { updateCartLink } from './dom-helper.js';

    updateCartLink();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('q');
    handleRequest(query);

    /**
     * Attempts to fetch the highlights.json file and return its contents. If this operation fails, it rejects with an
     * appropriate error message.
     *
     * @returns {Promise<number[]>}
     */
    

    /**
     * Similar to fetchHighlightIds, but in case of an error this function returns a fallback of highlight IDs and
     * prints a warning to the console.
     *
     * @returns {Promise<number[]>}
     */
    

    async function handleRequest(query){

      if( query === null || query.length === 0 ) 

      const searchInfo = document.getElementById('search-info');
      searchInfo.innerText = `Searching for “${query}”...`;

      const { total, result } = await retrieveArtworksList(query);

      if (total > 0) 

      const plural = total === 1  : "s";
      searchInfo.innerText = `Found ${total} artwork${plural} for “${query}”`;

    }

  