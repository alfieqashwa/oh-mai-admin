import React, { useState, useEffect, useRef } from "react";
import "../styles/globals.css";
import Router, { useRouter } from "next/router";
import { getClient, setHeader } from "lib/graphqlclient";
import Cookies from "js-cookie";
import useSWR, { SWRConfig } from "swr";
import { store } from '../data/state/store';
import { NextPageContext } from 'next';
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import LayoutSidebar from "layouts/layout_sidebar";

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  const client = getClient()

  useEffect(() => {
    const strToken = Cookies.get("token")
    // setHeader(strToken);

    if (!strToken) {
      Router.push('/login')
    }
  }, []);

  const Layout = Component.Layout || LayoutSidebar

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