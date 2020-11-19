import React, { useState, useEffect } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import { dailyPrice, initBarChart, chartOptions } from "components/helper";

export default function THDashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [chartAllData, setChartAllData] = useState({});

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
          initBarChart(setChartAllData, data);
        });
    })();
  }, []);

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
          <span className="count revenue">฿{price}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-12">
        <div className="card">
          <h5>th.buy2077.co - Number of copies sold</h5>
          <Chart type="bar" data={chartAllData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
