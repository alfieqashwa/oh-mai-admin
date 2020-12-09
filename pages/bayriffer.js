import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import {
  initBayrifferBarChart,
  chartOptions,
  chartMobileOptions,
  chartPriceOptions,
  chartMobilePriceOptions,
  initBayrifferPieChart,
  pieOptions,
} from "components/bayrifferHelper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import useUser from "lib/useUser";
import { TabView, TabPanel } from "primereact/tabview";
import { InputNumber } from "primereact/inputnumber";
import { BreadCrumb } from "primereact/breadcrumb";

export default function Bayriffer() {
  const person = useUser({ redirectTo: "/login" });

  const [chartAllData, setChartAllData] = useState({});
  const [chartRevData, setChartRevData] = useState({});
  const [chartPieData, setChartPieData] = useState({});
  const [products, setProducts] = useState(null);
  const [currData, setCurrData] = useState([]);

  const [isDesktop, setIsDesktop] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [refreshInterval, setRefreshInterval] = useState(5000);

  const [loading, setLoading] = useState(true);
  const dt = useRef(null);

  const fetchMetrics = () => {
    console.log("fetchMetrics");

    (async function getData() {
      await fetch("https://api.buy2077.co/listorders?page=0&items=9999", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var filteredList = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].kol == "Bay Riffer") {
              filteredList.push(data[i]);
            }
          }

          setCurrData(filteredList);
        });
    })();

    (async function getProducts() {
      await fetch("https://api.buy2077.co/listorders?page=0&items=9999", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var filteredList = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].kol == "Bay Riffer") {
              filteredList.push(data[i]);
            }
          }
          setProducts(filteredList);
          console.log(filteredList);
          setLoading(false);
        });
    })();
  };

  React.useEffect(() => {
    if (window.innerWidth < 1024) setIsDesktop(false);
    fetchMetrics();
  }, []);

  React.useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  React.useEffect(() => {
    if (currData.length > 0) {
      //console.log(currData);
      initBayrifferBarChart(setChartAllData, currData, false);
      initBayrifferBarChart(setChartRevData, currData, true);
      initBayrifferPieChart(setChartPieData, currData);
    }
  }, [currData]);

  const header = (
    <div className="table-header p-d-flex p-jc-between">
      <h5 className="p-m-0"> Orders</h5>
      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
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

  const items = [
    { label: "Cyberpunk 2077" },
    { label: "Thailand" },
    { label: "Bayriffer" },
  ];

  const home = { icon: "pi pi-home" };

  if (person) {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12">
          <BreadCrumb model={items} home={home} />
        </div>
        <div className="p-col-12 ">
          <div className="card" style={{ height: "100%" }}>
            <TabView>
              <TabPanel header="Copies sold">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Bayriffer Copies sold</h5>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="bar"
                      data={chartAllData}
                      options={isDesktop ? chartOptions : chartMobileOptions}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Revenue">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Revenue</h5>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="bar"
                      data={chartRevData}
                      options={
                        isDesktop ? chartPriceOptions : chartMobilePriceOptions
                      }
                    />
                  </div>
                </div>
              </TabPanel>

              <TabPanel header="Platform Breakdown">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Breakdown of Platforms</h5>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="pie"
                      data={chartPieData}
                      options={pieOptions}
                    />
                  </div>
                </div>
              </TabPanel>

              <TabPanel header="Orders List">
                <DataTable
                  ref={dt}
                  value={products}
                  paginator
                  rows={10}
                  //   totalRecords={totalNum}
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
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
