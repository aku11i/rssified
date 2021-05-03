import type { Article } from "../types";
import { getOgp } from "./getOgp.js";
import type { OpenGraphImage } from "open-graph-scraper";

export const getArticleFromOgp = async (url: string): Promise<Article> => {
  const ogp = await getOgp(url);

  return {
    title: ogp.ogTitle || "",
    description: ogp.ogDescription?.replace(/\n/g, "<br>") || "",
    image: (ogp.ogImage as OpenGraphImage).url,
    link: url,
    date: new Date(),
  };
};
