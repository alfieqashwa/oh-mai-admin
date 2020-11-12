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

import { Dropdown } from "primereact/dropdown";
import {
  createBarChart,
  stackedOptions,
} from "components/chart/maindashboard/barchart";

import {
  createDouChart,
  douOptions,
} from "components/chart/maindashboard/douchart";

export default function Dashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [chartQtyData, setChartQtyData] = useState({});
  const [chartRevData, setChartRevData] = useState({});

  const [chartRegionData, setChartRegionData] = useState({});
  const [chartRegionRevData, setChartRegionRevData] = useState({});
  const [chartConsoleData, setChartConsoleData] = useState({});
  const [chartConsoleRevData, setChartConsoleRevData] = useState({});

  const [currData, setCurrData] = useState([]);

  const [uploadDialog, setUploadDialog] = useState(false);

  const [filterValue, setFilterValue] = useState("ALL");

  const toast = React.useRef(null);
  const uploader = React.useRef(null);

  const filterItems = [
    { label: "All", value: "ALL" },
    { label: "Singapore", value: "SG" },
    { label: "Jian Hao", value: "jianhao" },
    { label: "Debbie", value: "debbie" },
    { label: "TitanGamers", value: "titangamers" },
    { label: "Ridwan", value: "ridwan" },
    { label: "Vincent", value: "vincent" },
    { label: "NOC(Mugs)", value: "nocmug" },
    { label: "NOC(socks)", value: "nocsocks" },
    { label: "Malaysia", value: "MY" },
    { label: "YingTze", value: "yingtze" },
    { label: "Laowu", value: "laowu" },
    { label: "Mobhouse", value: "mobhouse" },
    { label: "Flare", value: "flare" },
    { label: "Adibalexx", value: "adibalexx" },
    { label: "Farhanmzln", value: "farhanmzln" },
    { label: "Spiderjal", value: "spiderjal" },
    { label: "Derezedd", value: "derezedd" },
    { label: "Rezzadude", value: "rezzadude" },
    { label: "Luqman", value: "luqman" },
    { label: "Taiwan", value: "TW" },
    { label: "貝莉莓", value: "貝莉莓" },
    { label: "萊斯", value: "萊斯" },
    { label: "老皮", value: "老皮" },
    { label: "超粒方", value: "超粒方" },
    { label: "殺梗", value: "殺梗" },
    { label: "6tan", value: "6tan" },
    { label: "魯蛋", value: "魯蛋" },
    { label: "館長", value: "館長" },
    { label: "Gooaye", value: "gooaye" },
    { label: "達哥", value: "達哥" },
    { label: "Hong Kong", value: "HK" },
    { label: "Arhosunny", value: "arhosunny" },
    { label: "GameplayHK", value: "gameplayhk" },
  ];

  React.useEffect(() => {
    asyncData();
  }, []);

  var asyncData = async function getData() {
    await fetch("https://api.buy2077.co/getconsolidated", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrData(data);
      });
  };

  React.useEffect(() => {
    if (currData.length) {
      createBarChart(currData, "ALL", setChartQtyData, 0);
      createBarChart(currData, "ALL", setChartRevData, 1);
      createDouChart(currData, "ALL", setChartRegionData, 0);
      createDouChart(currData, "ALL", setChartRegionRevData, 1);
      createDouChart(currData, "ALL", setChartConsoleData, 2);
      createDouChart(currData, "ALL", setChartConsoleRevData, 3);
    }
  }, [currData]);

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

      var dataJSON = JSON.stringify(data);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJSON,
      };
      fetch("https://api.buy2077.co/updateconsolidated", requestOptions).then(
        (response) => {
          setFilterValue("ALL");
          asyncData();
          // setCurrData(data);
          return response.json();
        }
      );
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

  const filterRightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Dropdown
          style={{ width: "150px" }}
          value={filterValue}
          options={filterItems}
          onChange={(e) => {
            setFilterValue(e.value);
            createBarChart(currData, e.value, setChartQtyData, 0);
            createBarChart(currData, e.value, setChartRevData, 1);
            createDouChart(currData, e.value, setChartConsoleData, 2);
            createDouChart(currData, e.value, setChartConsoleRevData, 3);
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

  function optionTemplate(option) {
    if (
      option.value == "ALL" ||
      option.value == "SG" ||
      option.value == "MY" ||
      option.value == "TW" ||
      option.value == "HK"
    )
      return <div>{option.label}</div>;
    else return <div style={{ marginLeft: "20%" }}>{option.label}</div>;
  }

  return (
    <div className="p-grid p-fluid dashboard">
      <Toast ref={toast}></Toast>
      <div className="p-col-12 p-lg-12">
        <Toolbar right={rightToolbarTemplate}></Toolbar>
      </div>

      <div className=" p-col-12 p-lg-6">
        <div className="card">
          <div className="p-d-flex p-jc-between">
            <h5>Number of copies sold per region</h5>
          </div>
          <Chart type="pie" data={chartRegionData} options={douOptions} />
        </div>
      </div>
      <div className=" p-col-12 p-lg-6">
        <div className="card">
          <div className="p-d-flex p-jc-between">
            <h5>Revenue per region</h5>
          </div>
          <Chart type="pie" data={chartRegionRevData} options={douOptions} />
        </div>
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
        <Toolbar
          right={filterRightToolbarTemplate}
          left={filterLeftToolbarTemplate}
        ></Toolbar>
      </div>

      <div className=" p-col-12 p-lg-6">
        <div className="card">
          <div className="p-d-flex p-jc-between">
            <h5>{filterValue} Buy2077 - Number of copies sold</h5>
          </div>
          <Chart type="bar" data={chartQtyData} options={stackedOptions} />
        </div>
      </div>

      <div className=" p-col-12 p-lg-6">
        <div className="card">
          <div className="p-d-flex p-jc-between">
            <h5>{filterValue} Buy2077 - Revenue</h5>
          </div>
          <Chart type="bar" data={chartRevData} options={stackedOptions} />
        </div>
      </div>

      <div className=" p-col-12 p-lg-6">
        <div className="card">
          <div className="p-d-flex p-jc-between">
            <h5>Number of copies sold per console</h5>
          </div>
          <Chart type="doughnut" data={chartConsoleData} options={douOptions} />
        </div>
      </div>

      <div className=" p-col-12 p-lg-6">
        <div className="card">
          <div className="p-d-flex p-jc-between">
            <h5>Revenue sold per console (USD)</h5>
          </div>
          <Chart
            type="doughnut"
            data={chartConsoleRevData}
            options={douOptions}
          />
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
