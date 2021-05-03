import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default require("open-graph-scraper") as typeof import("open-graph-scraper");
