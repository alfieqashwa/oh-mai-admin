import { GraphQLClient, request } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmE5ZTI4ZjY1ODAxMGQ3ZDVlZTk1OSIsImZpcnN0X25hbWUiOiJhendhciIsImxhc3RfbmFtZSI6ImFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MGM3MTA2M2Q1NGI1NTA4MmMyNGQ3ZjgiLCJpYXQiOjE2MjM2NTg1OTUsImV4cCI6MTYyNDI2MzM5NX0.ph3EhBotZGrJw65UxXmQC36sSS6Wg5fMuYQS3P3Ktjg",
  },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}
