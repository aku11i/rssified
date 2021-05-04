import * as path from "node:path";
import type { Site } from "../types";

const SITES = path.resolve(process.cwd(), "sites");

export const loadSite = async (siteName: string): Promise<Site> => {
  return import(path.join(SITES, `${siteName}.js`)).then(
    (_) => _.default as Site
  );
};
