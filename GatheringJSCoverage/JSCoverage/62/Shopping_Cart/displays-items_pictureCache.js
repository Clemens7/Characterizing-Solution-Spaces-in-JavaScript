export function retrieve(searchString)
{
    if(searchString in localStorage)
    
}

export function store(searchString, pictures)
{
    console.log(`Storing data in localStorage with key ${searchString}`);
    localStorage[searchString]= JSON.stringify(pictures);
}