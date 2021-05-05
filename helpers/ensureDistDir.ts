import * as fs from "node:fs/promises";
import * as path from "node:path";

const DIST = path.join(process.cwd(), "dist");

export const ensureDistDir = async (): Promise<string> => {
  const stat = await fs.stat(DIST).catch(() => undefined);
  if (stat?.isDirectory()) return DIST;

  await fs.mkdir(DIST);

  return DIST;
};
