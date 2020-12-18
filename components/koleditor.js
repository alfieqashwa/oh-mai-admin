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

import { ProductDataTable } from "components/editkolhelper/datatabletemplate";
import {
  DeleteImageDialog,
  UploadImageDialog,
} from "components/editproducthelper/editproductdialog";
import {
  AddProductDialog,
  DeleteProductDialog,
  EditProductDialog,
} from "components/editkolhelper/editkoldialog";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  GET_KOL_FROM_SLUG,
  CREATE_KOL,
  UPDATE_KOL,
  KOL_USER_INFO,
  FIND_EXIST_USER,
} from "graphql/kol";
import { mutate, fetcherargs } from "lib/useSWR";
import Dropzone from "react-dropzone-uploader";
import { ProgressSpinner } from "primereact/progressspinner";

import { Dialog } from "primereact/dialog";
import { products } from "graphql/product";

export default function KolEditor(props) {
  const { slug } = props;
  const router = useRouter();

  let emptyKol = {
    id: "",
    first_name: "",
    last_name: "",
    display_name: "",
    email: "",
    contact_number: 0,
    slug: "",
    bank_details: {
      bank: "",
      bank_account_number: 0,
      bank_code: 0,
      bank_branch_code: 0,
      swift_code: 0,
    },
    approved: false,
    banner_image: "",
    profile_image: "",
    description: "",
    social_medias: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
    featured: false,
    products: [],
    products_id: [],
    new_banner_image: null,
    new_profile_image: null,
  };

  // const [kols, setKols] = useState(null);
  const [kol, setKol] = useState(emptyKol);

  // checks for duplicate
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [duplicateSLUG, setDuplicateSLUG] = useState(false);

  // check if submitted
  const [submitted, setSubmitted] = useState(false);

  //value of html for slate editor
  const [htmlDesc, setHtmlDesc] = useState(null);

  // edit banner image
  const [editBanner, setEditBanner] = useState(false);
  const [newBanner, setNewBanner] = useState(null);

  // banner image FILE object
  const [bannerImage, setBannerImage] = useState(null);

  // edit profile image
  const [editProfile, setEditProfile] = useState(false);
  const [newProfile, setNewProfile] = useState(null);

  // profile image FILE object
  const [profileImage, setProfileImage] = useState(null);

  // products
  const [toDelete, setToDelete] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [addProductDialog, setAddProductDialog] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [editProfitDialog, setEditProfitDialog] = useState(false);

  // spinner
  const [showSpinner, setShowSpinner] = useState(false);

  const [updatedEmail, setUpdatedEmail] = useState(false);

  const toast = useRef(null);

  const { data, error } = useSWR(
    [GET_KOL_FROM_SLUG, JSON.stringify({ filter: { slug: slug } })],
    fetcherargs
  );

  React.useEffect(() => {
    console.log(data);
    // if this is edit kol
    if (slug && data && data.kols.length > 0) {
      // infuse default data
      setKol(data.kols[0]);
      // create the html from plaintest
      setHtmlDesc(
        new DOMParser().parseFromString(data.kols[0].description, "text/html")
      );

      (async () => {
        let a = await fetcherargs(KOL_USER_INFO, { id: data.kols[0].user_id });

        let _kol = { ...data.kols[0] };

        _kol.first_name = a.user.first_name;
        _kol.last_name = a.user.last_name;
        _kol.email = a.user.email;
        _kol.contact_number = parseInt(a.user.contact_number);
        _kol.id = a.user.id;

        _kol.bank_details.bank_account_number = parseInt(
          data.kols[0].bank_details.bank_account_number
        );
        _kol.bank_details.bank_code = parseInt(
          data.kols[0].bank_details.bank_code
        );
        _kol.bank_details.bank_branch_code = parseInt(
          data.kols[0].bank_details.bank_branch_code
        );
        _kol.bank_details.swift_code = parseInt(
          data.kols[0].bank_details.swift_code
        );
        console.log(_kol);
        setKol(_kol);
      })();
    }
  }, [data]);

  const kolMutation = (variables) => {
    if (slug) return mutate(UPDATE_KOL, variables);
    else return mutate(CREATE_KOL, variables);
  };

  async function uploadToDB(_kol) {
    try {
      let _kol = { ...kol };
      if (bannerImage) _kol["new_banner_image"] = bannerImage;
      if (profileImage) _kol["new_profile_image"] = profileImage;

      _kol.contact_number = kol.contact_number.toString();
      _kol.bank_details.bank_account_number = kol.bank_details.bank_account_number.toString();

      _kol.bank_details.bank_code = kol.bank_details.bank_code.toString();

      _kol.bank_details.bank_branch_code = kol.bank_details.bank_branch_code.toString();

      _kol.bank_details.swift_code = kol.bank_details.swift_code.toString();

      //console.log(_kol);
      _kol.product = [];
      if (_kol.products.length > 0) {
        _kol.products.forEach((prod) => {
          let newProd = {
            product: prod.product.id,
            kol_profit: prod.kol_profit,
          };

          _kol.product.push(newProd);
        });
      }
      _kol.password = "password";

      if (slug) {
        let findUser = await fetcherargs(FIND_EXIST_USER, {
          email: _kol.email,
        });
        if (findUser.user.id != _kol.id) {
          var err = {
            response: { errors: [{ message: "Duplicate Email found" }] },
          };
          throw err;
        }
      }

      await kolMutation(_kol);
      setShowSpinner(false);

      if (slug) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Kol Edited. Returning to kol list page",
          life: 1900,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Kol Created",
          life: 1900,
        });
      }
      setSubmitted(false);

      setTimeout(() => {
        setKol(emptyKol);
        router.push("/kol");
      }, 2000);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
      if (err.response) {
        if (err.response.errors[0].message == "Duplicate Email found") {
          setDuplicateEmail(true);
        } else if (err.response.errors[0].message == "Duplicate Slug found") {
          setDuplicateSLUG(true);
        }
      } else {
      }
    }
  }

  const saveKol = () => {
    setSubmitted(true);
    if (
      kol.first_name &&
      kol.last_name &&
      kol.email &&
      kol.contact_number &&
      !duplicateEmail &&
      !duplicateSLUG
    ) {
      //console.log(kol);
      uploadToDB();
      setShowSpinner(true);
    }
  };

  const updateDesc = (value) => {
    let _kol = { ...kol };
    _kol["description"] = value;
    setKol(_kol);
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _kol = { ...kol };
    _kol[`${name}`] = val;

    setKol(_kol);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _kol = { ...kol };
    _kol[`${name}`] = val;

    setKol(_kol);
  };

  const onSelectChange = (e, name) => {
    const val = (e.target && e.target.value) || false;
    let _kol = { ...kol };
    _kol[`${name}`] = val;

    setKol(_kol);
  };

  const onBankDetailsChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _kol = { ...kol };
    _kol["bank_details"][`${name}`] = val;

    setKol(_kol);
  };

  const onBankDetailsNumberChange = (e, name) => {
    const val = e.value || 0;
    let _kol = { ...kol };
    _kol["bank_details"][`${name}`] = val;

    setKol(_kol);
  };

  const onSocialMediaChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _kol = { ...kol };
    _kol["social_medias"][`${name}`] = val;

    setKol(_kol);
  };

  const handleBannerChangeStatus = ({ file, meta }, status) => {
    if (status == "done") {
      setBannerImage(file);
    }
    if (status == "removed") {
      setBannerImage(null);
    }
  };

  const handleProfileChangeStatus = ({ file, meta }, status) => {
    if (status == "done") {
      setProfileImage(file);
    }
    if (status == "removed") {
      setProfileImage(null);
    }
  };

  const removeProduct = () => {
    let _kol = { ...kol };

    let updateProduct = _kol.products.filter(
      (e) => e.product?.slug !== toDelete.product.slug
    );

    _kol.products = updateProduct;

    setKol(_kol);

    setToDelete(null);
  };

  const addProduct = (selectedProducts) => {
    let _kol = { ...kol };
    let prod = [..._kol.products];

    selectedProducts.forEach((product) => {
      if (!prod.find((e) => e.product?.slug == product.slug)) {
        console.log(product);
        let newProd = {
          product: {
            id: product.id,
            product_name: product.product_name,
            slug: product.slug,
            current_price: product.current_price,
            kol_profit: product.kol_profit,
            categories: [...product.categories],
          },
          kol_profit: product.kol_profit,
        };
        prod.push(newProd);
      }
    });
    _kol.products = prod;
    setKol(_kol);
  };

  const editProfit = (value) => {
    let _kol = { ...kol };
    let prod = [..._kol.products];

    prod.forEach((eaProd) => {
      if (eaProd.product.slug == toEdit.product.slug) {
        eaProd.kol_profit = value;
      }
    });

    _kol.products = prod;
    setKol(_kol);
  };

  if (error) console.log(error);

  if (!data) return <></>;

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 ">
            <h3>Personal Information</h3>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="first_name">First Name</label>
            <InputText
              id="first_name"
              value={kol.first_name}
              onChange={(e) => onInputChange(e, "first_name")}
              required
              className={classNames({
                "p-invalid": submitted && !kol.first_name,
              })}
            />
            {submitted && !kol.first_name && (
              <small id="prod-name-help" className="p-invalid">
                First Name is required.
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="last_name">Last Name</label>
            <InputText
              id="last_name"
              value={kol.last_name}
              onChange={(e) => onInputChange(e, "last_name")}
              required
              className={classNames({
                "p-invalid": submitted && !kol.last_name,
              })}
            />
            {submitted && !kol.last_name && (
              <small id="prod-name-help" className="p-invalid">
                Last Name is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              keyfilter="email"
              value={kol.email}
              onChange={(e) => {
                onInputChange(e, "email");
                setDuplicateEmail(false);
              }}
              required
              className={classNames({
                "p-invalid": (submitted && !kol.email) || duplicateEmail,
              })}
            />
            {submitted && !kol.email && (
              <small id="email-help" className="p-invalid">
                Email is required.
              </small>
            )}
            {duplicateEmail && (
              <small id="email-help" className="p-invalid">
                A Unique Email is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="contact_number">Contact Number</label>
            <InputNumber
              id="contact_number"
              value={kol.contact_number}
              onChange={(e) => onInputNumberChange(e, "contact_number")}
              required
              useGrouping={false}
              className={classNames({
                "p-invalid": submitted && !kol.contact_number,
              })}
            />
            {submitted && !kol.contact_number && (
              <small className="p-invalid">Contact Number is required.</small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-2">
            <p htmlFor="on_sale">Approved</p>

            <InputSwitch
              id="approved"
              checked={kol.approved}
              onChange={(e) => onSelectChange(e, "approved")}
            />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <p htmlFor="on_sale">Featured</p>

            <InputSwitch
              id="featured"
              checked={kol.featured}
              onChange={(e) => onSelectChange(e, "featured")}
            />
          </div>

          <div className="p-field p-col-12 ">
            <h3>Bank Information</h3>
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="bank">Bank</label>
            <InputText
              id="bank"
              value={kol.bank_details.bank}
              onChange={(e) => onBankDetailsChange(e, "bank")}
              required
              className={classNames({
                "p-invalid": submitted && !kol.bank_details.bank,
              })}
            />
            {submitted && !kol.bank_details.bank && (
              <small id="prod-name-help" className="p-invalid">
                Bank is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="bank_code">Bank Code</label>
            <InputNumber
              id="bank_code"
              value={kol.bank_details.bank_code}
              onChange={(e) => onBankDetailsNumberChange(e, "bank_code")}
              required
              className={classNames({
                "p-invalid": submitted && !kol.bank_details.bank_code,
              })}
            />
            {submitted && !kol.bank_details.bank_code && (
              <small id="prod-name-help" className="p-invalid">
                Bank Code is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="bank_code">Bank Branch Code</label>
            <InputNumber
              id="bank_branch_code"
              value={kol.bank_details.bank_branch_code}
              onChange={(e) => onBankDetailsNumberChange(e, "bank_branch_code")}
              required
              className={classNames({
                "p-invalid": submitted && !kol.bank_details.bank_branch_code,
              })}
            />
            {submitted && !kol.bank_details.bank_branch_code && (
              <small id="prod-name-help" className="p-invalid">
                Bank Branch Code is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="bank_account_number">Bank Account Number</label>
            <InputNumber
              id="bank_account_number"
              value={kol.bank_details.bank_account_number}
              onChange={(e) =>
                onBankDetailsNumberChange(e, "bank_account_number")
              }
              required
              className={classNames({
                "p-invalid": submitted && !kol.bank_details.bank_account_number,
              })}
            />
            {submitted && !kol.bank_details.bank_account_number && (
              <small id="prod-name-help" className="p-invalid">
                Bank Account Number is required.
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="swift_code">Swift Code</label>
            <InputNumber
              id="swift_code"
              value={kol.bank_details.swift_code}
              onChange={(e) => onBankDetailsNumberChange(e, "swift_code")}
            />
          </div>

          <div className="p-field p-col-12 ">
            <h3>KOL Store Information</h3>
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="slug">Kol Link</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">www.gamebox.com/</span>

              <InputText
                id="slug"
                value={kol.slug}
                onChange={(e) => {
                  onInputChange(e, "slug");
                  setDuplicateSLUG(false);
                }}
                required
                className={classNames(
                  {
                    "p-invalid": (submitted && !kol.slug) || duplicateSLUG,
                  },
                  "kolinput"
                )}
              />
            </div>
            {submitted && !kol.slug && (
              <small id="prod-slug-help" className="p-invalid">
                Kol Link is required.
              </small>
            )}
            {duplicateSLUG && (
              <small id="prod-slug-help" className="p-invalid">
                A Unique Link is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="display_name">Display Name</label>
            <InputText
              id="display_name"
              value={kol.display_name}
              onChange={(e) => onInputChange(e, "display_name")}
              required
              className={classNames({
                "p-invalid": submitted && !kol.display_name,
              })}
            />
            {submitted && !kol.display_name && (
              <small id="prod-name-help" className="p-invalid">
                Display Name is required.
              </small>
            )}
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="description">Description</label>

            <RichEditor updateDesc={updateDesc} existingValue={htmlDesc} />
          </div>

          <div className="p-field p-col-12 p-md-4 ">
            <label htmlFor="social_medias">Social Media</label>
            <div className="p-inputgroup p-field">
              <span className="p-inputgroup-addon">facebook.com/</span>
              <InputText
                id="facebook"
                value={kol.social_medias.facebook}
                onChange={(e) => {
                  onSocialMediaChange(e, "facebook");
                }}
              />
            </div>

            <div className="p-inputgroup p-field">
              <span className="p-inputgroup-addon">twitter.com/</span>
              <InputText
                id="twitter"
                value={kol.social_medias.twitter}
                onChange={(e) => {
                  onSocialMediaChange(e, "twitter");
                }}
              />
            </div>
            <div className="p-inputgroup p-field">
              <span className="p-inputgroup-addon">instagram.com/</span>
              <InputText
                id="instagram"
                value={kol.social_medias.instagram}
                onChange={(e) => {
                  onSocialMediaChange(e, "instagram");
                }}
              />
            </div>
            <div className="p-inputgroup p-field">
              <span className="p-inputgroup-addon">youtube.com/</span>
              <InputText
                id="youtube"
                value={kol.social_medias.youtube}
                onChange={(e) => {
                  onSocialMediaChange(e, "youtube");
                }}
              />
            </div>
          </div>

          <div className="p-field p-col-12  p-md-4">
            <p htmlFor="images">Banner Image</p>
            {slug && (
              <div className="p-d-flex p-flex-column p-ai-center">
                <div>
                  <img
                    src={
                      bannerImage
                        ? URL.createObjectURL(bannerImage)
                        : kol.banner_image
                    }
                    style={{ width: "350px" }}
                  />
                </div>
                <div>
                  <Button
                    icon="pi pi-pencil"
                    label="Upload New Banner Image"
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => setEditBanner(true)}
                  />
                </div>
              </div>
            )}
            {!slug && (
              <Dropzone
                onChangeStatus={handleBannerChangeStatus}
                styles={{ dropzone: { minHeight: 350, maxHeight: 350 } }}
                maxFiles={1}
                multiple={false}
                inputContent="Drag an image or Click to Browse"
                addClassNames={{ previewImage: "featuredPreview" }}
                accept="image/*"
              />
            )}
          </div>

          <div className="p-field p-col-12  p-md-4">
            <p htmlFor="images">Profile Image</p>
            {slug && (
              <div className="p-d-flex p-flex-column p-ai-center">
                <div>
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : kol.profile_image
                    }
                    style={{ width: "350px" }}
                  />
                </div>
                <div>
                  <Button
                    icon="pi pi-pencil"
                    label="Upload New Profile Image"
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => setEditProfile(true)}
                  />
                </div>
              </div>
            )}
            {!slug && (
              <Dropzone
                onChangeStatus={handleProfileChangeStatus}
                styles={{ dropzone: { minHeight: 350, maxHeight: 350 } }}
                maxFiles={1}
                multiple={false}
                inputContent="Drag an image or Click to Browse"
                addClassNames={{ previewImage: "featuredPreview" }}
                accept="image/*"
              />
            )}
          </div>
          <div className="p-field p-col-12">
            <ProductDataTable
              products={kol.products}
              setToDelete={setToDelete}
              setDeleteProductDialog={setDeleteProductDialog}
              setAddProductDialog={setAddProductDialog}
              setToEdit={setToEdit}
              setEditProfitDialog={setEditProfitDialog}
            />
          </div>
        </div>

        <div className="p-d-flex p-jc-end">
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => router.push("/kols")}
          />
          <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-text"
            onClick={saveKol}
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
        visible={editBanner}
        headerText={"Upload New Banner Image"}
        onHide={() => setEditBanner(false)}
        inputText={"Drag an image or Click to Browse"}
        isFeatureImage={true}
        setEditFeatured={setEditBanner}
        newFeatured={newBanner}
        setNewFeatured={setNewBanner}
        setFeaturedImage={setBannerImage}
      />

      <UploadImageDialog
        visible={editProfile}
        headerText={"Upload New Profile Image"}
        onHide={() => setEditProfile(false)}
        inputText={"Drag an image or Click to Browse"}
        isFeatureImage={true}
        setEditFeatured={setEditProfile}
        newFeatured={newProfile}
        setNewFeatured={setNewProfile}
        setFeaturedImage={setProfileImage}
      />

      <AddProductDialog
        addProductDialog={addProductDialog}
        setAddProductDialog={setAddProductDialog}
        addProduct={addProduct}
      />

      <DeleteProductDialog
        deleteProductDialog={deleteProductDialog}
        setDeleteProductDialog={setDeleteProductDialog}
        toDelete={toDelete}
        removeProduct={removeProduct}
      />

      <EditProductDialog
        editProfitDialog={editProfitDialog}
        setEditProfitDialog={setEditProfitDialog}
        toEdit={toEdit}
        editProfit={editProfit}
      />
    </div>
  );
}
