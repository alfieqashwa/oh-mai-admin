import React, { useState, useEffect } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import {
  dailyPrice,
  initBarChart,
  chartOptions,
  chartPriceOptions,
} from "components/helper";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";

export default function THDashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [chartAllData, setChartAllData] = useState({});
  const [chartRevData, setChartRevData] = useState({});
  const [filterValue, setFilterValue] = useState("ALL");

  const [currData, setCurrData] = useState([]);

  const filterItems = [
    { label: "All", value: "ALL" },
    { label: "Chicken Show", value: "Chickenshow" },
    { label: "Cyberclasher", value: "Cyberclasher" },
    { label: "Gladiuz KB", value: "Gladiuz KB" },
    { label: "Gufunnarock", value: "Gufunnarock" },
    { label: "Hua Hed", value: "Hua Hed" },
    { label: "Mixed KOL", value: "Mixed KOL" },
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

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-lg-6">
        <div className="card summary">
          <span className="title">th.buy2077.co Sales</span>
          <span className="detail">Number of purchases</span>
          <span className="count purchases">{totalThaiNum}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card summary">
          <span className="title">th.buy2077.co Revenue</span>
          <span className="detail">Income for purchases</span>
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
      <div className="p-col-12 p-lg-12">
        <Toolbar
          right={filterRightToolbarTemplate}
          left={filterLeftToolbarTemplate}
        ></Toolbar>
      </div>

      <div className="p-col-12 p-lg-6">
        <div className="card">
          <h5>th.buy2077.co - Number of copies sold</h5>
          <Chart type="bar" data={chartAllData} options={chartOptions} />
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card">
          <h5>th.buy2077.co - Revenue of copies sold</h5>
          <Chart type="bar" data={chartRevData} options={chartPriceOptions} />
        </div>
      </div>
    </div>
  );
}
