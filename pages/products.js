import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import useSWR from "swr";
import { products, DELETE_PRODUCT } from "../graphql/product";
import { fetcher, mutate } from "../lib/useSWR";
import Link from "next/link";
import useUser from "lib/useUser";

export default function Products() {
  const person = useUser({ redirectTo: "/login" });

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedSingle, setSelectedSingle] = useState(null);

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const { data: prod, error: prodErr } = useSWR(products, fetcher);
  if (prodErr) console.log(prodErr);

  if (!prod) return <></>;

  console.log(selectedSingle);

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const confirmDeleteProduct = (product) => {
    setSelectedSingle(product);
    setDeleteProductDialog(true);
  };

  async function deleteProductMutation(id) {
    await mutate(DELETE_PRODUCT, { id: id });
  }
  async function deleteProductsMutation(id) {
    for (var i = 0; i < id.length; i++) {
      await mutate(DELETE_PRODUCT, { id: id[i] });
    }
  }

  const deleteProduct = () => {
    deleteProductMutation(selectedSingle.id);
    setDeleteProductDialog(false);
    setSelectedSingle(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    var ids = [];

    selectedProducts.forEach((element) => {
      ids.push(element.id);
    });

    deleteProductsMutation(ids);

    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link href="/addproduct">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
          />
        </Link>
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
        /> */}
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.featured_image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const categoryTemplate = (rowData) => {
    return (
      <div>
        {rowData.categories.map((eaCat) => (
          <p>{eaCat}</p>
        ))}
      </div>
    );
  };

  const tagsTemplate = (rowData) => {
    return (
      <div>
        {rowData.tags.map((eaCat) => (
          <p>{eaCat}</p>
        ))}
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    var formatter = new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
    });
    return formatter.format(rowData.current_price);
  };

  const onsaleTemplate = (rowData) => {
    return rowData.on_sale ? "Yes" : "No";
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link
          href={{ pathname: "/editproduct", query: { slug: rowData.slug } }}
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  if (person) {
    return (
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="p-mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={prod?.products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
            scrollable
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="sku"
              header="SKU"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="product_name"
              header="Name"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              header="Featured Image"
              body={imageBodyTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="current_price"
              header="Current Price"
              body={priceBodyTemplate}
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="base_price"
              header="Base Price"
              body={priceBodyTemplate}
              headerStyle={{ width: "150px" }}
              sortable
            ></Column>
            <Column
              field="sale_price"
              header="Sale Price"
              body={priceBodyTemplate}
              headerStyle={{ width: "150px" }}
              sortable
            ></Column>
            <Column
              field="on_sale"
              header="Is it on sale?"
              body={onsaleTemplate}
              headerStyle={{ width: "150px" }}
              sortable
            ></Column>
            <Column
              header="Category"
              body={categoryTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              header="Tags"
              body={tagsTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>

            <Column
              field="stock_quantity"
              header="Stock Quantity"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="stock_status"
              header="Stock Status"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {selectedSingle && (
              <span>
                Are you sure you want to delete{" "}
                <b>{selectedSingle.product_name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {selectedProducts && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }

  return <></>;
}
