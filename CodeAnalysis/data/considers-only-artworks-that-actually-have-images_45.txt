

        const urlPrefixWithSearchWord = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=`;
        const form = document.querySelector('#search-section form');


        function processRequest(value) {
            let artWorksData;

            if (value == null)  else {
                if (value.length === 0)  else {
                    artWorksData = retrieveSearchWord(value);
                }
            }

                artWorksData.then(info => {
                    console.log("info: " + info);
                    removeFromHtml();
                    loadArtWorks(info, value)
                });
        }


        form.addEventListener('submit', );

        document.addEventListener('DOMContentLoaded', event => {
            if('cart' in localStorage) 
            const params = (new URL(document.location)).searchParams;
            const artQuery = params.get('q');
            document.getElementById('search').value = artQuery;
            processRequest(artQuery);
        });

        

        async function retrieveSearchWord(searchWord) {
            document.getElementById("search-info").textContent = "Searching for “" + searchWord + "”...";
            let url;
            let rawData;
            url = urlPrefixWithSearchWord + `${searchWord}`;

            try {
                const response = await fetch(url);
                rawData = await response.json();

            } 
            if (rawData.objectIDs === null) 

            return rawData.objectIDs.slice(0, 100);
        }

        async function loadArtWorks(data, value) {
            let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
            let fetches = [];
            let toSave = [];
            let counter = 0;
            let localObjectBool;
            let gallery = document.getElementById("gallery");

            if (data != null) {
                for (let entry of data) {
                    let objUrl = url + entry;

                    if (localStorage[entry] != null)  else {
                        fetches.push(
                            fetch(objUrl)
                                .then()
                                .then()
                        );
                    }
                }

                if (fetches.length !== 0) {
                    await Promise.all(fetches).then();) 

            }}

        

        function removeFromHtml() {
            let gallery = document.getElementById("gallery");
            gallery.innerHTML = "";
        }
    