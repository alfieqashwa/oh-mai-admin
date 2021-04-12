import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { GET_KOL_FROM_SLUG } from "../graphql/kol";
import { client } from "../lib/graphqlclient";
import { Button } from "primereact/button";

import { DataView, DataViewLayoutOptions } from "primereact/dataview";

export default function KOLProfile() {
  let emptyKOL = {
    display_name: "",
    banner_image: "",
    profile_image: "",
    description: "",
    social_medias: {
      facebook: "",
    },
    slug: "",
    products: [],
  };

  // const [products, setProducts] = useState(null);
  const [kol, setKOL] = useState(emptyKOL);

  const { data, error } = useSWR([
    GET_KOL_FROM_SLUG,
    JSON.stringify({ slug: "debbie" }),
  ]);

  function renderHeader() {
    return (
      <div className="p-grid p-nogutter">
        <div className="p-col-1" style={{ textAlign: "left" }}>
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
          />
        </div>
        <div className="p-col-6" style={{ textAlign: "right" }}></div>
      </div>
    );
  }

  function itemTemplate(product, layout) {
    //console.log(product);
    if (!product) {
      return null;
    }

    if (layout === "grid") return renderGridItem(product);
    else return null;
  }

  function renderGridItem(data) {
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.catergories}</span>
            </div>
          </div>
          <div className="product-grid-item-content">
            <img
              src={data.featured_image}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.product_name}
            />
            <div className="product-name">{data.product_name}</div>
            <div className="product-description">{data.description}</div>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">${data.current_price}</span>
          </div>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    // if this is edit product
    if (data && data.kols) {
      setKOL(data.kols[0]);
    }
  }, [data]);

  if (error) console.log(error);

  if (!data) return <></>;

  //console.log(data);
  return (
    <div className="card">
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-4">
          DISPLAY CURRENT KOL GRID HERE
        </div>
        <div className="p-field p-col-12 p-md-8">
          <div className="p-fluid p-formgrid p-grid p-align-baseline">
            <div className="p-col-12 p-md-12">
              <h3>Display Profile</h3>
            </div>

            <div className="p-col-12 p-md-2">
              <h5>Display Name:</h5>
            </div>
            <div className="p-col-12 p-md-3">
              <p>{kol.display_name}</p>
            </div>
            <div className="p-col-12 p-md-1">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                // onClick={}
              />
            </div>

            <div className="p-col-12 p-md-2">
              <h5>Slug:</h5>
            </div>
            <div className="p-col-12 p-md-3">
              <p>{kol.slug}</p>
            </div>

            <div className="p-col-12 p-md-1">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                // onClick={}
              />
            </div>

            <div className="p-col-12 p-md-2">
              <h5>Description:</h5>
            </div>
            <div className="p-col-12 p-md-9">
              <p>{kol.description}</p>
            </div>

            <div className="p-col-12 p-md-1">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                // onClick={}
              />
            </div>

            <div className="p-col-12 p-md-5">
              <h5>Banner Image:</h5>
            </div>
            <div className="p-col-12 p-md-1">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                // onClick={}
              />
            </div>
            <div className="p-col-12 p-md-5">
              <h5>Profile Image:</h5>
            </div>
            <div className="p-col-12 p-md-1">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                // onClick={}
              />
            </div>
            <div className="p-col-12 p-md-6">
              <img src={kol.banner_image} />
            </div>
            <div className="p-col-12 p-md-6">
              <img src={kol.profile_image} />
            </div>

            <div className="p-col-12 p-md-11">
              <h3>Social Media</h3>
            </div>

            <div className="p-col-12 p-md-1">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-mr-2"
                // onClick={}
              />
            </div>
            <div className="p-col-12 p-md-2">
              <h5>Facebook:</h5>
            </div>
            <div className="p-col-12 p-md-4">
              <p>{kol.social_medias.facebook}</p>
            </div>
            <div className="p-col-12 p-md-2">
              <h5>Twitter:</h5>
            </div>
            <div className="p-col-12 p-md-4">
              <p>{kol.social_medias.twitter}</p>
            </div>
            <div className="p-col-12 p-md-2">
              <h5>Instagram:</h5>
            </div>
            <div className="p-col-12 p-md-4">
              <p>{kol.social_medias.instagram}</p>
            </div>
            <div className="p-col-12 p-md-2">
              <h5>Youtube:</h5>
            </div>
            <div className="p-col-12 p-md-4">
              <p>{kol.social_medias.youtube}</p>
            </div>

            <div className="p-col-12 p-md-12">
              <h3>Products</h3>
              <div className="dataview-demo">
                <DataView
                  value={kol.products}
                  layout={"grid"}
                  header={renderHeader()}
                  itemTemplate={itemTemplate}
                  paginator
                  rows={9}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
