import type * as PackageJson from "../package.json";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export const getPackageJson = async (): Promise<typeof PackageJson> => {
  const dirname = path.dirname(new URL(import.meta.url).pathname);
  const file = await fs.readFile(path.resolve(dirname, "..", "package.json"), {
    encoding: "utf-8",
  });
  return JSON.parse(file);
};
