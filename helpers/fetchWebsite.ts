import type { Article, Site, SiteInfo } from "../types";

export type FetchWebsiteProps = {
  site: Site;
};

export type FetchWebsiteResult = {
  info: SiteInfo;
  articles: Article[];
};

export const fetchWebsite = async (
  props: FetchWebsiteProps
): Promise<FetchWebsiteResult> => {
  const { site } = props;

  const { info, articles } = await site.fetch();

  return { info, articles };
};
