export const isValidFrameWidth = (obj) => {
  const input = obj.value;
  if (input >= 2 && input <= 5) {
    if ((input * 10) % 1 === 0) {
      return true;
    }
  }};

export const correctFrameWidthValue = ;

export const isValidMatWidth = (obj) => {
  const input = obj.value;
  if (input >= 0 && input <= 10) {
    if ((input * 10) % 1 === 0) {
      return true;
    }
  }};

export const correctMatWidthValue = 