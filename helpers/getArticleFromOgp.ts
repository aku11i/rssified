import type { Article } from "../types";
import { getOgp } from "./getOgp.js";

export const getArticleFromOgp = async (url: string): Promise<Article> => {
  const ogp = await getOgp(url);

  return {
    title: ogp.ogTitle || "",
    description: ogp.ogDescription || "",
    content: ogp.ogDescription || "",
    image: ogp.ogImage,
    link: url,
    date: new Date(),
  };
};
