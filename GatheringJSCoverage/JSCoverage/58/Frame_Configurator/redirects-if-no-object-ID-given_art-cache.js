export function retrieve(keys){

	var hits = new Array();
	var misses = new Array();
	for (var i = 0; i < keys.length; i++){
		if(keys[i] in localStorage) else {
			misses.push(keys[i]);
		}
	}
	return {hits, misses};
}

export 