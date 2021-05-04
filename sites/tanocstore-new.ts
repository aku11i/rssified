import { getHrefs, getPageInfo } from "../lib/query.js";
import type { Article, Site } from "../types";
import { getSiteName } from "../helpers/getSiteName.js";
import { getArticleFromOgp } from "../helpers/getArticleFromOgp.js";

const SITE_NAME = getSiteName(import.meta.url);
const SITE_URL = "https://www.tanocstore.net";
const ORIGIN = new URL(SITE_URL).origin;

const getInfo: Site["getInfo"] = async (props) => {
  const { browser } = props;
  const page = await browser.newPage();
  await page.goto(SITE_URL);

  const { title, description } = await getPageInfo(page);

  const copyright = await page.$eval("footer p.copyright", (el) => {
    return (el as HTMLElement).innerText;
  });

  await page.close();

  return {
    title,
    description,
    link: SITE_URL,
    copyright,
  };
};

const getArticles: Site["getArticles"] = async (props) => {
  const { browser } = props;
  const page = await browser.newPage();
  await page.goto(SITE_URL);

  const links = await page.$$eval(
    "div.new td.lims tr.woong > td > a",
    getHrefs
  );

  await page.close();

  const urls = links.map((_) => new URL(_, ORIGIN).href).reverse();

  const articles: Article[] = [];
  for (const _ of urls) {
    const article = await getArticleFromOgp(_);
    articles.push(article);
  }

  return articles;
};

const site: Site = {
  url: SITE_URL,
  name: SITE_NAME,
  getInfo,
  getArticles,
};

export default site;
