import { randomizer } from "./handlers/randomizer";
import { tame } from "./handlers/tame";
import fs from "fs";

const RANDOMIZATIONS = 6; // Amount of batches of randomizations that we want.
const BATCH_FOLDER = "output/batch"; // Output folder
const SRC_FOLDER = "batch"; // Folder from which to grab src images

// Pack names for each randomization
const call_signs = ["Rudimentar", "Bombay", "Sapphire", "BoomBox", "Lua", "Kajkow"];

const process_batch = (file: string) => {
  const src = [SRC_FOLDER, file].join("/");

  const promises = [];

  // Creates either a randomiser() or a tame() processed image
  for (let i = 0; i < RANDOMIZATIONS; i++) {
    const fn = i % 2 === 0 ? randomizer : tame;
    const output = () => `${BATCH_FOLDER}/${call_signs[i]}/${file}_${fn.name}.jpeg`;
    promises.push(fn(src, output()));
  }

  // Returns the promises that will be all settled.
  return promises;
};

(async () => {
  // Goes through a directory and grabs the names of all files in it
  const files: string[] = await new Promise((resolve, reject) =>
    fs.readdir(SRC_FOLDER, (err, files) => {
      if (err) reject(err);
      resolve(files);
    })
  );

  // Create iterations of folders in batch folder
  for (let i = 0; i < RANDOMIZATIONS; i++) {
    await fs.promises.mkdir(`${BATCH_FOLDER}/${call_signs[i]}`, { recursive: true });
  }

  // Settles all promises from process_batch
  await Promise.allSettled(files.flatMap(process_batch));

  console.log("chill bro...");
})();
