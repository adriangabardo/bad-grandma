import { CanvasRenderingContext2D } from "canvas";

export const apply = (context: CanvasRenderingContext2D, filter: string) => (context.filter = filter);
export const empty = (context: CanvasRenderingContext2D) => (context.filter = "");
