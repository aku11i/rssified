import * as path from "node:path";
import * as fs from "node:fs/promises";

const SITES = path.resolve(process.cwd(), "sites");

export const getAllSites = async (): Promise<string[]> => {
  const files = await fs.readdir(SITES);

  return files
    .filter((_) => _.endsWith(".ts"))
    .map((_) => path.basename(_, ".ts"));
};
