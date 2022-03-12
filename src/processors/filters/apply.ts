import { CanvasRenderingContext2D } from "canvas";

/**
 * Applies a filter string to the context object .filter property passed in.
 */
export const apply = (context: CanvasRenderingContext2D, filter: string) => (context.filter = filter);

/**
 * Uses the apply method to empty out the filter property.
 */
export const empty = (context: CanvasRenderingContext2D) => apply(context, "");
