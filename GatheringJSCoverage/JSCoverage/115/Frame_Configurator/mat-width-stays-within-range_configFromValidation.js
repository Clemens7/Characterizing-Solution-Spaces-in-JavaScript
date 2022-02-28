export const isValidFrameWidth = ;

export const correctFrameWidthValue = ;

export const isValidMatWidth = (obj) => {
  const input = obj.value;
  if (input >= 0 && input <= 10) {
    if ((input * 10) % 1 === 0) 
  }
  return false;
};

export const correctMatWidthValue = (obj) => {
  const input = obj.value;
  if (input < 0) {
    return 0;
  }
  if (input > 10) {
    return 10;
  }
  return Math.round(input * 10) / 10;
};