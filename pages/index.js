import React, { useState, useEffect } from "react";
import SGBuy2077Dashboard from "components/sgbuy2077dashboard";
import useUser from "lib/useUser";

import {
  createDouChart,
  douOptions,
} from "components/chart/maindashboard/douchart";

import {
  createTotalChart,
  createDailyChart,
} from "components/chart/maindashboard/flatchart";

import THDashboard from "pages/thbuy2077/dashboard";

import Bayriffer from "pages/bayriffer";

export default function Index() {
  const person = useUser({ redirectTo: "/login" });

  if (person?.email == "bayriffer") return <Bayriffer />;
  else if (person) return <THDashboard />;
  else return <></>;
}
