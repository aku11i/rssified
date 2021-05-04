import type { Article, Site, SiteInfo } from "../types";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import feed from "../deps/feed.js";

const { Feed } = feed;

const DIST = path.resolve(process.cwd(), "dist");

export type GenerateFeedProps = {
  site: Site;
  info: SiteInfo;
  articles: Article[];
};

export const generateFeed = async (props: GenerateFeedProps): Promise<void> => {
  const { site, info, articles } = props;

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

  await fs.mkdir(DIST).catch(() => {
    /* nop */
  });

  const dist = path.join(DIST, `${site.name}.rss`);
  await fs.writeFile(dist, feed.rss2());
  console.log("[SAVE]", dist);
};
