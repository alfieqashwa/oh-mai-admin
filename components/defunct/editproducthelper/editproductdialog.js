import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ImageBodyTemplate } from "./datatabletemplate";
import Dropzone from "react-dropzone-uploader";

export const DeleteImageDialog = (props) => {
  const {
    deleteImageDialog,
    setDeleteImageDialog,
    toDelete,
    setToDelete,
    images,
    setImages,
  } = props;

  const deleteImageDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteImageDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          setImages(
            images.filter((e, index) => {
              if (e !== toDelete) return true;
              else {
                return false;
              }
            })
          );
          setDeleteImageDialog(false);
          setToDelete(null);
        }}
      />
    </React.Fragment>
  );

  return (
    <Dialog
      visible={deleteImageDialog}
      style={{ width: "450px" }}
      header="Confirm"
      modal
      footer={deleteImageDialogFooter}
      onHide={() => setDeleteImageDialog(false)}
    >
      <div className="confirmation-content" style={{ padding: "20px 0px" }}>
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span>Are you sure you want to delete this image?</span>
      </div>

      <div className="p-d-flex p-jc-center">
        <ImageBodyTemplate file={toDelete} />
      </div>
    </Dialog>
  );
};

export const UploadImageDialog = (props) => {
  const {
    visible,
    headerText,
    onHide,
    inputText,
    isFeatureImage,
    setEditFeatured,
    newFeatured,
    setNewFeatured,
    setFeaturedImage,
    setEditImages,
    images,
    setImages,
    tempImages,
    setTempImages,
  } = props;

  const handleDialogFeatured = ({ file, meta }, status) => {
    if (status == "done") {
      setNewFeatured(file);
    }
    if (status == "removed") {
      setNewFeatured(null);
    }
  };

  const handleDialogImages = ({ file, meta }, status) => {
    if (status == "done") {
      setTempImages([...tempImages, file]);
    }
    if (status == "removed") {
      setTempImages(tempImages.filter((e) => e !== file));
    }
  };

  const editFeaturedImageFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setEditFeatured(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          console.log("setting");
          if (newFeatured) setFeaturedImage(newFeatured);
          //setUploadedFiles([newFeatured, ...uploadedFiles]);
          setEditFeatured(false);
        }}
      />
    </React.Fragment>
  );

  const editImageFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setEditImages(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          if (tempImages) setImages([...images, ...tempImages]);
          //setUploadedFiles([newFeatured, ...uploadedFiles]);
          setEditImages(false);
        }}
      />
    </React.Fragment>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: "450px" }}
      header={headerText}
      modal
      footer={isFeatureImage ? editFeaturedImageFooter : editImageFooter}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <Dropzone
          onChangeStatus={
            isFeatureImage ? handleDialogFeatured : handleDialogImages
          }
          styles={{ dropzone: { minHeight: 350, maxHeight: 350 } }}
          maxFiles={isFeatureImage ? 1 : 9 - images.length}
          multiple={isFeatureImage ? false : true}
          inputContent={inputText}
          addClassNames={{ previewImage: "featuredPreview" }}
          accept="image/*"
        />
      </div>
    </Dialog>
  );
};
