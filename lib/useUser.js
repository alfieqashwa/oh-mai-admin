import React from "react";
import useSWR from "swr";
import { fetcher, setHeader } from "../lib/useSWR";
import { GET_LOGIN } from "graphql/login";
import Router from "next/router";
import Cookies from "js-cookie";

export default function useUser({ redirectTo, redirectIfFound } = {}) {
  setHeader(Cookies.get("token"));
  const { data, mutate, error } = useSWR(GET_LOGIN, fetcher);

  const loading = !data && !error;

  const user = data?.currentUser;
  const shouldRedirect = error || !user;

  React.useEffect(() => {
    if (loading) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && shouldRedirect) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && !shouldRedirect)
    ) {
      Router.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTo, redirectIfFound, shouldRedirect]);

  return user;
}
