import { getRandom, getRandomArbitrary } from "../../util/getRandom";
import * as effects from "./effects";
import { join } from "./join";

// Indexed array of effects functions.
const possibilites = Object.values(effects);

/**
 * Completely random filter to be used in .apply().
 */
export const random = (): string => {
  const n_effects = getRandom(1, 15);

  const random_effects: string[] = new Array(n_effects).map((): string => {
    const index_random = getRandom(0, possibilites.length - 1);
    const param_random = getRandomArbitrary(0, 100);

    return possibilites[index_random](param_random);
  });

  return join(...random_effects);
};
