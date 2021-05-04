import type { Page } from "puppeteer";

type PageInfo = {
  title: string;
  description: string;
};

export const getPageInfo = async (page: Page): Promise<PageInfo> => {
  const title = await page.title();
  const description = await page.$eval("meta[name=description]", (el) => {
    return el.getAttribute("content") ?? "";
  });

  return { title, description };
};

export const getHref = (element: Element): string => {
  return element.getAttribute("href") ?? "";
};

export const getHrefs = (elements: Element[]): string[] => {
  return elements.map((el) => el.getAttribute("href") ?? "");
};

export const getSrc = (element: Element): string | undefined => {
  return element.getAttribute("src") ?? undefined;
};

export const getText = (element: Element): string | undefined => {
  return (element as HTMLElement).innerText ?? "";
};
