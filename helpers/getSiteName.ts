import * as path from "node:path";

export const getSiteName = (fileUrl: string) => {
  const pathname = new URL(fileUrl).pathname;
  return path.basename(pathname, path.extname(pathname));
};
