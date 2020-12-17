import React from "react";
import useObjectURL from "use-object-url";
import { Button } from "primereact/button";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const ProductDataTable = (props) => {
  const {
    products,
    setToDelete,
    setDeleteProductDialog,
    setAddProductDialog,
    setToEdit,
    setEditProfitDialog,
  } = props;

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            setToDelete(rowData);
            setDeleteProductDialog(true);
          }}
        />
      </React.Fragment>
    );
  };

  const profitTemplate = (rowData) => {
    return (
      <div className="p-d-flex p-ai-center">
        <div style={{ marginRight: "10px" }}>{rowData.kol_profit}</div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => {
            setToEdit(rowData);
            setEditProfitDialog(true);
          }}
        />
      </div>
    );
  };

  const renderHeader = (
    <div className="table-header p-d-flex p-jc-end">
      <div>
        <Button
          icon="pi pi-pencil"
          label="Add new products"
          className="p-button-success p-mr-2"
          onClick={() => setAddProductDialog(true)}
        />
      </div>
    </div>
  );

  return (
    <DataTable header={renderHeader} value={products}>
      <Column
        field="product.product_name"
        header="Name"
        sortable
        headerStyle={{ width: "150px" }}
      ></Column>

      <Column
        field="product.slug"
        header="Slug"
        sortable
        headerStyle={{ width: "150px" }}
      ></Column>
      <Column
        field="kol_profit"
        header="Commission"
        body={profitTemplate}
        sortable
        headerStyle={{ width: "150px" }}
      ></Column>
      <Column body={actionBodyTemplate} style={{ width: "15%" }}></Column>
    </DataTable>
  );
};
