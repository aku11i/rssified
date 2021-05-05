/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ensureDistDir } from "./ensureDistDir.js";

export const printError = async (error: any): Promise<void> => {
  let errorMessage: string;

  if (error instanceof Error && error.stack) {
    errorMessage = error.stack;
  } else {
    errorMessage = JSON.stringify(error, undefined, 2);
  }

  errorMessage += "\n\n";

  const dist = await ensureDistDir();

  await fs.appendFile(path.join(dist, "error.log"), errorMessage);
};
