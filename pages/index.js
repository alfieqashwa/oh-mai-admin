import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import CornersDiv from "components/cornersdiv";
import { GlassDiv } from "components/glassdiv";

function Index(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="bg-N800 w-screen h-screen flex flex-col justify-center items-center bg-center bg-cover"
        style={{ backgroundImage: "url(/mainbg.png)" }}
      >
        <CornersDiv>
          <GlassDiv>
            <h1 className="pt-8">Admin Page Updating</h1>
          </GlassDiv>
        </CornersDiv>
      </div>
    </div>
  );
}

Index.propTypes = {};

export default Index;
