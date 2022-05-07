import { Image, loadImage } from "canvas";
import fs, { promises } from "fs";
import { join } from "path";
import { randomizer } from "./handlers/randomizer";

const BATCH_FOLDER = join("./", "output", "batch"); // Output folder
const SRC_FOLDER = join("./", "batch"); // Folder from which to grab src images

// Unique name for each batch run
const call_signs = ["Rudimentar", "Sapphire"];

(async () => {
  // Goes through a directory and grabs the names of all files in it
  const files: string[] = await promises.readdir(SRC_FOLDER);

  // An array of arrays, each item being an Image and a string with the filename
  const inputs: [Image, string][] = await Promise.all(
    files.map(async (file) => [await loadImage(join(SRC_FOLDER, file)), file])
  );

  // Create batch folder if it doesn't exist
  if (!fs.existsSync(BATCH_FOLDER)) {
    await promises.mkdir(BATCH_FOLDER, { recursive: true });
  }

  // Blends in Image and call_sign and returns a randomizer() promises to the expected output
  const random_image = (call_sign: string) => (input: [Image, string]) => {
    const output = join(BATCH_FOLDER, `${input[1]}_${call_sign}.jpg`);
    return randomizer(input[0], output);
  };

  // Creates the array of promises for processing images
  const process_images = call_signs.flatMap((call_sign) => inputs.map(random_image(call_sign)));

  // Run all image processing promises in parallel and wait for all to resolve
  await Promise.allSettled(process_images).then((results) => {
    results.forEach(console.log);
  });
})();
