import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default require("puppeteer") as typeof import("puppeteer");
