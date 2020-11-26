import { request } from "graphql-request";

export const fetcher = (query) => request("http://localhost:3002", query);
export const fetcherargs = (query, args) =>
  request("http://localhost:3002", query, args);

export const mutate = (query, args) =>
  request("http://localhost:3002", query, args);
