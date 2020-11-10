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

    // read excel file. DO NOT HAVE EMPTY FIELDS OR THE READER WILL SKIP THE VALUE
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) return console.log(err);

      setRows(resp.rows);
      setCols(resp.cols);

      // clear the upload button
      uploader.current.clear();

      // create data to send to backend
      var data = [];

      // loop through all the data only
      for (var i = 6; i < resp.rows[2].length; i++) {
        var date;
        // convert any dates to reeadable format/sql format
        if (resp.rows[1][i] > 40000) {
          date = moment(
            Math.round((resp.rows[1][i] - 25569) * 86400 * 1000)
          ).format("YYYY-DD-MM");
        } else {
          date = moment(resp.rows[1][i], "DD-MM-YYYY").format("YYYY-MM-DD");
        }

        // create new row of data [date, jianhao_views, jianhao_pc, ...]
        var newRow = [];
        newRow.push(date);
        for (var j = 2; j < 104; j++) {
          if (resp.rows[j] == undefined) newRow.push(0);
          else if (resp.rows[j][i] == undefined) console.log("error");
          else newRow.push(resp.rows[j][i]);
        }

        data.push(newRow);
      }

      console.log(data);
    });
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
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
