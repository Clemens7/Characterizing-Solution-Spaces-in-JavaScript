import { readArtworkFromCache, writeArtworkToCache } from './cache.js';
import { Artwork } from './classes.js';
import { createThumb } from './dom-helper.js';

export 

/**
 * Attempts to fetch a given artwork by ID. If this operation fails, the returned promise rejects with an error.
 * @returns {Promise<Artwork>}
 */
export 

/**
 * Memoizes a given function, so that on successive calls with an equal argument the last return value is immediately
 * returned and the inner function never invoked. This only memoizes on the first argument!
 */
function memoize(f) {
  const cache = new Map();
  return arg => {
    const existing = cache.get(arg);
    if (existing)  else {
      const result = f(arg);
      cache.set(arg, result);
      return result;
    }
  };
}

/**
 * Attempts to retrieve the given artwork from the cache. If it doesn't exist yet, it loads it from the API, stores it
 * in the cache, and then returns it.
 */
export const retrieveArtworkById = memoize(async function retrieveArtworkById(objectID) {
  const existing = readArtworkFromCache(objectID);
  if (existing != null) {
    return existing;
  }});

export 

