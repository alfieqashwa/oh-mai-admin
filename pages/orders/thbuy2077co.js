import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function Thbuy2077co() {
  const [totalNum, setTotalNum] = useState(0);
  const [products, setProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const [dtIndex, setDtIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    (async function getTotal() {
      await fetch("https://api.buy2077.co/countorders", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTotalNum(data.total);
        });
    })();

    (async function getData() {
      await fetch("https://api.buy2077.co/listorders?page=0&items=15", {
        method: "GET",
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          setLoading(false);
        });
    })();
  }, []);

  const exportCSV = () => {
    dt.current.exportCSV();
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
      <h5 className="p-m-0">th.buy2077.co Orders</h5>
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

  const onPage = (event) => {
    //setLoading(true);

    (async function getData() {
      await fetch(
        "https://api.buy2077.co/listorders?page=" + event.page + "&items=15",
        {
          method: "GET",
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          setDtIndex(event.first);
          setProducts(data);
          setLoading(false);
        });
    })();
  };

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          paginator
          rows={15}
          totalRecords={totalNum}
          // rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          lazy
          first={dtIndex}
          onPage={onPage}
          loading={loading}
        >
          <Column field="product_name" header="Name" sortable></Column>
          <Column field="order_status" header="Status" sortable></Column>
          <Column field="kol" header="KOL" sortable></Column>
          <Column field="platform" header="Edition" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
}
