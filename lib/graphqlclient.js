import { GraphQLClient, request } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmE5ZTI4ZjY1ODAxMGQ3ZDVlZTk1OSIsImZpcnN0X25hbWUiOiJhendhciIsImxhc3RfbmFtZSI6ImFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MGJlMWNkNWYxYmRkMjE0OTRiYTQ0YjkiLCJpYXQiOjE2MjMwNzE5NTcsImV4cCI6MTYyMzY3Njc1N30.wzcD8ZdGDPCQxluqHhCwv3ENi7hL_8WjMvKjE3BPpTE",
  },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}
