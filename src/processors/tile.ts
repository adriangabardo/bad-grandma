import { CanvasRenderingContext2D, Image } from "canvas";
import { getRandom } from "../util/getRandom";

export const tile = (ctx: CanvasRenderingContext2D, img: Image) => {
  const divisionRandomiser = getRandom(75, 125); // Random number by which we divide the image height to get n of vertical slices
  const verticalSlices = Math.round(img.height / divisionRandomiser);

  const bottomSlices = verticalSlices * 0;
  const topSlices = verticalSlices * 1;

  const horizontalSlices = Math.round(img.width / divisionRandomiser);
  const leftSlices = horizontalSlices * 0;
  const rightSlices = horizontalSlices * 1;

  for (var i = 0; i < verticalSlices; i++) {
    /**
     * The vertical slice of the image that we will use.
     */
    const yAxis = i * (img.height / verticalSlices);

    /**
     * The vertical slice plus the height of the slice, which is based on the amount of slices.
     */
    const yHeight = img.height / verticalSlices;

    // horizOffset is used as the randomized offset of where the image slice is placed in the X-axis
    // ctx.drawImage(img, 0, yAxis, img.width, yHeight, horizOffset, yAxis, img.width, yHeight);

    ctx.fillStyle = "pink";

    if (i > bottomSlices && i < topSlices) {
      //   ctx.fillRect(0, yAxis, img.width, yHeight);

      for (var h = 0; h < horizontalSlices; h++) {
        const xAxis = h * (img.width / horizontalSlices);
        const hWidth = img.width / horizontalSlices;

        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;

        const randomiser = (): boolean => getRandom(0, 1000) % 7 === 0;

        if (h > leftSlices && h < rightSlices && randomiser()) {
          ctx.drawImage(img, xAxis, yAxis, hWidth, yHeight, xAxis, yAxis, hWidth, yHeight);
        }
      }
    }
  }

  // resetting shadow blur for other functions to use
  ctx.shadowBlur = 0;
};
