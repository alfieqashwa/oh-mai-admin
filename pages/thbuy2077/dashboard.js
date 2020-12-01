import React, { useState, useEffect } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import {
  dailyPrice,
  initBarChart,
  chartOptions,
  chartPriceOptions,
  initPieChart,
  pieOptions,
  initBarKOLChart,
} from "components/helper";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import useUser from "lib/useUser";
import { TabView, TabPanel } from "primereact/tabview";

export default function THDashboard() {
  const person = useUser({ redirectTo: "/login" });
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [chartAllData, setChartAllData] = useState({});
  const [chartRevData, setChartRevData] = useState({});
  const [chartKOLData, setChartKOLData] = useState({});
  const [chartPieData, setChartPieData] = useState({});
  const [filterValue, setFilterValue] = useState("ALL");

  const [tabState, setTabState] = useState(0);
  const [currData, setCurrData] = useState([]);

  const [rates, setRates] = useState(0);
  const [ratesDate, setRatesDate] = useState(0);

  const filterItems = [
    { label: "All", value: "ALL" },
    { label: "Chicken Show", value: "Chickenshow" },
    { label: "Cyberclasher", value: "Cyberclasher" },
    { label: "Gladiuz KB", value: "Gladiuz KB" },
    { label: "Gufunnarock", value: "Gufunnarock" },
    { label: "Hua Hed", value: "Hua Hed" },
    { label: "Mixed KOL", value: "Mixed KOL" },
    { label: "Boung Lengame", value: "Boung Lengame" },
    { label: "Gamer Live TV", value: "Gamer Live TV" },
    { label: "Hon BoYa", value: "Hon BoYa" },
    { label: "Jai Raw", value: "Jai Raw" },
    { label: "Julio", value: "Julio" },
    { label: "SheapGamer", value: "SheapGamer" },
    { label: "Tanny", value: "Tanny" },
    { label: "Yoshi Minburi", value: "Yoshi Minburi" },
  ];
  function optionTemplate(option) {
    if (option.value == "ALL") return <div>{option.label}</div>;
    else return <div style={{ marginLeft: "20%" }}>{option.label}</div>;
  }

  React.useEffect(() => {
    (async function getTotal() {
      await fetch("https://api.buy2077.co/countorders", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTotalThaiNum(data.total);
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
          dailyPrice(setPrice, data);
          setCurrData(data);
          initBarChart(setChartAllData, data, "ALL", false);
          initBarChart(setChartRevData, data, "ALL", true);
          initPieChart(setChartPieData, data);
          initBarKOLChart(setChartKOLData, data);
        });
    })();

    (async function getExchangeRate() {
      fetch("https://api.exchangeratesapi.io/latest?base=THB&symbols=USD")
        .then((res) => res.json())
        .then((data) => {
          setRatesDate(data.date);
          setRates(data.rates.USD);
        });
    })();
  }, []);

  const filterRightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Dropdown
          style={{ width: "150px" }}
          value={filterValue}
          options={filterItems}
          onChange={(e) => {
            setFilterValue(e.value);
            initBarChart(setChartAllData, currData, e.value, false);
            initBarChart(setChartRevData, currData, e.value, true);
          }}
          optionLabel="label"
          itemTemplate={optionTemplate}
        />
      </React.Fragment>
    );
  };
  const filterLeftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5>Bar Chart Filter Controls:</h5>
      </React.Fragment>
    );
  };

  console.log(price);
  if (person) {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Revenue</span>
            <span className="detail">in Thai Baht</span>
            <span className="count revenue">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(price)}
            </span>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Revenue in USD</span>
            <span className="detail">
              Conversion rate: {rates}, last updated: {ratesDate}
            </span>
            <span className="count revenue">
              US
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price * rates)}
            </span>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Gross Profit</span>
            <span className="detail">Gross Profit in USD</span>
            <span className="count revenue">
              US
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format((price * rates) / 2)}
            </span>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">KOL Cost</span>
            <span className="detail">Amount given to KOL</span>
            <span className="count payment">
              US
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(4 * totalThaiNum)}
            </span>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Logistics</span>
            <span className="detail">Shipping Cost</span>
            <span className="count payment">
              US
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(4 * totalThaiNum)}
            </span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Payment Gateway</span>
            <span className="detail">Omise Fee (3.65%)</span>
            <span className="count payment">
              US
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format((price * rates * 3.65) / 100)}
            </span>
          </div>
        </div>

        <div className="p-col-12 p-lg-6">
          <div className="card summary">
            <span className="title">Successful Orders</span>
            <span className="detail">Number of purchases</span>
            <span className="count purchases">{totalThaiNum}</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-6">
          <div className="card summary">
            <span className="title">Net Profit</span>
            <span className="detail">Net Profit in USD</span>
            <span className="count visitors">
              US
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                (price * rates) / 2 -
                  4 * totalThaiNum -
                  4 * totalThaiNum -
                  (price * rates * 3) / 100
              )}
            </span>
          </div>
        </div>

        {/* <div className="p-col-12 p-lg-12">
          <Toolbar
            right={filterRightToolbarTemplate}
            left={filterLeftToolbarTemplate}
          ></Toolbar>
        </div> */}

        <div className="p-col-12 ">
          <div className="card" style={{ height: "100%" }}>
            <TabView>
              <TabPanel header="Copies sold">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Copies sold</h5>
                  <span>{filterRightToolbarTemplate()}</span>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="bar"
                      data={chartAllData}
                      options={chartOptions}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Revenue">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Revenue</h5>
                  <span>{filterRightToolbarTemplate()}</span>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="bar"
                      data={chartRevData}
                      options={chartPriceOptions}
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

              <TabPanel header="KOL Breakdown">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Breakdown of KOLs</h5>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="bar"
                      data={chartKOLData}
                      options={chartOptions}
                    />
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
