import { GraphQLClient, request } from "graphql-request";

const client = new GraphQLClient("http://localhost:3002", {
  credentials: "include",
});

export const fetcher = (query) => client.request(query);
export const fetcherargs = (query, args) => client.request(query, args);

export const mutate = (query, args) => client.request(query, args);
