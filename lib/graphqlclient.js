import { GraphQLClient, request } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  // headers: {
  //   Authorization: "Bearer ",
  // },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}
