export function retrieve(searchString)
{
    if(searchString in localStorage)
    {
        console.log(`Retrieve data from loacalStorage with key ${searchString}`);
        return JSON.parse(localStorage[searchString]);
    }
}

export 