import React, { useState, useEffect, useRef } from "react";
import "../styles/globals.css";
import "react-dropzone-uploader/dist/styles.css";
import { useRouter } from "next/router";
import { setHeader } from "lib/graphqlclient";
import Cookies from "js-cookie";
import { client } from "lib/graphqlclient";
import useSWR, { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    setHeader(Cookies.get("token"));
  }, []);

  return (
    <>
      <SWRConfig
        value={{
          fetcher: (query, args) => {
            console.log(query, args);
            return client.request(query, args);
          },
          dedupingInterval: 2000,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
