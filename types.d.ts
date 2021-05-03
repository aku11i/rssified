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
  content: string;
  image?: string;
  link: string;
  date: Date;
};

export type GetInfoProps = {
  browser: Browser;
};

export type GetLinksProps = {
  browser: Browser;
};

export type GetArticlesProps = {
  browser: Browser;
};

export type Site = {
  url: string;
  name: string;
  getInfo: (props: GetInfoProps) => Promise<SiteInfo>;
  getArticles: (props: GetArticlesProps) => Promise<Article[]>;
};
