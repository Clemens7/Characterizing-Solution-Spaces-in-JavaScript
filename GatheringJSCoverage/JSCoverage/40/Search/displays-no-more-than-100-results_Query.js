export class QueryString {
    constructor(queryParams) {
        this.queryParams = queryParams
    }

    toString() {
        let params = new URLSearchParams()
        this.queryParams.map(v => params.append(v.name, v.value))
        return '?' + params.toString()
    }

    static 
}

export class QueryParam {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
