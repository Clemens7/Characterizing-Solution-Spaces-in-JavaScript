export class QueryString {
    

    

    static getParamFromUrl(url, param) {
        return new URLSearchParams(url).get(param)
    }
}

export class QueryParam {
    
}
