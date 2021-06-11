import React, { useState, useEffect, useRef } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { setHeader } from "lib/graphqlclient";
import Cookies from "js-cookie";
import { client } from "lib/graphqlclient";
import useSWR, { SWRConfig } from "swr";
import { store } from '../data/state/store';
import { NextPageContext } from 'next';
import { Provider } from 'react-redux';
import Layout from 'components/layout'
import withRedux from "next-redux-wrapper";

function MyApp({ Component, pageProps }) {
  // const router = useRouter();

  useEffect(() => {
    setHeader(Cookies.get("token"));
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: (query, args) => {
          console.log(query, args);
          return client.request(query, args);
        },
        dedupingInterval: 2000,
      }}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}

const makeStore = () => store;
export default withRedux(makeStore)(MyApp);