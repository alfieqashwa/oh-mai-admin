import { GraphQLClient, request } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmE5ZTI4ZjY1ODAxMGQ3ZDVlZTk1OSIsImZpcnN0X25hbWUiOiJhendhciIsImxhc3RfbmFtZSI6ImFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MGFiMThkMzQxYzE1YTBhNmRkYmEzOTYiLCJpYXQiOjE2MjE4MjU3NDcsImV4cCI6MTYyMjQzMDU0N30.Lw7IXNUSOkdW-6bALCMv-dAwjcVqIKEtlb9Ounwtpys",
  },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}
