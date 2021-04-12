import React, { useState, useEffect } from "react";
import SGBuy2077Dashboard from "components/sgbuy2077dashboard";
import useUser from "lib/useUser";

import {
  createDouChart,
  douOptions,
} from "components/defunct/chart/maindashboard/douchart";

import {
  createTotalChart,
  createDailyChart,
} from "components/defunct/chart/maindashboard/flatchart";

import THDashboard from "pages/thbuy2077/dashboard";
import PuffLoader from "react-spinners/PuffLoader";
import { useRouter } from "next/router";
import Bayriffer from "pages/bayriffer";

export default function Index() {
  const router = useRouter();
  const { loggedOut, user } = useUser();

  React.useEffect(() => {
    if (loggedOut) {
      router.replace("/login");
      return <PuffLoader color={"#8A3EFF"} size={150} />;
    }
  }, [loggedOut]);

  if (!user)
    return (
      <div className="w-full flex items-center justify-center">
        <PuffLoader color={"#8A3EFF"} size={150} />
      </div>
    );

  return <THDashboard />;
}
