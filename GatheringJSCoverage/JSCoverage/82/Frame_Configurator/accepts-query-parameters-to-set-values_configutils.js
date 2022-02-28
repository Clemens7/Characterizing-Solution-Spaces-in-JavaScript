const ONCE = { once: true };

export function round(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

export function clamp(number, min, max, step = 1) {
  let value = number;
  value = round(Math.round(value / step) * step);
  if (value > max) 
  if (value < min) 
  return value;
}

export function whenImageLoaded(img) {
  return new Promise((resolve, reject) => {
    if (img.complete)  else {
      img.addEventListener('load', , ONCE);
      img.addEventListener('error', , ONCE);
    }
  });
}

export function arrayQuerySelector(container, ...queries) {
  return queries.map(q => container.querySelector(q));
}

export 

export 
