import React, { useState, useEffect } from "react";
import SGBuy2077Dashboard from "components/sgbuy2077dashboard";
import useUser from "lib/useUser";

export default function Index() {
  const person = useUser({ redirectTo: "/login" });

  if (person) return <SGBuy2077Dashboard />;
  else return <></>;
}
