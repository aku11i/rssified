import type { Article, Site, SiteInfo } from "../types";
import { getPackageJson } from "./getPackageJson.js";

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

  try {
    const { info, articles } = await site.fetch();

    return { info, articles };
  } catch (e) {
    console.error(e);

    const { homepage } = await getPackageJson();

    const info: SiteInfo = {
      title: site.name,
      description: "",
      link: site.url,
      copyright: "",
    };

    const articles: Article[] = [
      {
        title: `RSS feed "${site.name}" is broken.`,
        description: `
        This RSS feed is broken because the RSS feed generation process failed.<br>
        Check project page: ${homepage}
        `,
        link: homepage,
        date: new Date(),
      },
    ];

    return { info, articles };
  }
};
