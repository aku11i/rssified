import type { Article, Site, SiteInfo } from "../types";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import feed from "../deps/feed.js";
import { ensureDistDir } from "./ensureDistDir.js";

const { Feed } = feed;

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

  const dist = await ensureDistDir();
  const file = path.join(dist, `${site.name}.rss`);

  await fs.writeFile(file, feed.rss2());

  console.log("[SAVE]", file);
};
