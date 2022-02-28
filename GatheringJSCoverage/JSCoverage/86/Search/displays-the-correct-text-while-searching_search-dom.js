

function createItem(data){
  const items = document.createElement('div');
  items.className = "thumb";
  items.innerHTML =`<a href="config.html?objectID=${data.objectID}" id="object-${data.objectID}">
  <img src="${data.primaryImageSmall}" alt ="${data.title}" id="object-image-${data.objectID}">
  <div class="museum-label">
    <span class="artist">${data.artistDisplayName}</span>
    <span class="title">${data.title}</span>,
    <span class="date">${data.objectDate}</span>
  </div>
  </a>`;
  return items;
}


export{ createItem };
