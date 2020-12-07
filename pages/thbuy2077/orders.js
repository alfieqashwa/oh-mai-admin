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
import moment from "moment";
import useUser from "lib/useUser";

export default function THOrders() {
  const person = useUser({ redirectTo: "/login" });
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
      await fetch("https://api.buy2077.co/listorders?page=0&items=9999", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          console.log(data);
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

  const dateTemplate = (rowData) => {
    var date = new Date(rowData.order_datetime);

    var str = moment(date).format("DD/MM/yyyy");
    return str;
  };

  const timeTemplate = (rowData) => {
    var time = new Date(rowData.order_datetime);

    var str = moment(time).format("kk:mm:ss");
    return str;
  };

  const chargeTemplate = (rowData) => {
    return (
      <span style={{ overflowWrap: "break-word" }}>
        {rowData.omise_charge_id}
      </span>
    );
  };

  const firstNameTemplate = (rowData) => {
    return (
      <span style={{ overflowWrap: "break-word" }}>{rowData.first_name}</span>
    );
  };

  const lastNameTemplate = (rowData) => {
    return (
      <span style={{ overflowWrap: "break-word" }}>{rowData.last_name}</span>
    );
  };

  if (person) {
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
            loading={loading}
            scrollable
          >
            <Column
              field="order_datetime"
              header="Date"
              body={dateTemplate}
              sortable
              headerStyle={{ width: "100px" }}
            ></Column>
            <Column
              field=""
              body={timeTemplate}
              header="Time"
              headerStyle={{ width: "100px" }}
            ></Column>
            <Column
              field="product_name"
              header="Name"
              headerStyle={{ width: "350px" }}
              sortable
            ></Column>
            <Column
              field="order_status"
              header="Status"
              headerStyle={{ width: "100px" }}
              sortable
            ></Column>
            <Column
              field="kol"
              header="KOL"
              headerStyle={{ width: "150px" }}
              sortable
            ></Column>
            <Column
              field="platform"
              header="Edition"
              headerStyle={{ width: "100px" }}
              sortable
            ></Column>
            <Column
              field="price"
              header="Price(฿)"
              headerStyle={{ width: "120px" }}
              sortable
            ></Column>
            <Column
              field="omise_charge_id"
              header="Omise Charge ID"
              body={chargeTemplate}
              headerStyle={{ width: "300px" }}
            ></Column>
            <Column
              field="first_name"
              header="First Name"
              body={firstNameTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="last_name"
              header="Last Name"
              body={lastNameTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="phone_number"
              header="Contact Number"
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="shipping_address_1"
              header="Shipping Address Line 1"
              headerStyle={{ width: "300px" }}
            ></Column>
            <Column
              field="shipping_address_2"
              header="Shipping Address Line 2"
              headerStyle={{ width: "300px" }}
            ></Column>
            <Column
              field="city"
              header="Shipping Address City"
              headerStyle={{ width: "300px" }}
            ></Column>
            <Column
              field="state"
              header="Shipping Address State"
              headerStyle={{ width: "300px" }}
            ></Column>
            <Column
              field="country"
              header="Shipping Address Country"
              headerStyle={{ width: "300px" }}
            ></Column>
            <Column
              field="postal_code"
              header="Shipping Address Postal Code"
              headerStyle={{ width: "300px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    );
  }
  return <></>;
}
