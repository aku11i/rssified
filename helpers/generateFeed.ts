import type { Browser } from "puppeteer";
import type { Site } from "../types";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import feed from "../deps/feed.js";

const { Feed } = feed;

const DIST = path.resolve(process.cwd(), "dist");

export type GenerateFeedProps = {
  site: Site;
  browser: Browser;
};

export const generateFeed = async (props: GenerateFeedProps): Promise<void> => {
  console.log("[START]", props.site.url);

  const { site, browser } = props;
  const info = await site.getInfo({
    browser,
  });
  const articles = await site.getArticles({ browser });

  const feed = new Feed({
    title: info.title,
    description: info.description,
    link: info.link,
    id: info.link,
    copyright: info.copyright,
  });

  articles.forEach((article) => {
    const { title, description, date, image, link } = article;
    feed.addItem({
      title,
      description,
      date,
      image,
      link,
      id: link,
    });
  });

  await fs.mkdir(DIST).catch(() => {} /* nop */);

  const dist = path.join(DIST, `${site.name}.rss`);
  await fs.writeFile(dist, feed.rss2());
  console.log("[SAVE]", dist);
  console.log("[FINISH]", props.site.url);
};
