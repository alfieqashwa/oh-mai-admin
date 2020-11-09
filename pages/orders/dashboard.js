import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function THDashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [products, setProducts] = useState(null);

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
          setProducts(data);
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
          <span className="title">Revenue</span>
          <span className="detail">Income for today</span>
          <span className="count revenue">$0</span>
        </div>
      </div>
    </div>
  );
}
