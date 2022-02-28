
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
    async function fetchHighlightIds() {
      const res = await fetch("./highlights.json");
      if (!res.ok) 
      const json = await res.json();
      if (!Array.isArray(json.highlights)) 
      return json.highlights;
    }

    /**
     * Similar to fetchHighlightIds, but in case of an error this function returns a fallback of highlight IDs and
     * prints a warning to the console.
     *
     * @returns {Promise<number[]>}
     */
    async function loadHighlightIds() {
      const HIGHLIGHTS_FALLBACK = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];
      try {
        return await fetchHighlightIds();
      }}

    async function handleRequest(query){

      if( query === null  ) {
        const highlights =  await loadHighlightIds();
        await retrieveArtworks(highlights);
        return;
      };
      searchInfo.innerText = `Found ${total} artwork${plural} for “${query}”`;

    }

  