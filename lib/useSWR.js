import { GraphQLClient, request } from "graphql-request";
import Cookies from "js-cookie";

const client = new GraphQLClient("http://localhost:3002", {
  credentials: "include",
  // headers: {
  //   Authorization: "Bearer ",
  // },
});

export function setHeader(val) {
  client.setHeader("authorization", "Bearer " + val);
}

export const fetcher = (query) => client.request(query);
export const fetcherargs = (query, args) => client.request(query, args);

export const mutate = (query, args) => client.request(query, args);
