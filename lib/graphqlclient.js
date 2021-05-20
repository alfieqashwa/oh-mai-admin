import { GraphQLClient, request } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmE5ZTI4ZjY1ODAxMGQ3ZDVlZTk1OSIsImZpcnN0X25hbWUiOiJhendhciIsImxhc3RfbmFtZSI6ImFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MDk1MDI5Nzg1NjM2YzQxY2JlNmUxOTYiLCJpYXQiOjE2MjAzNzgyNjMsImV4cCI6MTYyMDk4MzA2M30.V9xpR302Rd5SL1ynSnAB6H-T6SJG0opDZg0Mq5kXJgQ",
  },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}
