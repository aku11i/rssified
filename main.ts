import { loadAllSites } from "./helpers/loadAllSites.js";
import PQueue from "p-queue";
import { generateFeed } from "./helpers/generateFeed.js";

const queue = new PQueue({ concurrency: 1 });

(async () => {
  const sites = await loadAllSites();

  const promises = sites.map((site) =>
    queue
      .add(() => generateFeed({ site }))
      .catch((e) => {
        console.error(e);
        throw e;
      })
  );

  const results = await Promise.allSettled(promises);

  if (results.some((_) => _.status === "rejected")) {
    process.exit(1);
  }
})();
