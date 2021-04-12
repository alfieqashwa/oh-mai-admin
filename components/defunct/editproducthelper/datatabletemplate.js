import React from "react";
import useObjectURL from "use-object-url";
import { Button } from "primereact/button";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function ImageBodyTemplate(props) {
  const obj = useObjectURL(props.file);

  return (
    <img
      src={obj ? obj : ""}
      onError={(e) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      //alt={props.file.name}
      className="product-image"
    />
  );
}

export const ActionBodyTemplate = (props) => {
  return (
    <React.Fragment>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        onClick={() => {
          props.setToDelete(props.rowData);
          props.setDeleteImageDialog(true);
        }}
      />
    </React.Fragment>
  );
};

export const ImageDataTable = (props) => {
  const {
    images,
    setToDelete,
    setDeleteImageDialog,
    setEditImages,
    setImages,
  } = props;

  const renderHeader = (
    <div className="table-header p-d-flex p-jc-end">
      <div>
        <Button
          icon="pi pi-pencil"
          label="Upload New Images"
          className="p-button-success p-mr-2"
          onClick={() => setEditImages(true)}
        />
      </div>
    </div>
  );

  const onRowReorder = (e) => {
    setImages(e.value);
  };

  return (
    <DataTable header={renderHeader} value={images} onRowReorder={onRowReorder}>
      <Column header="Reorder" rowReorder style={{ width: "15%" }} />
      <Column
        header="Image"
        body={(rowData) => <ImageBodyTemplate file={rowData} />}
        style={{ width: "70%" }}
      ></Column>
      <Column
        body={(rowData) => (
          <ActionBodyTemplate
            rowData={rowData}
            setToDelete={setToDelete}
            setDeleteImageDialog={setDeleteImageDialog}
          />
        )}
        style={{ width: "15%" }}
      ></Column>
    </DataTable>
  );
};
