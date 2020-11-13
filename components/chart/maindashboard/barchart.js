import moment from "moment";
import {
  priceSGPC,
  priceSGConsole,
  priceMYPC,
  priceMYConsole,
  priceTWPC,
  priceTWConsole,
  priceHKPC,
  priceHKConsole,
} from "./values";

export const createBarChart = (currData, filter, setData, version) => {
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

  //console.log(pcKeys);
  var pcData = [];
  var psData = [];
  var xboxData = [];

  if (filter == "ALL") {
    currData.forEach((element) => {
      chartLabels.push(moment(element.date).format("DD-MM-YYYY"));

      var currPC = 0;
      pcKeys.forEach((key) => {
        if (version == 1) {
          if (key.includes("sg")) currPC += parseInt(element[key]) * priceSGPC;
          if (key.includes("my")) currPC += parseInt(element[key]) * priceMYPC;
          if (key.includes("tw")) currPC += parseInt(element[key]) * priceTWPC;
          if (key.includes("hk")) currPC += parseInt(element[key]) * priceHKPC;
        } else currPC += parseInt(element[key]);
      });
      pcData.push(currPC.toFixed(2));

      var currPS = 0;
      psKeys.forEach((key) => {
        if (version == 1) {
          if (key.includes("sg"))
            currPS += parseInt(element[key]) * priceSGConsole;
          if (key.includes("my"))
            currPS += parseInt(element[key]) * priceMYConsole;
          if (key.includes("tw"))
            currPS += parseInt(element[key]) * priceTWConsole;
          if (key.includes("hk"))
            currPS += parseInt(element[key]) * priceHKConsole;
        } else currPS += parseInt(element[key]);
      });
      psData.push(currPS.toFixed(2));

      var currXBOX = 0;
      xboxKeys.forEach((key) => {
        if (version == 1) {
          if (key.includes("sg"))
            currXBOX += parseInt(element[key]) * priceSGConsole;
          if (key.includes("my"))
            currXBOX += parseInt(element[key]) * priceMYConsole;
          if (key.includes("tw"))
            currXBOX += parseInt(element[key]) * priceTWConsole;
          if (key.includes("hk"))
            currXBOX += parseInt(element[key]) * priceHKConsole;
        } else currXBOX += parseInt(element[key]);
      });
      xboxData.push(currXBOX.toFixed(2));
    });

    // set the labels for the chart
    setData({
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

      pcKeys.forEach((key) => {
        if (key.includes(filter.toLowerCase()))
          currPC += parseInt(element[key]);
      });
      psKeys.forEach((key) => {
        if (key.includes(filter.toLowerCase()))
          currPS += parseInt(element[key]);
      });
      xboxKeys.forEach((key) => {
        if (key.includes(filter.toLowerCase()))
          currXBOX += parseInt(element[key]);
      });

      if (version == 1) {
        switch (filter) {
          case "SG":
            currPC = currPC * priceSGPC;
            currPS = currPS * priceSGConsole;
            currXBOX = currXBOX * priceSGConsole;
            break;
          case "MY":
            currPC = currPC * priceMYPC;
            currPS = currPS * priceMYConsole;
            currXBOX = currXBOX * priceMYConsole;
            break;
          case "TW":
            currPC = currPC * priceTWPC;
            currPS = currPS * priceTWConsole;
            currXBOX = currXBOX * priceTWConsole;
            break;
          case "HK":
            currPC = currPC * priceHKPC;
            currPS = currPS * priceHKConsole;
            currXBOX = currXBOX * priceHKConsole;
            break;
        }
      }
      pcData.push(currPC.toFixed(2));
      psData.push(currPS.toFixed(2));
      xboxData.push(currXBOX.toFixed(2));
    });

    // set the labels for the chart
    setData({
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

      var pcKeysIndex = pcKeys.findIndex((element) => element.includes(filter));

      var currPC = 0;

      if (pcKeysIndex != -1) {
        currPC = element[pcKeys[pcKeysIndex]];
        if (version == 1) {
          if (pcKeys[pcKeysIndex].includes("sg")) currPC *= priceSGPC;
          else if (pcKeys[pcKeysIndex].includes("my")) currPC *= priceMYPC;
          else if (pcKeys[pcKeysIndex].includes("tw")) currPC *= priceTWPC;
          else if (pcKeys[pcKeysIndex].includes("hk")) currPC *= priceHKPC;
        }
      }

      var psKeysIndex = psKeys.findIndex((element) => element.includes(filter));

      var currPS = 0;

      if (psKeysIndex != -1) {
        currPS = element[psKeys[psKeysIndex]];
        if (version == 1) {
          if (psKeys[psKeysIndex].includes("sg")) currPS *= priceSGConsole;
          else if (psKeys[psKeysIndex].includes("my")) currPS *= priceMYConsole;
          else if (psKeys[psKeysIndex].includes("tw")) currPS *= priceTWConsole;
          else if (psKeys[psKeysIndex].includes("hk")) currPS *= priceHKConsole;
        }
      }

      var xboxKeysIndex = psKeys.findIndex((element) =>
        element.includes(filter)
      );

      var currXBOX = 0;

      if (xboxKeysIndex != -1) {
        currXBOX = element[xboxKeys[xboxKeysIndex]];
        if (version == 1) {
          if (xboxKeys[xboxKeysIndex].includes("sg"))
            currXBOX *= priceSGConsole;
          else if (xboxKeys[xboxKeysIndex].includes("my"))
            currXBOX *= priceMYConsole;
          else if (xboxKeys[xboxKeysIndex].includes("tw"))
            currXBOX *= priceTWConsole;
          else if (xboxKeys[xboxKeysIndex].includes("hk"))
            currXBOX *= priceHKConsole;
        }
      }

      pcData.push(currPC.toFixed(2));
      psData.push(currPS.toFixed(2));
      xboxData.push(currXBOX.toFixed(2));
    });

    // set the labels for the chart
    setData({
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

export const stackedOptions = {
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
