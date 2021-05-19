import { GraphQLClient, request } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmE5ZTI4ZjY1ODAxMGQ3ZDVlZTk1OSIsImZpcnN0X25hbWUiOiJhendhciIsImxhc3RfbmFtZSI6ImFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MGExYzNlZDQxZjYxNDBhZDRjYzE3NDIiLCJpYXQiOjE2MjEyMTQxODksImV4cCI6MTYyMTgxODk4OX0.xLeAD7IukSSVWeyrFn9nTDiWzlYs5q2P9aBnNzFbdtM",
  },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}
