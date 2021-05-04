import { getHref, getPageInfo, getSrc, getText } from "../lib/query.js";
import type { Article, Site } from "../types";
import { getSiteName } from "../helpers/getSiteName.js";
import { getArticleFromOgp } from "../helpers/getArticleFromOgp.js";
import { DEFAULT_ARTICLE_LENGTH } from "../lib/constants.js";
import { newBrowser, newPage } from "../lib/browser.js";

const SITE_NAME = getSiteName(import.meta.url);
const SITE_URL = "http://www.tano-c.net/release/";

const getInfo: Site["getInfo"] = async () => {
  const browser = await newBrowser();
  const page = await newPage(browser);

  await page.goto(SITE_URL);

  const { title, description } = await getPageInfo(page);

  const copyright = await page.$eval("footer > p", getText);

  await page.close();
  await browser.close();

  return {
    title,
    description,
    link: SITE_URL,
    copyright,
  };
};

const getArticles: Site["getArticles"] = async () => {
  const browser = await newBrowser();
  const page = await newPage(browser);

  await page.goto(SITE_URL);

  const date = new Date();

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

  await page.close();
  await browser.close();

  return articles;
};

const site: Site = {
  url: SITE_URL,
  name: SITE_NAME,
  getInfo,
  getArticles,
};

export default site;
