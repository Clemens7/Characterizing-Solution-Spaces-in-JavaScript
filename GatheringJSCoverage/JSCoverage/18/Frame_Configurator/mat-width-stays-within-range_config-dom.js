export function setLabel(fetchedPicture) {
    const imageLabel = document.getElementById('image-label');
    const artistLabel = document.getElementById('artist-label');
    const titleLabel = document.getElementById('title-label');
    const dateLabel = document.getElementById('date-label');

    imageLabel.appendChild(artistLabel);
    imageLabel.appendChild(titleLabel);
    imageLabel.appendChild(dateLabel);

    artistLabel.innerText = `${fetchedPicture.artistDisplayName}`;
    titleLabel.innerText = `${fetchedPicture.title}, `;
    dateLabel.innerText = fetchedPicture.objectDate;
}
