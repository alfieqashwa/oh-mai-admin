import React, { useState, useEffect } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import { dailyPrice, initBarChart, chartOptions } from "components/helper";
import { Toolbar } from "primereact/toolbar";
import { FileUpload } from "primereact/fileupload";

import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";
import { ExcelRenderer } from "react-excel-renderer";
import { Toast } from "primereact/toast";
import { SingleFieldSubscriptionsRule } from "graphql";

export default function THDashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [chartAllData, setChartAllData] = useState({});

  const [uploadDialog, setUploadDialog] = useState(false);
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);

  const toast = React.useRef(null);
  const uploader = React.useRef(null);

  React.useEffect(() => {
    // (async function getTotal() {
    //   await fetch("https://api.buy2077.co/countorders", {
    //     method: "GET",
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       setTotalThaiNum(data.total);
    //     });
    // })();
    // (async function getData() {
    //   await fetch("https://api.buy2077.co/listorders?page=0&items=9999", {
    //     method: "GET",
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       dailyPrice(setPrice, data);
    //       initBarChart(setChartAllData, data);
    //     });
    // })();
  }, []);

  const uploadHandler = (event) => {
    console.log(event);
    let fileObj = event.files[0];

    console.log(event.files[0]);

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        setRows(resp.rows);
        setCols(resp.cols);
      }
      uploader.current.clear();

      var chartData = [];
      var chartLabels = [];

      for (var i = 3; i < resp.rows[1].length - 1; i++) {
        console.log(i);
        var date = moment(
          Math.round((resp.rows[1][i] - 25569) * 86400 * 1000)
        ).format("DD-MM-YYYY");
        chartLabels.push(date);
        chartData.push(resp.rows[18][i]);
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
    });
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });

    // console.log(moment(rows[1][3]));
    // var str = rows[1][3];

    // console.log(day);
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          ref={uploader}
          mode="basic"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 "
          customUpload
          uploadHandler={uploadHandler}
          auto
        />
      </React.Fragment>
    );
  };

  return (
    <div className="p-grid p-fluid dashboard">
      <Toast ref={toast}></Toast>
      <div className="p-col-12 p-lg-12">
        <Toolbar right={rightToolbarTemplate}></Toolbar>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card summary ">
          <span className="title">buy2077.co Sales</span>
          <span className="detail">Number of purchases</span>
          <span className="count purchases">{totalThaiNum}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card summary ">
          <span className="title">Daily Revenue</span>
          <span className="detail">Income for today</span>
          <span className="count revenue">{price}</span>
        </div>
      </div>

      <div className="p-col-12 p-lg-12">
        <div className="card">
          <h5>buy2077.co - Number of copies sold</h5>
          <Chart type="bar" data={chartAllData} options={chartOptions} />
        </div>
      </div>

      <Dialog
        header="Upload xlsx/excel sheet here"
        visible={uploadDialog}
        style={{ width: "80vw" }}
        onHide={() => setUploadDialog(false)}
      ></Dialog>
    </div>
  );
}
