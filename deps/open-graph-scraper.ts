import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

//eslint-disable-next-line @typescript-eslint/no-var-requires
export default require("open-graph-scraper") as typeof import("open-graph-scraper");
