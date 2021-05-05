import { loadSite } from "./helpers/loadSite.js";
import PQueue from "p-queue";
import { generateFeed } from "./helpers/generateFeed.js";
import { fetchWebsite } from "./helpers/fetchWebsite.js";
import { getAllSites } from "./helpers/getAllSites.js";
import { printError } from "./helpers/printError.js";
import { newBrowser } from "./lib/browser.js";

const queue = new PQueue({ concurrency: 4 });

const createTask = (siteName: string): Promise<void> =>
  queue
    .add(async () => {
      const browser = await newBrowser();
      try {
        console.log("[START]", siteName);
        const site = await loadSite(siteName);
        const { info, articles } = await fetchWebsite({ site, browser });
        await generateFeed({ site, info, articles });
        console.log("[FINISH]", siteName);
      } finally {
        await browser.close();
      }
    })
    .catch(async (e) => {
      console.error("[ERROR]", siteName);
      console.error(e);
      await printError(e).catch(() => undefined);
      throw e;
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
