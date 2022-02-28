export const storeImage = (image) => {
  const key = image.id;
  console.log(`Storing image with id ${key} in local storage.`);
  localStorage[key] = JSON.stringify(image);
}

export const fetchImage = (id) => {
  if(id in localStorage)
}