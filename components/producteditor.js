import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import RichEditor from "components/editproducthelper/richeditor";

import { ImageDataTable } from "components/editproducthelper/datatabletemplate";
import {
  DeleteImageDialog,
  UploadImageDialog,
} from "components/editproducthelper/editproductdialog";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  CREATE_PRODUCT,
  GET_PRODUCT_FROM_SLUG,
  UPDATE_PRODUCT,
} from "graphql/product";
import Dropzone from "react-dropzone-uploader";
import { ProgressSpinner } from "primereact/progressspinner";

import { Dialog } from "primereact/dialog";

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
    new_featured_image: null,
    images_file: [],
    kol_profit: 0,
    company_profit: 0,
  };

  // const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(emptyProduct);

  // checks for duplicate
  const [duplicateSKU, setDuplicateSKU] = useState(false);
  const [duplicateSLUG, setDuplicateSLUG] = useState(false);

  // check if submitted
  const [submitted, setSubmitted] = useState(false);

  //value of html for slate editor
  const [htmlDesc, setHtmlDesc] = useState(null);
  //const [uploadedFiles, setUploadedFiles] = useState([]);

  // edit feature image
  const [editFeatured, setEditFeatured] = useState(false);
  const [newFeatured, setNewFeatured] = useState(null);

  // feature image FILE object
  const [featuredImage, setFeaturedImage] = useState(null);

  // images
  const [images, setImages] = useState([]);
  const [editImages, setEditImages] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [deleteImageDialog, setDeleteImageDialog] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // spinner
  const [showSpinner, setShowSpinner] = useState(false);

  const toast = useRef(null);

  const { data, error } = useSWR([
    GET_PRODUCT_FROM_SLUG,
    JSON.stringify({ filter: { slug: slug } }),
  ]);

  useEffect(() => {
    // if this is edit product
    if (slug && data && data.products) {
      // infuse default data
      setProduct(data.products[0]);
      // create the html from plaintest
      setHtmlDesc(
        new DOMParser().parseFromString(
          data.products[0].description,
          "text/html"
        )
      );

      (async () => {
        var imageFiles = [];
        for (var i = 0; i < data.products[0].images.length; i++) {
          const response = await fetch(data.products[0].images[i]);
          // here image is url/location of image
          const blob = await response.blob();
          const file = new File([blob], `image${i}.jpg`, { type: blob.type });
          imageFiles.push(file);
        }

        setImages(imageFiles);
      })();
    }
  }, [data]);

  const productMutation = async (variables) => {
    if (slug) return await client.request(UPDATE_PRODUCT, variables);
    else return await client.request(CREATE_PRODUCT, variables);
  };

  async function uploadToDB(_product) {
    try {
      let _product = { ...product };
      if (featuredImage) _product["new_featured_image"] = featuredImage;

      if (images) _product["images_file"] = [...images];

      await productMutation(_product);
      setShowSpinner(false);

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

      setTimeout(() => {
        setProduct(emptyProduct);
        router.push("/products");
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.errors[0].message == "Duplicate SKU found") {
          setDuplicateSKU(true);
        } else if (err.response.errors[0].message == "Duplicate Slug found") {
          setDuplicateSLUG(true);
        }
      } else {
      }
    }
  }

  const saveProduct = () => {
    setSubmitted(true);
    if (
      product.sku &&
      product.product_name &&
      product.slug &&
      product.base_price &&
      product.sale_price &&
      product.stock_status &&
      product.kol_profit &&
      product.company_profit &&
      !duplicateSKU &&
      !duplicateSLUG
    ) {
      //console.log(product.description);
      uploadToDB();
      setShowSpinner(true);
    }
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

  const handleChangeStatus = ({ file, meta }, status) => {
    if (status == "done") {
      setImages([...images, file]);
    }
    if (status == "removed") {
      setImages(images.filter((e) => e !== file));
    }
  };

  const handleFeaturedChangeStatus = ({ file, meta }, status) => {
    if (status == "done") {
      setFeaturedImage(file);
    }
    if (status == "removed") {
      setFeaturedImage(null);
    }
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
            <label htmlFor="slug">Product Link</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                {"www.gamebox.com/<kolname>/"}
              </span>
              <InputText
                id="slug"
                value={product.slug}
                onChange={(e) => {
                  onInputChange(e, "slug");
                  setDuplicateSLUG(false);
                }}
                required
                className={classNames(
                  {
                    "p-invalid": (submitted && !product.slug) || duplicateSLUG,
                  },
                  "input"
                )}
              />
            </div>
            {submitted && !product.slug && (
              <small id="prod-slug-help" className="p-invalid">
                Product Link is required.
              </small>
            )}
            {duplicateSLUG && (
              <small id="prod-slug-help" className="p-invalid">
                A Unique Link is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="description">Description</label>

            <RichEditor updateDesc={updateDesc} existingValue={htmlDesc} />
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
            <label htmlFor="kol_profit">KOL Profit</label>
            <InputNumber
              id="kol_profit"
              value={product.kol_profit}
              onChange={(e) => onInputNumberChange(e, "kol_profit")}
            />
            {submitted && !product.kol_profit && (
              <small className="p-invalid">Kol Profit is required.</small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="company_profit">Company Profit</label>
            <InputNumber
              id="company_profit"
              value={product.company_profit}
              onChange={(e) => onInputNumberChange(e, "company_profit")}
            />
            {submitted && !product.company_profit && (
              <small className="p-invalid">Company Profit is required.</small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="stock_quantity">Stock Quantity</label>
            <InputNumber
              id="stock_quantity"
              value={product.stock_quantity}
              onChange={(e) => onInputNumberChange(e, "stock_quantity")}
            />
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

          <div className="p-field p-col-12  p-md-6">
            <p htmlFor="images">Featured Image</p>
            {slug && (
              <div className="p-d-flex p-flex-column p-ai-center">
                <div>
                  <img
                    src={
                      featuredImage
                        ? URL.createObjectURL(featuredImage)
                        : product.featured_image
                    }
                    style={{ width: "350px" }}
                  />
                </div>
                <div>
                  <Button
                    icon="pi pi-pencil"
                    label="Upload New Featured Image"
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => setEditFeatured(true)}
                  />
                </div>
              </div>
            )}
            {!slug && (
              <Dropzone
                onChangeStatus={handleFeaturedChangeStatus}
                styles={{ dropzone: { minHeight: 350, maxHeight: 350 } }}
                maxFiles={1}
                multiple={false}
                inputContent="Drag an image or Click to Browse"
                addClassNames={{ previewImage: "featuredPreview" }}
                accept="image/*"
              />
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <p htmlFor="images">Images</p>
            {slug && (
              <ImageDataTable
                images={images}
                setToDelete={setToDelete}
                setDeleteImageDialog={setDeleteImageDialog}
                setEditImages={setEditImages}
                setImages={setImages}
              />
            )}
            {!slug && (
              <Dropzone
                onChangeStatus={handleChangeStatus}
                styles={{ dropzone: { minHeight: 350, maxHeight: 350 } }}
                inputContent="Drag images or Click to Browse"
                inputWithFilesContent="Add More Images"
                addClassNames={{
                  previewImage: "featuredPreview",
                  preview: "previewContainer",
                }}
                accept="image/*"
              />
            )}
          </div>
        </div>

        <div className="p-d-flex p-jc-end">
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => router.push("/products")}
          />
          <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-text"
            onClick={saveProduct}
          />
        </div>
      </div>

      <Dialog
        visible={showSpinner}
        showHeader={false}
        closeOnEscape={false}
        closable={false}
        onHide={() => {}}
        style={{ boxShadow: "none" }}
        contentStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
      >
        <ProgressSpinner />
      </Dialog>

      <UploadImageDialog
        visible={editFeatured}
        headerText={"Upload New Featured Image"}
        onHide={() => setEditFeatured(false)}
        inputText={"Drag an image or Click to Browse"}
        isFeatureImage={true}
        setEditFeatured={setEditFeatured}
        newFeatured={newFeatured}
        setNewFeatured={setNewFeatured}
        setFeaturedImage={setFeaturedImage}
      />

      <UploadImageDialog
        visible={editImages}
        headerText={"Upload New Images"}
        onHide={() => setEditImages(false)}
        inputText={"Drag in Images"}
        isFeatureImage={false}
        setEditImages={setEditImages}
        images={images}
        setImages={setImages}
        tempImages={tempImages}
        setTempImages={setTempImages}
      />
      <DeleteImageDialog
        deleteImageDialog={deleteImageDialog}
        setDeleteImageDialog={setDeleteImageDialog}
        toDelete={toDelete}
        setToDelete={setToDelete}
        images={images}
        setImages={setImages}
      />
    </div>
  );
}
