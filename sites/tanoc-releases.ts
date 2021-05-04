import { getHref, getPageInfo, getSrc, getText } from "../lib/query.js";
import type { Article, Site, SiteInfo } from "../types";
import { getSiteName } from "../helpers/getSiteName.js";
import { DEFAULT_ARTICLE_LENGTH } from "../lib/constants.js";
import { newBrowser, newPage } from "../lib/browser.js";

const SITE_NAME = getSiteName(import.meta.url);
const SITE_URL = "http://www.tano-c.net/release/";

const fetch: Site["fetch"] = async () => {
  const browser = await newBrowser();
  const page = await newPage(browser);

  await page.goto(SITE_URL);

  const { title, description } = await getPageInfo(page);

  const copyright = await page.$eval("footer > p", getText);

  const info: SiteInfo = {
    title,
    description,
    link: SITE_URL,
    copyright,
  };

  const discElements = (await page.$$("article#disc div.digital")).filter(
    (_, i) => i < DEFAULT_ARTICLE_LENGTH
  );

  const articles: Article[] = await Promise.all(
    discElements.map(async (el) => {
      const title = await el.$eval("h3 > a", getText);
      const link = await el.$eval("a.jlink", getHref);
      const image = await el.$eval("a.jlink > img", getSrc);
      const description = `<img src="${image}">`;

      const article: Article = {
        title,
        description,
        link,
        image,
        date,
      };
      return article;
    })
  );

  const date = new Date();

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
