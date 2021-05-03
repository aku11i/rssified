import * as path from "node:path";
import * as fs from "node:fs/promises";
import type { Site } from "../types";

const SITES = path.resolve(process.cwd(), "sites");

export const loadAllSites = async (): Promise<Site[]> => {
  const files = await fs.readdir(SITES);

  const modules = files
    .filter((_) => _.endsWith(".ts"))
    .map((_) => path.join(SITES, _));

  return await Promise.all(
    modules.map((_) => import(_).then((_) => _.default as Site))
  );
};
