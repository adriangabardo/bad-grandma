import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { drawImage } from "./processors/drawImage";
import { glitch } from "./processors/glitch";
import { gradient } from "./processors/gradient";
import { sizeFromImage } from "./util/sizeFrom";

(async () => {
  // Load up the image
  const image = await loadImage("assets/imgs/cyberp.jpg");

  // Extract size from image
  const size = sizeFromImage(image);

  // Create canvas and context
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext("2d");

  // Add any processing to image
  drawImage(ctx, image); // Draw normal image behind, so it fills the voids
  glitch(ctx, image); // Draw glitched image on top
  gradient(ctx, size); // Add gradient

  // Save to file
  const out = fs.createWriteStream("output/imgs/test.jpeg");
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The JPEG file was created."));
})();
