import { getHrefs, getPageInfo, getText } from "../lib/query.js";
import type { Site, SiteInfo } from "../types";
import { getSiteName } from "../helpers/getSiteName.js";
import { getArticleFromOgp } from "../helpers/getArticleFromOgp.js";
import { newBrowser, newPage } from "../lib/browser.js";

const SITE_NAME = getSiteName(import.meta.url);
const SITE_URL = "https://www.tanocstore.net";
const ORIGIN = new URL(SITE_URL).origin;

const fetch: Site["fetch"] = async () => {
  const browser = await newBrowser();
  const page = await newPage(browser);

  await page.goto(SITE_URL);

  const { title, description } = await getPageInfo(page);

  const copyright = await page.$eval("footer p.copyright", getText);

  const info: SiteInfo = {
    title,
    description,
    link: SITE_URL,
    copyright,
  };

  const links = await page.$$eval(
    "div.new td.lims tr.woong > td > a",
    getHrefs
  );

  const urls = links.map((_) => new URL(_, ORIGIN).href);

  const date = new Date();

  const articles = await Promise.all(
    urls.map((_) => getArticleFromOgp(_, date))
  );

  await page.close();
  await browser.close();

  return { info, articles };
};

const site: Site = {
  url: SITE_URL,
  name: SITE_NAME,
  fetch,
};

export default site;
