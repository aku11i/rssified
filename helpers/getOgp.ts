import openGraphScraper from "../deps/open-graph-scraper.js";
import type { SuccessResult } from "open-graph-scraper";

export const getOgp = async (url: string): Promise<SuccessResult["result"]> => {
  const data = await openGraphScraper({
    url,
  });

  if (data.error) throw data.result.errorDetails;
  return data.result;
};
