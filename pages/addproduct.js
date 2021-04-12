import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import CornersDiv from "components/cornersdiv";
import { GlassDiv } from "components/glassdiv";

function AddProduct(props) {
  return (
    <div>
      <Head>
        <title>Add Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex flex-col items-center justify-center w-screen h-screen bg-center bg-cover bg-N800"
        style={{ backgroundImage: "url(/mainbg.png)" }}
      >
        <CornersDiv>
          <GlassDiv>
            <h1 className="pt-8">Add Product</h1>
          </GlassDiv>
        </CornersDiv>
      </div>
    </div>
  );
}

AddProduct.propTypes = {};

export default AddProduct;
