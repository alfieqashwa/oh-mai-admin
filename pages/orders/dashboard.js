import React, { useState, useEffect } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";

export default function THDashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [products, setProducts] = useState(null);
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
          setProducts(data);
          dailyPrice(data);
          barChart(data);
        });
    })();
  }, []);

  const dailyPrice = (data) => {
    setPrice(0);
    if (data) {
      var currentPrice = price;
      data.forEach((element) => {
        var str = moment(element.order_datetime);

        var today = moment();
        if (today.isSame(str, "day")) {
          currentPrice += element.price;
        }
      });
      setPrice(currentPrice);
    }
  };

  const barChart = (data) => {
    var allDates = {};
    var chartData = [];
    var chartLabels = [];

    if (data) {
      //Get all dates in interval and set it to 0
      var enddate = data[0].order_datetime;
      var startdate = data[data.length - 1].order_datetime;
      // If you want an inclusive end date (fully-closed interval)
      for (var m = moment(startdate); m.isBefore(enddate); m.add(1, "days")) {
        allDates[m.format("DD-MM-YYYY")] = {
          name: m.format("DD-MM-YYYY"),
          sales: 0,
        };
      }

      // update the sale number of days which have sales
      data.forEach((element) => {
        var dateString = moment(element.order_datetime).format("DD-MM-YYYY");
        allDates[dateString].sales++;
      });

      // push it into the charts
      for (var key in allDates) {
        var label = allDates[key].name;
        var sales = allDates[key].sales;

        chartLabels.push(label);
        chartData.push(sales);
      }

      // set the labels for the chart
      setChartAllData({
        labels: chartLabels,
        datasets: [
          {
            label: "Copies sold",
            backgroundColor: "#66BB6A",
            data: chartData,
          },
        ],
      });
    }
  };

  let basicOptions = {
    legend: {
      labels: {
        fontColor: "#495057",
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#495057",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "#495057",
          },
        },
      ],
    },
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
          <span className="title">Daily Revenue</span>
          <span className="detail">Income for today</span>
          <span className="count revenue">{price}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-12">
        <div className="card">
          <h5>th.buy2077.co - Number of copies sold</h5>
          <Chart type="bar" data={chartAllData} options={basicOptions} />
        </div>
      </div>
    </div>
  );
}
