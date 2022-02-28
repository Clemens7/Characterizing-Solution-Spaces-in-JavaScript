
        import * as Search from './search.js';
        import * as Config from './config.js';

        async function artSearch(searchToken) {
            const arts = await Search.retrieve(searchToken);
            if (arts === undefined || arts === null) 
            createTiles(arts);
            return arts.length;
        }

        document.addEventListener('DOMContentLoaded', async event => {
            const params = (new URL(document.location)).searchParams;
            const searchQuery = params.get('q');
            if (!searchQuery) {
                await artSearch(/*undefined*/);
                return;
            }});
        document.addEventListener('DOMContentLoaded', Config.updateCartItems());

        function createTiles(arts) {

            const gallery = document.getElementById("gallery");

            for (let i = 0; i < arts.length; i++) {
                const div1 = document.createElement("div");
                div1.className = "thumb";
                const a = document.createElement("a");
                a.href = "config.html?objectID=" + arts[i].objectID;
                a.id = "object-" + i;
                div1.appendChild(a);
                const img = document.createElement("img");
                img.src = arts[i].primaryImageSmall;//primaryImage;
                img.alt = arts[i].title;
                img.id = "object-image-" + i;
                a.appendChild(img);
                const div2 = document.createElement("div");
                div2.className = "museum-label";
                a.appendChild(div2);
                const spanArtist = document.createElement("span");
                const spanTitle = document.createElement("span");
                const spanDate = document.createElement("span");
                spanArtist.className = "artist";
                spanArtist.innerText = arts[i].artistDisplayName;
                spanTitle.className = "title";
                spanTitle.innerText = arts[i].title;
                spanDate.className = "date";
                spanDate.innerText = arts[i].objectDate;
                div2.appendChild(spanArtist);
                div2.appendChild(spanTitle);
                div2.appendChild(document.createTextNode(", "));
                div2.appendChild(spanDate);

                gallery.appendChild(div1);
            }
        }
         /*document.getElementsByClassName('search-form')[0].addEventListener('submit', event => {
             const searchInput = document.getElementById('search');
             if (!searchInput.value) {
                 searchInput.style.border = "1px solid red";
                 event.preventDefault();
             }
         });*/
    