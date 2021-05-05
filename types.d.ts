import type { Browser } from "puppeteer";

export type SiteInfo = {
  title: string;
  description: string;
  link: string;
  copyright: string;
};

export type Article = {
  title: string;
  description: string;
  image?: string;
  link: string;
  date: Date;
};

export type FetchProps = {
  browser: Browser;
};

export type FetchResult = {
  info: SiteInfo;
  articles: Article[];
};

export type Site = {
  url: string;
  name: string;
  fetch: (props: FetchProps) => Promise<FetchResult>;
};
