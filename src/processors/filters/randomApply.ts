import { CanvasRenderingContext2D } from "canvas";
import { apply } from "./apply";
import { random } from "./random";

/**
 * A combination of the random() and the apply() methods.
 */
export const randomApply = (context: CanvasRenderingContext2D) => apply(context, random());
