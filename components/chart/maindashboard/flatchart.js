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
import moment from "moment";

export const createTotalChart = (currData, setTotalNum, isPrice) => {
  var newKeys = [];
  var keys = Object.keys(currData[0]);
  keys.forEach((key) => {
    if (key.includes("pc") || key.includes("ps4") || key.includes("xbox"))
      newKeys.push(key);
  });

  var totalValue = 0;
  currData.forEach((element) => {
    newKeys.forEach((key) => {
      if (!isPrice) totalValue += parseInt(element[key]);
      else {
        if (key.includes("sg")) {
          if (key.includes("pc"))
            totalValue += parseInt(element[key]) * priceSGPC;
          else totalValue += parseInt(element[key]) * priceSGConsole;
        }
        if (key.includes("my")) {
          if (key.includes("pc"))
            totalValue += parseInt(element[key]) * priceMYPC;
          else totalValue += parseInt(element[key]) * priceMYConsole;
        }
        if (key.includes("tw")) {
          if (key.includes("pc"))
            totalValue += parseInt(element[key]) * priceTWPC;
          else totalValue += parseInt(element[key]) * priceTWConsole;
        }
        if (key.includes("hk")) {
          if (key.includes("pc"))
            totalValue += parseInt(element[key]) * priceHKPC;
          else totalValue += parseInt(element[key]) * priceHKConsole;
        }
      }
    });
  });

  setTotalNum(totalValue);
};

export const createDailyChart = (currData, setTotalNum, isPrice, setDate) => {
  var newKeys = [];
  var total = 0;
  var keys = Object.keys(currData[0]);
  keys.forEach((key) => {
    if (!isPrice) {
      if (key.includes("pc") || key.includes("ps4") || key.includes("xbox")) {
        total += parseInt(currData[currData.length - 1][key]);
      }
    } else {
      if (key.includes("sg")) {
        if (key.includes("pc"))
          total += parseInt(currData[currData.length - 1][key]) * priceSGPC;
        else
          total +=
            parseInt(currData[currData.length - 1][key]) * priceSGConsole;
      }
      if (key.includes("my")) {
        if (key.includes("pc"))
          total += parseInt(currData[currData.length - 1][key]) * priceMYPC;
        else
          total +=
            parseInt(currData[currData.length - 1][key]) * priceMYConsole;
      }
      if (key.includes("tw")) {
        if (key.includes("pc"))
          total += parseInt(currData[currData.length - 1][key]) * priceTWPC;
        else
          total +=
            parseInt(currData[currData.length - 1][key]) * priceTWConsole;
      }
      if (key.includes("hk")) {
        if (key.includes("pc"))
          total += parseInt(currData[currData.length - 1][key]) * priceHKPC;
        else
          total +=
            parseInt(currData[currData.length - 1][key]) * priceHKConsole;
      }
    }
  });
  setDate(moment(currData[currData.length - 1].date).format("DD-MM-YYYY"));
  setTotalNum(total);
};
