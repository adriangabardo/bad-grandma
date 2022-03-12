export type FilterFn = (param: number) => string;

export const blur: FilterFn = (percentage: number) => `blur(${percentage}px)`;
export const brightness: FilterFn = (percentage: number) => `brightness(${percentage})`;
export const contrast: FilterFn = (percentage: number) => `contrast(${percentage}%)`;
export const grayscale: FilterFn = (percentage: number) => `grayscale(${percentage}%)`;
export const hue_rotate: FilterFn = (degrees: number) => `hue-rotate(${degrees}deg)`;
export const invert: FilterFn = (percentage: number) => `invert(${percentage}%)`;
export const opacity: FilterFn = (percentage: number) => `opacity(${percentage}%)`;
export const saturate: FilterFn = (percentage: number) => `saturate(${percentage}%)`;
export const sepia: FilterFn = (percentage: number) => `sepia(${percentage}%)`;
