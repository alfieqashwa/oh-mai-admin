import React from "react";
import useSWR from "swr";
import { fetcher, fetcherargs } from "../lib/useSWR";
import { GET_LOGIN } from "graphql/login";
import Router from "next/router";

export default function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, mutate, error } = useSWR(GET_LOGIN, fetcher);

  const user = data?.currentUser;

  const finished = Boolean(data);
  const hasUser = Boolean(user);

  React.useEffect(() => {
    if (!redirectTo || !finished) return;
    if (user?.email == "bayriffer") Router.push("/bayriffer");

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
