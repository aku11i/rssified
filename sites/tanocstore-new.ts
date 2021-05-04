import { getHrefs, getPageInfo, getText } from "../lib/query.js";
import type { Article, Site } from "../types";
import { getSiteName } from "../helpers/getSiteName.js";
import { getArticleFromOgp } from "../helpers/getArticleFromOgp.js";
import { newBrowser, newPage } from "../lib/browser.js";

const SITE_NAME = getSiteName(import.meta.url);
const SITE_URL = "https://www.tanocstore.net";
const ORIGIN = new URL(SITE_URL).origin;

const getInfo: Site["getInfo"] = async () => {
  const browser = await newBrowser();
  const page = await newPage(browser);

  await page.goto(SITE_URL);

  const { title, description } = await getPageInfo(page);

  const copyright = await page.$eval("footer p.copyright", getText);

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

  const links = await page.$$eval(
    "div.new td.lims tr.woong > td > a",
    getHrefs
  );

  const urls = links.map((_) => new URL(_, ORIGIN).href);

  const date = new Date();

  const articles: Article[] = [];

  for (const _ of urls) {
    const article = await getArticleFromOgp(_, date);
    articles.push(article);
  }

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
