import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Router from "next/router";
import useUser from "lib/useUser";
import Cookies from "js-cookie";
import PuffLoader from "react-spinners/PuffLoader";
import Button from "components/widgets/dialog/Button";
import { login } from "services/api/user";
import { isTokenExist } from "utils/Auth";

export default function Login() {
  
  useEffect(() => {
    Cookies.remove('token')
  }, [])

  return (
    <div className="flex p-grid p-align-center p-justify-center justify-center">
      Test code
    </div>
  );
}
