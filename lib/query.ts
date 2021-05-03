import type { Page } from "puppeteer";

type PageInfo = {
  title: string;
  description: string;
};

export const getPageInfo = async (page: Page): Promise<PageInfo> => {
  const title = await page.title();
  const description = await page.$eval("meta[name=description]", (el) => {
    return el.getAttribute("content") || "";
  });

  return { title, description };
};

export const getHrefs = (elements: Element[]) => {
  return elements
    .map((el) => el.getAttribute("href") || undefined)
    .filter((href) => href) as string[];
};

export const getSrc = (element: Element) => {
  return element.getAttribute("src") || undefined;
};
