import { request } from "graphql-request";

export const fetcher = (query) => request("https://backend.buy2077.co", query);
export const fetcherargs = (query, args) =>
  request("https://backend.buy2077.co", query, args);

export const mutate = (query, args) =>
  request("https://backend.buy2077.co", query, args);
