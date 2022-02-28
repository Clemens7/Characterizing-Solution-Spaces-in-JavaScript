export 

export function setAttributes(element, attributes) {
    for(let key in attributes) {
        // deals with more deeply structured attributes (e.g., style)
        if(typeof(attributes[key]) === 'object')  else {
            element[key] = attributes[key];
        }
    }
    return element;
}

export 

export 
