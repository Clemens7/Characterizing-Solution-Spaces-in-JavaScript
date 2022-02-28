export function retrieve(keys){

	var hits = new Array();
	var misses = new Array();
	for (var i = 0; i < keys.length; i++){
		if(keys[i] in localStorage){
			hits.push(JSON.parse(localStorage[keys[i]]));
		}
	}
	return {hits, misses};
}

export function store(items){
	for (var i = 0; i < items.length; i++)
}