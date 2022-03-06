import { Dimensions } from "../types/Dimensions.types";
import { CanvasRenderingContext2D } from "canvas";
import randomcolor from "randomcolor";
import { getRandom, getRandomArbitrary } from "../util/getRandom";

/**
 * A gradient randomizer
 * @param ctx - The canvas context
 * @param size - The size of the canvas to fill with gradient
 */
export const gradient = (ctx: CanvasRenderingContext2D, size: Dimensions) => {
  var grad = ctx.createLinearGradient(0, 0, size[0], 0);

  const count = getRandom(3, 9);
  const alpha = Number(getRandomArbitrary(0.1, 0.5).toFixed(2));

  const colors = randomcolor({
    count,
    alpha,
    format: "rgba",
  });

  colors.forEach((color, index) => {
    const first = () => index === 0;
    const last = () => colors.length === index + 1;

    // First and last index are at gradient's ends, everything else is added in a random point of the gradient.
    const placement = first() ? 0 : last() ? 1 : getRandomArbitrary(0, 1);

    grad.addColorStop(placement, color);
  });

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, ...size);
};
