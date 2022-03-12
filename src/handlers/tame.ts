import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { drawImage, Filters, glitch, gradient, tile } from "../processors";
import { sizeFromImage } from "../util/sizeFrom";

/**
 * A rather tame image output.
 * @param src - The image source.
 * @param output - The destination.
 */
export const tame = async (src: string, output: string) => {
  const image = await loadImage(src);
  const size = sizeFromImage(image);
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext("2d");

  // Add any processing to image
  drawImage(ctx, image); // Draw normal image behind, so it fills the voids
  glitch(ctx, image); // Draw glitched image on top

  gradient(ctx, size);

  Filters.randomApply(ctx);
  tile(ctx, image); // Add tile with random filter
  Filters.empty(ctx);

  const out = fs.createWriteStream(output);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The JPEG file was created."));
};
