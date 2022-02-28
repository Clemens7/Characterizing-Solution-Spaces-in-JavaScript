const ONCE = { once: true };

export function round(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

export 

export function whenImageLoaded(img) {
  return new Promise((resolve, reject) => {
    if (img.complete)  else {
      img.addEventListener('load', () => resolve(), ONCE);
      img.addEventListener('error', , ONCE);
    }
  });
}

export function arrayQuerySelector(container, ...queries) {
  return queries.map(q => container.querySelector(q));
}

export 

export 
