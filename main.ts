import { loadAllSites } from "./helpers/loadAllSites.js";
import PQueue from "p-queue";
import { generateFeed } from "./helpers/generateFeed.js";

const queue = new PQueue({ concurrency: 1 });

process.on("unhandledRejection", (reason: any) => {
  console.error(reason);
  process.exit(reason?.code || 1);
});

(async () => {
  try {
    const sites = await loadAllSites();

    await Promise.all(
      sites.map((site) => queue.add(() => generateFeed({ site })))
    );
  } catch (e) {
    console.error(e);
    process.exit(e.code || 1);
  }
})();
