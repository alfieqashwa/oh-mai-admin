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

export const createDouChart = (currData, filter, setData, version) => {
  var chartLabels = ["SG", "MY", "TW", "HK"];

  var keys = Object.keys(currData[0]);

  var finalData = [];

  if (version == 0) {
    chartLabels = ["SG", "MY", "TW", "HK"];

    var newKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc") || key.includes("ps4") || key.includes("xbox"))
        newKeys.push(key);
    });

    var currSG = 0;
    var currMY = 0;
    var currTW = 0;
    var currHK = 0;

    currData.forEach((element) => {
      newKeys.forEach((key) => {
        if (key.includes("sg")) currSG += parseInt(element[key]);
        if (key.includes("my")) currMY += parseInt(element[key]);
        if (key.includes("tw")) currTW += parseInt(element[key]);
        if (key.includes("hk")) currHK += parseInt(element[key]);
      });
    });

    finalData = [
      currSG.toFixed(2),
      currMY.toFixed(2),
      currTW.toFixed(2),
      currHK.toFixed(2),
    ];
  } else if (version == 1) {
    chartLabels = ["SG", "MY", "TW", "HK"];

    var newKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc") || key.includes("ps4") || key.includes("xbox"))
        newKeys.push(key);
    });

    var currSG = 0;
    var currMY = 0;
    var currTW = 0;
    var currHK = 0;
    currData.forEach((element) => {
      newKeys.forEach((key) => {
        if (key.includes("sg")) {
          if (key.includes("pc")) currSG += parseInt(element[key]) * priceSGPC;
          else currSG += parseInt(element[key]) * priceSGConsole;
        }
        if (key.includes("my")) {
          if (key.includes("pc")) currMY += parseInt(element[key]) * priceMYPC;
          else currMY += parseInt(element[key]) * priceMYConsole;
        }
        if (key.includes("tw")) {
          if (key.includes("pc")) currTW += parseInt(element[key]) * priceTWPC;
          else currTW += parseInt(element[key]) * priceTWConsole;
        }
        if (key.includes("hk")) {
          if (key.includes("pc")) currHK += parseInt(element[key]) * priceHKPC;
          else currHK += parseInt(element[key]) * priceHKConsole;
        }
      });
    });

    finalData = [
      currSG.toFixed(2),
      currMY.toFixed(2),
      currTW.toFixed(2),
      currHK.toFixed(2),
    ];
  } else if (version == 2) {
    chartLabels = ["PC", "PS", "XBOX"];

    var pcKeys = [];
    var psKeys = [];
    var xboxKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc")) pcKeys.push(key);
      if (key.includes("ps4")) psKeys.push(key);
      if (key.includes("xbox")) xboxKeys.push(key);
    });

    var currPC = 0;
    var currPS = 0;
    var currXBOX = 0;

    currData.forEach((element) => {
      pcKeys.forEach((key, index) => {
        if (filter == "ALL") {
          currPC += parseInt(element[key]);
        } else {
          if (key.includes(filter.toLowerCase()))
            currPC += parseInt(element[key]);
        }
      });
      psKeys.forEach((key, index) => {
        if (filter == "ALL") {
          currPS += parseInt(element[key]);
        } else {
          if (key.includes(filter.toLowerCase()))
            currPS += parseInt(element[key]);
        }
      });

      xboxKeys.forEach((key, index) => {
        if (filter == "ALL") {
          currXBOX += parseInt(element[key]);
        } else {
          if (key.includes(filter.toLowerCase()))
            currXBOX += parseInt(element[key]);
        }
      });
    });
    finalData = [currPC.toFixed(2), currPS.toFixed(2), currXBOX.toFixed(2)];
  } else if (version == 3) {
    chartLabels = ["PC", "PS", "XBOX"];

    var pcKeys = [];
    var psKeys = [];
    var xboxKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc")) pcKeys.push(key);
      if (key.includes("ps4")) psKeys.push(key);
      if (key.includes("xbox")) xboxKeys.push(key);
    });

    var currPC = 0;
    var currPS = 0;
    var currXBOX = 0;

    currData.forEach((element) => {
      pcKeys.forEach((key, index) => {
        if (filter == "ALL") {
          if (key.includes("sg")) currPC += parseInt(element[key]) * priceSGPC;
          if (key.includes("my")) currPC += parseInt(element[key]) * priceMYPC;
          if (key.includes("tw")) currPC += parseInt(element[key]) * priceTWPC;
          if (key.includes("hk")) currPC += parseInt(element[key]) * priceHKPC;
        } else if (filter == "SG") {
          if (key.includes("sg")) currPC += parseInt(element[key]) * priceSGPC;
        } else if (filter == "MY") {
          if (key.includes("my")) currPC += parseInt(element[key]) * priceMYPC;
        } else if (filter == "TW") {
          if (key.includes("tw")) currPC += parseInt(element[key]) * priceTWPC;
        } else if (filter == "HK") {
          if (key.includes("hk")) currPC += parseInt(element[key]) * priceHKPC;
        } else {
          if (key.includes(filter)) {
            if (key.includes("sg"))
              currPC += parseInt(element[key]) * priceSGPC;
            if (key.includes("my"))
              currPC += parseInt(element[key]) * priceMYPC;
            if (key.includes("tw"))
              currPC += parseInt(element[key]) * priceTWPC;
            if (key.includes("hk"))
              currPC += parseInt(element[key]) * priceHKPC;
          }
        }
      });
      psKeys.forEach((key, index) => {
        if (filter == "ALL") {
          if (key.includes("sg"))
            currPS += parseInt(element[key]) * priceSGConsole;
          if (key.includes("my"))
            currPS += parseInt(element[key]) * priceMYConsole;
          if (key.includes("tw"))
            currPS += parseInt(element[key]) * priceTWConsole;
          if (key.includes("hk"))
            currPS += parseInt(element[key]) * priceHKConsole;
        } else if (filter == "SG") {
          if (key.includes("sg"))
            currPS += parseInt(element[key]) * priceSGConsole;
        } else if (filter == "MY") {
          if (key.includes("my"))
            currPS += parseInt(element[key]) * priceMYConsole;
        } else if (filter == "TW") {
          if (key.includes("tw"))
            currPS += parseInt(element[key]) * priceTWConsole;
        } else if (filter == "HK") {
          if (key.includes("hk"))
            currPS += parseInt(element[key]) * priceHKConsole;
        } else {
          if (key.includes(filter)) {
            if (key.includes("sg"))
              currPS += parseInt(element[key]) * priceSGConsole;
            if (key.includes("my"))
              currPS += parseInt(element[key]) * priceMYConsole;
            if (key.includes("tw"))
              currPS += parseInt(element[key]) * priceTWConsole;
            if (key.includes("hk"))
              currPS += parseInt(element[key]) * priceHKConsole;
          }
        }
      });

      xboxKeys.forEach((key, index) => {
        if (filter == "ALL") {
          if (key.includes("sg"))
            currXBOX += parseInt(element[key]) * priceSGConsole;
          if (key.includes("my"))
            currXBOX += parseInt(element[key]) * priceMYConsole;
          if (key.includes("tw"))
            currXBOX += parseInt(element[key]) * priceTWConsole;
          if (key.includes("hk"))
            currXBOX += parseInt(element[key]) * priceHKConsole;
        } else if (filter == "SG") {
          if (key.includes("sg"))
            currXBOX += parseInt(element[key]) * priceSGConsole;
        } else if (filter == "MY") {
          if (key.includes("my"))
            currXBOX += parseInt(element[key]) * priceMYConsole;
        } else if (filter == "TW") {
          if (key.includes("tw"))
            currXBOX += parseInt(element[key]) * priceTWConsole;
        } else if (filter == "HK") {
          if (key.includes("hk"))
            currXBOX += parseInt(element[key]) * priceHKConsole;
        } else {
          if (key.includes(filter)) {
            if (key.includes("sg"))
              currXBOX += parseInt(element[key]) * priceSGConsole;
            if (key.includes("my"))
              currXBOX += parseInt(element[key]) * priceMYConsole;
            if (key.includes("tw"))
              currXBOX += parseInt(element[key]) * priceTWConsole;
            if (key.includes("hk"))
              currXBOX += parseInt(element[key]) * priceHKConsole;
          }
        }
      });
    });
    finalData = [currPC.toFixed(2), currPS.toFixed(2), currXBOX.toFixed(2)];
  }

  setData({
    labels: chartLabels,
    datasets: [
      {
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "black"],
        data: finalData,
      },
    ],
  });
};

export const douOptions = {
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
};
