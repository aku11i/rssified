import type { Browser, Page } from "puppeteer";

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

export type Site = {
  url: string;
  name: string;
  getInfo: () => Promise<SiteInfo>;
  getArticles: () => Promise<Article[]>;
};
