export function hexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Invalid HEX color");
  }

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s: number;
  const l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${h * 360} ${s * 100}% ${l * 100}%`;
}

export function convertLuminance(hsl: string): string {
  const [h, s, l] = hsl.split(" ").map(parseFloat);

  if (l > 90) {
    return `${h} ${s}% 90%`;
  } else {
    return hsl;
  }
}

export const isLowLuminance = (hsl: string): boolean => {
  const [, , l] = hsl.split(" ").map(parseFloat);
  return l < 70;
};
