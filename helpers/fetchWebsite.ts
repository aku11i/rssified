import type { Browser } from "puppeteer";
import type { Article, Site, SiteInfo } from "../types";

export type FetchWebsiteProps = {
  site: Site;
  browser: Browser;
};

export type FetchWebsiteResult = {
  info: SiteInfo;
  articles: Article[];
};

export const fetchWebsite = async (
  props: FetchWebsiteProps
): Promise<FetchWebsiteResult> => {
  const { site, browser } = props;

  const { info, articles } = await site.fetch({ browser });

  return { info, articles };
};
