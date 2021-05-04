import puppeteer from "../deps/puppeteer.js";
import type { Browser, Page } from "puppeteer";
import { DEFAULT_PAGE_TIMEOUT } from "./constants.js";
import { isDev } from "../helpers/isDev.js";

export const newBrowser = async (): Promise<Browser> => {
  return await puppeteer.launch({
    headless: !isDev,
  });
};

export const newPage = async (browser: Browser): Promise<Page> => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(DEFAULT_PAGE_TIMEOUT);
  return page;
};
