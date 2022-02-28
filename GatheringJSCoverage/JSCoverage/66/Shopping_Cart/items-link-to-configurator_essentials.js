/**
 * Saves an Object to the local storage
 *
 * @param cart the cart object which is going to be saved
 * @returns items
 */


function getLocalStorage(key) {
    var items = JSON.parse(localStorage.getItem(key) );
    return items;
}


function httpGetById(url, id)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url + id, false); // true for asynchronous
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}



function setDescription(printSize, frameStyle, frameWidth, matColor, matWidth)  {
    var result = "";

    switch (printSize) {
        case 'S':
            result += "Small";
            break;
        case 'M':
            result += "Medium";
            break;
        case 'L':
            result += "Large";
            break;
    }

    result += " print in a ";
    result += frameWidth;
    result += " cm ";
    result += frameStyle;

    if ( matWidth === 0 )   else {
        result += " frame with a ";
        result += matWidth;
        result += " cm ";
        result += matColor;
        result += " mat.";

    }

    return result;
}

