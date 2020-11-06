import { request } from "graphql-request";

export const fetcher = (query) => request("http://localhost:3001", query);
export const fetcherargs = (query, args) =>
  request("http://localhost:3001", query, args);

export const mutate = (query, args) =>
  request("http://localhost:3001", query, args);
