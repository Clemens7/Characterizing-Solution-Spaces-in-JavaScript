export const CacheType =
{
    Search: 1,
    ObjId: 2
};

export function get(token, type) {
    if (!token) 
    const cached = localStorage.getItem(getKey(token, type));
    if (!cached) 
    return JSON.parse(cached);
}

export 

function getKey(token, type) {
    switch (type) {
        
        case CacheType.ObjId:
            return "objId:" + token;
    }}
