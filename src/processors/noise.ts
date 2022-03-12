import { CanvasRenderingContext2D } from "canvas";
import randomcolor from "randomcolor";
import { Dimensions } from "../types/Dimensions.types";
import { getRandom } from "../util/getRandom";

export function noise(context: CanvasRenderingContext2D, size: Dimensions, opacity: number = 0.2) {
  for (var x = 0; x < size[0]; x += getRandom(3, 6)) {
    for (var y = 0; y < size[1]; y += getRandom(3, 6)) {
      const rgba = randomcolor({
        count: 1,
        alpha: opacity,
        format: "rgba",
      });

      context.fillStyle = rgba[0];
      context.fillRect(x, y, 1, 1);
    }
  }
}
