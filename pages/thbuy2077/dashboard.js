import React, { useState, useEffect } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import {
  dailyPrice,
  initBarChart,
  chartOptions,
  chartMobileOptions,
  chartPriceOptions,
  chartMobilePriceOptions,
  initPieChart,
  pieOptions,
  initBarKOLChart,
} from "components/helper";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import useUser from "lib/useUser";
import { TabView, TabPanel } from "primereact/tabview";
import { InputNumber } from "primereact/inputnumber";

export default function THDashboard() {
  const person = useUser({ redirectTo: "/login" });

  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceUSD, setPriceUSD] = useState(0);
  const [grossProfitUSD, setGrossProfitUSD] = useState(0);
  const [omisePay, setOmisePay] = useState(0);

  const [chartAllData, setChartAllData] = useState({});
  const [chartRevData, setChartRevData] = useState({});
  const [chartKOLData, setChartKOLData] = useState({});
  const [chartPieData, setChartPieData] = useState({});
  const [filterValue, setFilterValue] = useState("ALL");

  const [tabState, setTabState] = useState(0);
  const [initKOLFee, setInitKOLFee] = useState(4);
  const [shippingCost, setShippingCost] = useState(4.6);
  const [currData, setCurrData] = useState([]);

  const [rates, setRates] = useState(0);
  const [ratesDate, setRatesDate] = useState(0);

  const [isDesktop, setIsDesktop] = useState(true);

  const [refreshInterval, setRefreshInterval] = useState(20000);

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

  const fetchMetrics = () => {
    console.log("fetchMetrics");
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
          initBarChart(setChartAllData, data, filterValue, false);
          initBarChart(setChartRevData, data, filterValue, true);
          initPieChart(setChartPieData, data);
          initBarKOLChart(setChartKOLData, data);
        });
    })();

    (async function getExchangeRate() {
      await fetch("https://api.exchangeratesapi.io/latest?base=THB&symbols=USD")
        .then((res) => res.json())
        .then((data) => {
          setRatesDate(data.date);
          setRates(data.rates.USD);
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
    setPriceUSD(price * rates);
    setGrossProfitUSD((price * rates) / 2);
    setOmisePay((price * rates * 3.65) / 100);
  }, [price, rates]);

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

  if (person) {
    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Revenue</div>
                <div className="detail">in Thai Baht</div>
              </div>

              <div className="p-d-flex p-ai-center p-jc-center">
                <div className="count revenue">
                  {new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(price)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Revenue in USD</div>
                <div className="detail">
                  Conversion rate: {rates}, last updated: {ratesDate}
                </div>
              </div>
              <div className="p-d-flex p-ai-center p-jc-center">
                <div className="count revenue">
                  US
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(priceUSD)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Gross Profit</div>
                <div className="detail">Gross Profit in USD</div>
              </div>
              <div className="p-d-flex p-ai-center p-jc-center">
                <div className="count revenue">
                  US
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(grossProfitUSD)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">KOL Cost</div>
                <div className="detail">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      Amount given to KOL per copy: $
                    </span>
                    <InputNumber
                      mode="decimal"
                      minFractionDigits={2}
                      value={initKOLFee}
                      onValueChange={(e) => setInitKOLFee(e.value)}
                      style={{ width: isDesktop ? "43%" : "100%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-d-flex p-ai-center p-jc-center">
                <div className="count payment">
                  US
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(initKOLFee * totalThaiNum)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Logistics</div>
                <div className="detail">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <p>Shipping Cost per copy: $</p>
                    </span>
                    <InputNumber
                      mode="decimal"
                      minFractionDigits={2}
                      value={shippingCost}
                      onValueChange={(e) => setShippingCost(e.value)}
                      style={{ width: isDesktop ? "43%" : "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-d-flex p-ai-center p-jc-center">
                <div className="count payment">
                  US
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(shippingCost * totalThaiNum)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Payment Gateway</div>
                <div className="detail" style={{ minHeight: "35px" }}>
                  Omise Fee (3.65%)
                </div>
              </div>
              <div className="p-d-flex p-ai-center p-jc-center">
                <div className="count payment">
                  US
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(omisePay)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-6">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Successful Orders</div>
                <div className="detail">Number of purchases</div>
              </div>
              <div className="count purchases  p-d-flex p-ai-center">
                {totalThaiNum}
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12 p-lg-6">
          <div className="card summary">
            <div className="p-d-flex p-jc-between">
              <div
                className="p-d-flex p-flex-column"
                style={{ paddingRight: "2%" }}
              >
                <div className="title">Net Profit</div>
                <div className="detail">Net Profit in USD</div>
              </div>
              <div className="count visitors p-d-flex p-ai-center">
                US
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  grossProfitUSD -
                    initKOLFee * totalThaiNum -
                    shippingCost * totalThaiNum -
                    omisePay
                )}
              </div>
            </div>
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
                      options={isDesktop ? chartOptions : chartMobileOptions}
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

              <TabPanel header="KOL Breakdown">
                <div className="p-d-flex p-jc-between">
                  <h5>th.buy2077.co - Breakdown of KOLs</h5>
                </div>
                <div className="chartsMid">
                  <div className="charts">
                    <Chart
                      type="bar"
                      data={chartKOLData}
                      options={isDesktop ? chartOptions : chartMobileOptions}
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
