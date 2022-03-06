import { CanvasRenderingContext2D, Image } from "canvas";
import { getRandom } from "../util/getRandom";

/**
 * Draws image into canvas, with a vertical glitch effect to it.
 */
export const glitch = (ctx: CanvasRenderingContext2D, img: Image) => {
  const divisionRandomiser = getRandom(35, 75); // Random number by which we divide the image height to get n of vertical slices
  const verticalSlices = Math.round(img.height / divisionRandomiser);
  const maxHorizOffset = getRandom(30, 70);

  for (var i = 0; i < verticalSlices; i++) {
    const horizOffset = getRandom(-Math.abs(maxHorizOffset), maxHorizOffset);

    /**
     * The vertical slice of the image that we will use.
     */
    const yAxis = i * (img.height / verticalSlices);

    /**
     * The vertical slice plus the height of the slice, which is based on the amount of slices.
     */
    const yHeight = img.height / verticalSlices;

    // horizOffset is used as the randomized offset of where the image slice is placed in the X-axis
    ctx.drawImage(img, 0, yAxis, img.width, yHeight, horizOffset, yAxis, img.width, yHeight);
  }
};
