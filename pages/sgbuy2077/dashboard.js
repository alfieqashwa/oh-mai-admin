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

export default function THDashboard() {
  const [totalThaiNum, setTotalThaiNum] = useState(0);
  const [price, setPrice] = useState(0);
  const [chartAllData, setChartAllData] = useState({});

  const [currData, setCurrData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  const [uploadDialog, setUploadDialog] = useState(false);
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);

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
    (async function getData() {
      await fetch("https://api.buy2077.co/getconsolidated", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCurrData(data);
          // //dailyPrice(setPrice, data);
          // processBarChart(data);

          // createBarChart("all");
          // console.log(processedData);
        });
    })();
  }, []);

  React.useEffect(() => {
    if (currData.length) createBarChart("ALL");
  }, [currData]);

  const createBarChart = (filter) => {
    var chartLabels = [];

    var keys = Object.keys(currData[0]);

    var pcKeys = [];
    var psKeys = [];
    var xboxKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc")) pcKeys.push(key);
      if (key.includes("ps4")) psKeys.push(key);
      if (key.includes("xbox")) xboxKeys.push(key);
    });

    console.log(pcKeys);
    var pcData = [];
    var psData = [];
    var xboxData = [];

    if (filter == "ALL") {
      currData.forEach((element) => {
        chartLabels.push(moment(element.date).format("DD-MM-YYYY"));

        var currPC = 0;
        pcKeys.forEach((key) => {
          currPC += parseInt(element[key]);
        });
        pcData.push(currPC);

        var currPS = 0;
        psKeys.forEach((key) => {
          currPS += parseInt(element[key]);
        });
        psData.push(currPS);

        var currXBOX = 0;
        xboxKeys.forEach((key) => {
          currXBOX += parseInt(element[key]);
        });
        xboxData.push(currXBOX);
      });

      // set the labels for the chart
      setChartAllData({
        labels: chartLabels,
        datasets: [
          {
            label: "PC Sales",
            backgroundColor: "#42A5F5",
            data: pcData,
          },
          {
            label: "PS Sales",
            backgroundColor: "#66BB6A",
            data: psData,
          },
          {
            label: "Xbox Sales",
            backgroundColor: "#FFA726",
            data: xboxData,
          },
        ],
      });
    } else if (
      filter == "SG" ||
      filter == "MY" ||
      filter == "TW" ||
      filter == "HK"
    ) {
      currData.forEach((element) => {
        chartLabels.push(moment(element.date).format("DD-MM-YYYY"));

        var currPC = 0;
        var currPS = 0;
        var currXBOX = 0;

        if (filter == "SG" || filter == "MY") {
          var start, end;
          if (filter == "SG") {
            start = 0;
            end = 7;
          } else {
            start = 7;
            end = 17;
          }
          for (var i = start; i < end; i++) {
            currPC += parseInt(element[pcKeys[i]]);
            currPS += parseInt(element[psKeys[i]]);
            currXBOX += parseInt(element[xboxKeys[i]]);
          }
        } else {
          var startPC, endPC, startConsole, endConsole;
          if (filter == "TW") {
            startPC = 17;
            endPC = 27;
            startConsole = 17;
            endConsole = 20;
          } else {
            startPC = 27;
            endPC = 29;
            startConsole = 20;
            endConsole = 22;
          }

          for (var i = startPC; i < endPC; i++) {
            currPC += parseInt(element[pcKeys[i]]);
          }
          for (var i = startConsole; i < endConsole; i++) {
            currPS += parseInt(element[psKeys[i]]);
            currXBOX += parseInt(element[xboxKeys[i]]);
          }
        }
        pcData.push(currPC);
        psData.push(currPS);
        xboxData.push(currXBOX);
      });

      // set the labels for the chart
      setChartAllData({
        labels: chartLabels,
        datasets: [
          {
            label: "PC Sales",
            backgroundColor: "#42A5F5",
            data: pcData,
          },
          {
            label: "PS Sales",
            backgroundColor: "#66BB6A",
            data: psData,
          },
          {
            label: "Xbox Sales",
            backgroundColor: "#FFA726",
            data: xboxData,
          },
        ],
      });
    } else {
      currData.forEach((element) => {
        chartLabels.push(moment(element.date).format("DD-MM-YYYY"));

        var pcKeysIndex = pcKeys.findIndex((element) =>
          element.includes(filter)
        );

        var currPC = pcKeysIndex == -1 ? 0 : element[pcKeys[pcKeysIndex]];

        var psKeysIndex = psKeys.findIndex((element) =>
          element.includes(filter)
        );

        var currPS = psKeysIndex == -1 ? 0 : element[psKeys[psKeysIndex]];

        var xboxKeysIndex = psKeys.findIndex((element) =>
          element.includes(filter)
        );

        var currXBOX =
          xboxKeysIndex == -1 ? 0 : element[xboxKeys[xboxKeysIndex]];

        pcData.push(currPC);
        psData.push(currPS);
        xboxData.push(currXBOX);
      });

      // set the labels for the chart
      setChartAllData({
        labels: chartLabels,
        datasets: [
          {
            label: "PC Sales",
            backgroundColor: "#42A5F5",
            data: pcData,
          },
          {
            label: "PS Sales",
            backgroundColor: "#66BB6A",
            data: psData,
          },
          {
            label: "Xbox Sales",
            backgroundColor: "#FFA726",
            data: xboxData,
          },
        ],
      });
    }
  };

  let stackedOptions = {
    tooltips: {
      mode: "index",
      intersect: false,
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: "#495057",
          },
          gridLines: {
            color: "#ebedef",
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: "#495057",
          },
          gridLines: {
            color: "#ebedef",
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: "#495057",
      },
    },
  };

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
          //setCurrData(data);
          return response.json();
        }
      );

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
          <div className="p-d-flex p-jc-between">
            <h5>buy2077.co - Number of copies sold</h5>
            <Dropdown
              style={{ width: "150px" }}
              value={filterValue}
              options={filterItems}
              onChange={(e) => {
                setFilterValue(e.value);
                createBarChart(e.value);
              }}
              optionLabel="label"
              itemTemplate={optionTemplate}
            />
          </div>
          <Chart type="bar" data={chartAllData} options={stackedOptions} />
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
