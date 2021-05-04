import * as path from "node:path";

export const getSiteName = (fileUrl: string): string => {
  const pathname = new URL(fileUrl).pathname;
  return path.basename(pathname, path.extname(pathname));
};
