import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default require("feed") as typeof import("feed");
