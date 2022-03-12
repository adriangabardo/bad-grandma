import { CanvasRenderingContext2D, createCanvas, Image, loadImage } from "canvas";
import fs from "fs";
import { drawImage, Filters, glitch, gradient, noise, tile } from "../processors";
import { Dimensions } from "../types/Dimensions.types";
import { getRandom } from "../util/getRandom";
import { sizeFromImage } from "../util/sizeFrom";

const options_factory = ({
  ctx,
  img,
  size,
  opacity = 0.2,
}: {
  ctx: CanvasRenderingContext2D;
  img: Image;
  size: Dimensions;
  opacity?: number;
}) => [
  () => tile(ctx, img),
  () => drawImage(ctx, img),
  () => glitch(ctx, img),
  () => gradient(ctx, size),
  () => noise(ctx, size, opacity),
  () => {
    Filters.randomApply(ctx);
    drawImage(ctx, img);
    Filters.empty(ctx);
  },
  //   () => Filters.randomApply(ctx),
  //   () => Filters.empty(ctx),
];

/**
 * Completely randomized image output.
 * @param src - The image source.
 * @param output - The destination.
 */
export const randomizer = async (src: string, output: string) => {
  const image = await loadImage(src);
  const size = sizeFromImage(image);
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext("2d");

  drawImage(ctx, image);

  const options = options_factory({ ctx, img: image, size });

  const random_effects_amount = getRandom(2, 6);

  for (let x = 0; x <= random_effects_amount; x++) {
    const random_index = getRandom(0, options.length - 1);

    options[random_index]();
  }

  const out = fs.createWriteStream(output);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The JPEG file was created."));
};
