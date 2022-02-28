export const isValidFrameWidth = (obj) => {
  const input = obj.value;
  if (input >= 2 && input <= 5) {
    if ((input * 10) % 1 === 0) 
  }
  return false;
};

export const correctFrameWidthValue = (obj) => {
  const input = obj.value;
  if (input < 2) {
    return 2;
  }
  if (input > 5) {
    return 5;
  }
  return Math.round(input * 10) / 10;
};

export const isValidMatWidth = ;

export const correctMatWidthValue = 