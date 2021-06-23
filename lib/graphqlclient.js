import { GraphQLClient, request } from "graphql-request";
import Cookies from "js-cookie";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
  credentials: "include",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGU2ZjBkMjlhZWNkMDY2OWQyMWFlMiIsImZpcnN0X25hbWUiOiJBendhciIsImxhc3RfbmFtZSI6IkFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MGNhZjJjMjNmNmJmMjI0M2EyNjQ0ZGQiLCJpYXQiOjE2MjM5MTMxNTQsImV4cCI6MTYyNDUxNzk1NH0.Q1Er8lEUt9MbB-CtDjPEwTVMmVEM1HaKGz1LGV3q1EQ",
  },
});

export function setHeader(val) {
  if (val == undefined || val == null) return;
  else client.setHeader("authorization", "Bearer " + val);
}

export const getClient = () => {
  const strToken = Cookies.get("token")
  const gqlClient  = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_HOST, {
    credentials: "include",
    headers: {
    },
  });

  if (strToken) {
    gqlClient.setHeader("Authorization", "Bearer " + strToken);
  }

  return gqlClient
} 