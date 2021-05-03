import type { Article } from "../types";
import { getOgp } from "./getOgp.js";
import type { OpenGraphImage } from "open-graph-scraper";

export const getArticleFromOgp = async (url: string): Promise<Article> => {
  const ogp = await getOgp(url);

  const image = (ogp.ogImage as OpenGraphImage).url;

  const description =
    `<img src="${image}"><br>` +
    (ogp.ogDescription?.replace(/\n/g, "<br>") || "");

  return {
    title: ogp.ogTitle || "",
    description,
    image,
    link: url,
    date: new Date(),
  };
};
