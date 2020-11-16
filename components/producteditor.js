import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import RichEditor from "components/richeditor";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  CREATE_PRODUCT,
  GET_PRODUCT_FROM_SLUG,
  UPDATE_PRODUCT,
} from "graphql/product";
import { mutate, fetcherargs } from "lib/useSWR";

export default function ProductEditor(props) {
  const { slug } = props;
  const router = useRouter();

  let emptyProduct = {
    sku: "",
    product_name: "",
    featured_image: "",
    images: [],
    kol_id: "",

    base_price: 0,
    sale_price: 0,
    slug: "",

    description: "",
    on_sale: false,
    stock_quantity: 0,
    stock_status: null,
    categories: [],
    tags: [],
  };

  // const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(emptyProduct);
  const [duplicateSKU, setDuplicateSKU] = useState(false);
  const [duplicateSLUG, setDuplicateSLUG] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);

  const { data, error } = useSWR(
    [GET_PRODUCT_FROM_SLUG, JSON.stringify({ slug: slug })],
    fetcherargs
  );

  React.useEffect(() => {
    if (slug && data && data.products) setProduct(data.products[0]);
  }, [data]);

  const CreateProduct = (variables) => {
    if (slug) return mutate(UPDATE_PRODUCT, variables);
    else return mutate(CREATE_PRODUCT, variables);
  };

  async function Mutation() {
    const obj = {};
    try {
      const newData = await CreateProduct(product);
      obj.data = newData;

      if (slug) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Edited. Returning to product list page",
          life: 1900,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 1900,
        });
      }
      setSubmitted(false);
      setProduct(emptyProduct);
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (err) {
      if (err.response.errors[0].message == "Duplicate SKU found") {
        setDuplicateSKU(true);
      } else if (err.response.errors[0].message == "Duplicate Slug found") {
        setDuplicateSLUG(true);
      }
      obj.error = err;
    }
    return obj;
  }

  const saveProduct = () => {
    setSubmitted(true);
    if (
      product.sku &&
      product.product_name &&
      product.slug &&
      product.base_price &&
      product.sale_price &&
      product.stock_quantity &&
      product.stock_status &&
      !duplicateSKU &&
      !duplicateSLUG
    ) {
      Mutation();
    }
  };

  const clearAll = () => {
    setProduct(emptyProduct);
  };

  const updateDesc = (value) => {
    let _product = { ...product };
    _product["description"] = value;
    setProduct(_product);
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onSelectChange = (e, name) => {
    const val = (e.target && e.target.value) || false;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onChipsChange = (e, name) => {
    const val = (e.target && e.target.value) || [];
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onUpload = () => {
    toast.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  if (error) console.log(error);

  if (!data) return <></>;

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="sku">SKU Number</label>
            <InputText
              id="sku"
              value={product.sku}
              onChange={(e) => {
                onInputChange(e, "sku");
                setDuplicateSKU(false);
              }}
              required
              className={classNames({
                "p-invalid": (submitted && !product.sku) || duplicateSKU,
              })}
            />
            {submitted && !product.sku && (
              <small id="sku-help" className="p-invalid">
                SKU is required.
              </small>
            )}
            {duplicateSKU && (
              <small id="sku-help" className="p-invalid">
                A Unique SKU is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="product_name">Product Name</label>
            <InputText
              id="product_name"
              value={product.product_name}
              onChange={(e) => onInputChange(e, "product_name")}
              required
              className={classNames({
                "p-invalid": submitted && !product.product_name,
              })}
            />
            {submitted && !product.product_name && (
              <small id="prod-name-help" className="p-invalid">
                Product Name is required.
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="slug">Product Slug</label>
            <InputText
              id="slug"
              value={product.slug}
              onChange={(e) => {
                onInputChange(e, "slug");
                setDuplicateSLUG(false);
              }}
              required
              className={classNames({
                "p-invalid": (submitted && !product.slug) || duplicateSLUG,
              })}
            />
            {submitted && !product.slug && (
              <small id="prod-slug-help" className="p-invalid">
                Product Slug is required.
              </small>
            )}
            {duplicateSLUG && (
              <small id="prod-slug-help" className="p-invalid">
                A Unique Slug is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="description">Description</label>
            <RichEditor
              updateDesc={updateDesc}
              existingValue={
                product.description
                  ? new DOMParser().parseFromString(
                      product.description,
                      "text/html"
                    )
                  : null
              }
            />
          </div>

          <div className="p-field p-col-12 p-md-5">
            <label htmlFor="base_price">Base Price</label>
            <InputNumber
              id="base_price"
              value={product.base_price}
              onChange={(e) => onInputNumberChange(e, "base_price")}
              required
              className={classNames({
                "p-invalid": submitted && !product.base_price,
              })}
              mode="currency"
              currency="SGD"
              locale="en-SG"
            />
            {submitted && !product.base_price && (
              <small className="p-invalid">Base Price is required.</small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-5">
            <label htmlFor="sale_price">Sale Price</label>
            <InputNumber
              id="sale_price"
              value={product.sale_price}
              onChange={(e) => onInputNumberChange(e, "sale_price")}
              required
              className={classNames({
                "p-invalid": submitted && !product.sale_price,
              })}
              mode="currency"
              currency="SGD"
              locale="en-SG"
            />
            {submitted && !product.sale_price && (
              <small className="p-invalid">Sale Price is required.</small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-2">
            <p htmlFor="on_sale">On Sale</p>

            <InputSwitch
              id="on_sale"
              checked={product.on_sale}
              onChange={(e) => onSelectChange(e, "on_sale")}
            />
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="stock_quantity">Stock Quantity</label>
            <InputNumber
              id="stock_quantity"
              value={product.stock_quantity}
              onChange={(e) => onInputNumberChange(e, "stock_quantity")}
              required
              className={classNames({
                "p-invalid": submitted && !product.stock_quantity,
              })}
            />
            {submitted && !product.stock_quantity && (
              <small className="p-invalid">Stock Quantity is required.</small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="stock_status">Stock Status</label>
            <Dropdown
              value={product.stock_status}
              options={[
                { label: "In Stock", value: "IN_STOCK" },
                { label: "Sold Out", value: "SOLD_OUT" },
              ]}
              onChange={(e) => onInputChange(e, "stock_status")}
              placeholder="Select stock status"
            />
            {submitted && !product.stock_status && (
              <small className="p-invalid">Stock Status is required.</small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="categories">Categories</label>
            <Chips
              id="categories"
              value={product.categories}
              onChange={(e) => onChipsChange(e, "categories")}
              separator=","
            />
            <small id="categories-help" className="p-d-block">
              Seperate each category by ","
            </small>
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="tags">Tags</label>
            <Chips
              id="tags"
              value={product.tags}
              onChange={(e) => onChipsChange(e, "tags")}
              separator=","
            />
            <small id="tags-help" className="p-d-block">
              Seperate each tag by ","
            </small>
          </div>

          <div className="p-field p-col-12 ">
            <label htmlFor="images">
              Featured Image <strong>(Not working, need CDN)</strong>
            </label>
            <FileUpload
              disabled
              id="images"
              name="images[]"
              //url="./upload.php"
              onUpload={onUpload}
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="p-m-0">
                  Drag and drop one featured here to upload.
                </p>
              }
            />
          </div>

          <div className="p-field p-col-12 ">
            <label htmlFor="images">
              Images <strong>(Not working, need CDN)</strong>
            </label>
            <FileUpload
              disabled
              id="images"
              name="images[]"
              //url="./upload.php"
              onUpload={onUpload}
              multiple
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="p-m-0">Drag and drop images here to upload.</p>
              }
            />
          </div>
        </div>

        <div className="p-d-flex p-jc-end">
          <Button
            label="Clear All"
            icon="pi pi-times"
            className="p-button-text"
            onClick={clearAll}
          />
          <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-text"
            onClick={saveProduct}
          />
        </div>
      </div>
    </div>
  );
}
