import { CanvasRenderingContext2D, Image } from "canvas";

export const drawImage = (context: CanvasRenderingContext2D, image: Image) => context.drawImage(image, 0, 0);
