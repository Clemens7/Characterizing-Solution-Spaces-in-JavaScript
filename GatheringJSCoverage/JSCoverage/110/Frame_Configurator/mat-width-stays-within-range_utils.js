export function getSearchParam(param) {
    if (param) {
        return new URL(document.location).searchParams.get(param);
    }
}

export function round(val, digits) {
    return (Math.round((val + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits));
}