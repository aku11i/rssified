import { loadSite } from "./helpers/loadSite.js";
import PQueue from "p-queue";
import { generateFeed } from "./helpers/generateFeed.js";
import { fetchWebsite } from "./helpers/fetchWebsite.js";
import { getAllSites } from "./helpers/getAllSites.js";

const queue = new PQueue({ concurrency: 1 });

const createTask = async (siteName: string) =>
  queue.add(async () => {
    try {
      const site = await loadSite(siteName);
      console.log("[START]", site.url);
      const { info, articles } = await fetchWebsite({ site });
      await generateFeed({ site, info, articles });
      console.log("[FINISH]", site.url);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

(async () => {
  const [, , ...args] = process.argv;
  const sites: string[] = args.length ? args : await getAllSites();

  const results = await Promise.allSettled(sites.map(createTask));

  if (results.some((_) => _.status === "rejected")) {
    process.exit(1);
  }
  process.exit(0);
})();
