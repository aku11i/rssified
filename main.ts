import { loadAllSites } from "./helpers/loadAllSites.js";
import PQueue from "p-queue";
import { generateFeed } from "./helpers/generateFeed.js";
import puppeteer from "./deps/puppeteer.js";
import { isDev } from "./helpers/isDev.js";

const queue = new PQueue({ concurrency: 1 });

process.on("unhandledRejection", (reason: any) => {
  console.error(reason);
  process.exit(reason?.code || 1);
});

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: !isDev });

    const sites = await loadAllSites();

    await Promise.all(
      sites.map((site) => queue.add(() => generateFeed({ browser, site })))
    );

    await browser.close();
  } catch (e) {
    console.error(e);
    process.exit(e.code || 1);
  }
})();
