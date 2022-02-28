/**
 * Class for search helper functions +  DOM functions
 */

/*
 * Returns ID
 * */
import {
    Painting
} from './picture.js';

export 


export async function getObjectsFromSearch(ObjectIDs) {

    try {
        let listOfImages = [];

        for (let id of ObjectIDs.slice(0, 100)) {
            const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
            const temp = await fetch(API_URL);}


export async function getHighlightImages() {
    try {
        let highlightRaw = await fetch("highlights.json");
        let highlightJson = await highlightRaw.json();

        let pictureArray = await getObjectsFromSearch(highlightJson.highlights);}


export 
