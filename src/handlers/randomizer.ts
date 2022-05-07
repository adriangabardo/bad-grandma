import { CanvasRenderingContext2D, createCanvas, Image } from "canvas";
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
  () => glitch(ctx, img),
  () => gradient(ctx, size),
  () => noise(ctx, size, opacity),
  () => {
    Filters.randomApply(ctx);
    Filters.empty(ctx);
  },
];

/**
 * Completely randomized image output.
 * @param src - The image source.
 * @param output - The destination.
 */
export const randomizer = async (image: Image, output: string) => {
  const size = sizeFromImage(image);
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext("2d");

  // Always start off with a clean copy of the image
  drawImage(ctx, image);

  // Creates an array of effects to randomly pick from for this context, image and image size
  const options = options_factory({ ctx, img: image, size });

  // How many random effects will be applied on the image
  const random_effects_amount = getRandom(4, 16);

  // For each random effect, returns a random index of options_factory to be executed
  const effects_promises = [...Array(random_effects_amount).keys()].map((_, index) => {
    console.log(`Random effect #${index}`);
    const random_index = getRandom(0, options.length - 1);
    return options[random_index]();
  });

  // Run all random effects on the image
  await Promise.all(effects_promises);

  const out = fs.createWriteStream(output);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);

  out.on("finish", () => console.log("The JPEG file was created."));
};
