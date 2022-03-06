import { Dimensions } from "../types/Dimensions.types";
import { Image } from "canvas";

export const sizeFromString = (size: string): Dimensions => {
  try {
    const [w, h] = size.split("x").map(Number);

    if (w === NaN || h === NaN) throw new Error("Size parsing failed.");

    return [w, h];
  } catch (error) {
    console.log(error);
    throw new Error("Size parsing failed.");
  }
};

export const sizeFromImage = (image: Image): Dimensions => [image.width, image.height];
