export const CacheType =
{
    Search: 1,
    ObjId: 2
};

export function get(token, type) {
    if (!token) 
    const cached = localStorage.getItem(getKey(token, type));
    if (!cached) {
        return;
    }}

export function set(token, type, content) {
    if (!content) {
        return;
    }}

function getKey(token, type) {
    switch (type) {
        case CacheType.Search:
            return "cache:" + token;
        
    }}
