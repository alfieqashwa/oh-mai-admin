import React from "react";
import useSWR from "swr";
import { GET_LOGIN } from "graphql/login";
import Cookies from "js-cookie";
import { client } from "./graphqlclient";

export default function useUser() {
  const [loggedOut, setLoggedOut] = React.useState(false);

  const { data, error } = useSWR(GET_LOGIN, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (Cookies.get("token") == undefined || Cookies.get("token") == null) {
        setLoggedOut(true);
      } else if (
        error &&
        error.response.errors[0].message.includes("authentication code")
      ) {
        setLoggedOut(true);
        return;
      } else setTimeout(() => revalidate(), 1000);
    },
  });

  const loading = !data && !error;

  const user = data?.currentUser;

  return { loading, loggedOut, user, error };
}
