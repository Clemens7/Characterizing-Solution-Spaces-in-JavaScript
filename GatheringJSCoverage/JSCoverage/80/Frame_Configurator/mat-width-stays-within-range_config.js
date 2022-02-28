import * as Frame from "./frame.js";
import * as Util from "./util.js";
import * as Cache from "./cache.js";
import { Artwork } from "./artwork.js";
import { CartItem } from "./cart-item.js";
import { resolveArtwork } from "./api.js";

function roundAndBoundValue(val, range) {
    return Math.round(Math.max(range[0], Math.min(val, range[1])) * 10) / 10;
}

function setValues(self, other, range, e) {
    const v = roundAndBoundValue(parseFloat(e.target.value), range);
    self.value = v;
    other.value = v;
    renderPreview(imgObj);
}

function link(idSlider, idTextInput, range) {
    const slider = document.getElementById(idSlider);
    const textInput = document.getElementById(idTextInput);
    slider.addEventListener('input', )
    textInput.addEventListener('change', (e) => setValues(textInput, slider, range, e))
}





async function getArtworkData(objectId) {
    const artwork = await resolveArtwork(objectId);
    handleArtworkData(artwork);
}

function getConfigurationData() {
    const data = {};
    data.printSize = document.querySelector('input[name="printSize"]:checked').value;
    data.frameStyle = document.querySelector('input[name="frameStyle"]:checked').value;
    data.frameWidth = parseFloat(document.getElementById('frame-width-text').value) * 10;
    data.matColor = document.querySelector('input[name="matColor"]:checked').value;
    data.matWidth = parseFloat(document.getElementById('mat-width-text').value) * 10;
    console.log(data)
    return data;
}
function showSizes(sizes, data) {
    for (let v of [['s', 'S', 'Small'], ['m', 'M', 'Medium'], ['l', 'L', 'Large']]) {
        const vHtml = document.getElementById(`print-size-${v[0]}-label`);
        vHtml.innerHTML = `${v[2]}<br>${sizes[v[1]][0]/10} × ${sizes[v[1]][1]/10} cm`;
    }
    const totalHtml = document.getElementById('total-size');
    const total = [sizes[data.printSize][0] + 2*data.matWidth + 2*data.frameWidth, sizes[data.printSize][1] + 2*data.matWidth + 2*data.frameWidth];
    totalHtml.innerHTML = `${total[0] / 10} × ${total[1] / 10}`
}
function renderPreview(img) {
    const imgContainer = document.getElementById('preview-container');
    const htmlImg = document.getElementById('preview-image');
    console.log(htmlImg);
    const configurationData = getConfigurationData();
    Frame.render(img, htmlImg, imgContainer, configurationData.printSize,
        configurationData.frameStyle, configurationData.frameWidth,
        configurationData.matColor, configurationData.matWidth)
    document.getElementById('price').innerHTML = "€ " + Frame.calculatePrice(configurationData.printSize, configurationData.frameStyle, configurationData.frameWidth, configurationData.matWidth).toFixed(2);
    const sizes = Frame.getPrintSizes(img);
    showSizes(sizes, configurationData)
}

function setLabel(data) {
    const label = document.getElementById('image-label');
    label.innerHTML = `${data.artist} ${data.title} ${data.date}`
}

function handleArtworkData(data) {
    //ASSUMPTION: if data has no image => redirect to search
    console.log(data)
    if (data.image) {
        const img = new Image();
        img.onload = () => {
            document.getElementById('preview-image').src = img.src;
            imgObj = img;
            renderPreview(imgObj);
        }
        img.src = data.image
        setLabel(data);
    }
}



function presetValues(urlParams) {
    if (urlParams.get('printSize')) 
    if (urlParams.get('frameStyle')) 
    if (urlParams.get('frameWidth')) 
    if (urlParams.get('matColor')) 
    if (urlParams.get('matWidth')) 
}



function addRerenderOnChange() {
    const radios = document.querySelectorAll('input[type="radio"]')
    for (let radio of radios) {
        radio.addEventListener('click', )
    }
}

const urlParams = new URLSearchParams(window.location.search);
const objectId = urlParams.get('objectID');
let imgObj;
presetValues(urlParams)
if (!objectId)  else {
    getArtworkData(objectId)
}
addRerenderOnChange()
link("frame-width-slider", "frame-width-text", [2, 5])
link("mat-width-slider", "mat-width-text", [0, 10])
document.querySelector('#config-form').addEventListener('submit', )
