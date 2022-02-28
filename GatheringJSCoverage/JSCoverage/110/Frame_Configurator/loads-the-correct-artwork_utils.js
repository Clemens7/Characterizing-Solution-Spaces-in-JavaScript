export function getSearchParam(param) {
    if (param) {
        return new URL(document.location).searchParams.get(param);
    }
}

export 