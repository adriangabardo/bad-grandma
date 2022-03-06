import { createCanvas, loadImage, CanvasRenderingContext2D, Image } from "canvas";
import fs from "fs";
import { glitch } from "./processors/glitch";

type Dimensions = [w: number, h: number];

const sizeFromString = (size: string): Dimensions => {
  try {
    const [w, h] = size.split("x").map(Number);

    if (w === NaN || h === NaN) throw new Error("Size parsing failed.");

    return [w, h];
  } catch (error) {
    console.log(error);
    throw new Error("Size parsing failed.");
  }
};

const sizeFromImage = (image: Image): Dimensions => [image.width, image.height];

const customShape = (c: CanvasRenderingContext2D) => {
  c.fillStyle = "red";
  c.beginPath();
  c.moveTo(10, 30);
  c.bezierCurveTo(50, 90, 159, -30, 200, 30);
  c.lineTo(200, 90);
  c.lineTo(10, 90);
  c.closePath();
  c.fill();
  c.lineWidth = 4;
  c.strokeStyle = "black";
  c.stroke();
};

const drawImage = async (context: CanvasRenderingContext2D, src: string) => {
  // Draw cat with lime helmet
  const image = await loadImage(src);
  context.drawImage(image, 0, 0);
};

const gradient = (ctx: CanvasRenderingContext2D, size: Dimensions) => {
  var grad = ctx.createLinearGradient(0, 0, 200, 0);
  grad.addColorStop(0, "rgba(240, 108, 155, 0.4)");
  grad.addColorStop(0.5, "rgba(249, 185, 184, 0.5)");
  grad.addColorStop(1, "rgba(245, 212, 145, 0.3)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, ...size);
};

(async () => {
  // Load up the image
  const image = await loadImage("assets/imgs/cyberp.jpg");

  // Extract size from image
  const size = sizeFromImage(image);

  // Create canvas and context
  const canvas = createCanvas(size[0], size[1]);
  const ctx = canvas.getContext("2d");

  // Add any processing to image
  glitch(ctx, image);
  gradient(ctx, size);

  // Save to file
  const out = fs.createWriteStream("output/imgs/test.jpeg");
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The JPEG file was created."));
})();
