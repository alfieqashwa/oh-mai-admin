import moment from "moment";

/**
 * Daily price function
 * To display the revenue of each day.
 * @param {*} setPrice function to set price
 * @param {*} data sql data for manipulation
 */
export function dailyPrice(setPrice, data) {
  setPrice(0);
  if (data) {
    var currentPrice = 0;
    data.forEach((element) => {
      if (element.order_status == "successful") currentPrice += element.price;
      // var str = moment(element.order_datetime);

      // var today = moment();
      // if (today.isSame(str, "day")) {
      //   if (element.order_status == "successful") currentPrice += element.price;
      // }
    });
    setPrice(currentPrice);
  }
}

/**
 * Initialize bar chart with our data
 * @param {*} setChartAllData function to set the labels and datasets of the bar chart
 * @param {*} data sql data for manipulation
 */
export const initBarChart = (setChartAllData, data, filter, revenue) => {
  var allDates = {};
  var chartData = [];
  var psData = [];
  var xboxData = [];
  var chartLabels = [];

  if (data) {
    //Get all dates in interval and set it to 0
    var enddate = moment().startOf("day");

    var startdate = data[data.length - 1].order_datetime;

    // If you want an inclusive end date (fully-closed interval)
    for (
      var m = moment(startdate).startOf("day");
      m.isSameOrBefore(enddate);
      m.add(1, "days")
    ) {
      allDates[m.format("DD-MM-YYYY")] = {
        name: m.format("DD-MM-YYYY"),
        sales: 0,
        psSales: 0,
        xboxSales: 0,
      };
    }

    // update the sale number of days which have sales
    data.forEach((element) => {
      var dateString = moment(element.order_datetime).format("DD-MM-YYYY");
      if (element.order_status == "successful") {
        if (filter == "ALL" || element.kol == filter) {
          if (element.platform == "PC") {
            allDates[dateString].sales++;
          } else if (element.platform == "PS4") {
            allDates[dateString].psSales++;
          } else if (element.platform == "XBOX") {
            allDates[dateString].xboxSales++;
          }
        }
      }
    });

    // push it into the charts
    for (var key in allDates) {
      var label = allDates[key].name;
      var sales = allDates[key].sales;
      var psSales = allDates[key].psSales;
      var xboxSales = allDates[key].xboxSales;

      if (revenue) {
        sales *= 1790;
        psSales *= 1890;
        xboxSales *= 1890;
      }

      chartLabels.push(label);

      chartData.push(sales);
      psData.push(psSales);
      xboxData.push(xboxSales);
    }

    // set the labels for the chart
    setChartAllData({
      labels: chartLabels,
      datasets: [
        {
          label: "PC Sales",
          backgroundColor: "#42A5F5",
          data: chartData,
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

export let chartOptions = {
  aspectRatio: 2,
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  animation: {
    duration: 0, // general animation time
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
          beginAtZero: true,
        },
      },
    ],
  },
};

export let chartMobileOptions = {
  aspectRatio: 1.3,
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  animation: {
    duration: 0, // general animation time
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
          beginAtZero: true,
        },
      },
    ],
  },
};

export let chartPriceOptions = {
  aspectRatio: 2,
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  animation: {
    duration: 0, // general animation time
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
          beginAtZero: true,
          callback: function (value, index, values) {
            return new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    ],
  },
};

export let chartMobilePriceOptions = {
  aspectRatio: 1.3,
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  animation: {
    duration: 0, // general animation time
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#495057",
          beginAtZero: true,
          callback: function (value, index, values) {
            return new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    ],
  },
};

export const initPieChart = (setChartAllData, data) => {
  var chartData = 0;
  var psData = 0;
  var xboxData = 0;

  // update the sale number of days which have sales
  data.forEach((element) => {
    if (element.order_status == "successful") {
      if (element.platform == "PC") {
        chartData++;
      } else if (element.platform == "PS4") {
        psData++;
      } else if (element.platform == "XBOX") {
        xboxData++;
      }
    }
  });

  // set the labels for the chart
  setChartAllData({
    labels: ["PC", "PS", "XBOX"],
    datasets: [
      {
        data: [chartData, psData, xboxData],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
      },
    ],
  });
};
export const pieOptions = {
  legend: {
    labels: {
      fontColor: "#495057",
    },
  },
  animation: {
    duration: 0, // general animation time
  },
};

export const initBarKOLChart = (setChartAllData, data) => {
  var chartData = 0;
  var psData = 0;
  var xboxData = 0;

  var currData = {
    Chickenshow: 0,
    Cyberclasher: 0,
    "Gladiuz KB": 0,
    Gufunnarock: 0,
    "Hua Hed": 0,
    "Mixed KOL": 0,
    "Boung Lengame": 0,
    "Gamer Live TV": 0,
    "Hon BoYa": 0,
    "Jai Raw": 0,
    Julio: 0,
    SheapGamer: 0,
    Tanny: 0,
    "Yoshi Minburi": 0,
    TGMT: 0,
  };

  // update the sale number of days which have sales
  data.forEach((element) => {
    if (element.order_status == "successful") {
      currData[element.kol]++;
    }
  });

  //console.log(currData["Cyberclasher"]);
  // set the labels for the chart
  setChartAllData({
    labels: [
      "Chickenshow",
      "Cyberclasher",
      "Gladiuz KB",
      "Gufunnarock",
      "Hua Hed",
      "Mixed KOL",
      "Boung Lengame",
      "Gamer Live TV",
      "Hon BoYa",
      "Jai Raw",
      "Julio",
      "SheapGamer",
      "Tanny",
      "Yoshi Minburi",
      "TGMT",
    ],

    datasets: [
      {
        label: "Copies Sold",
        backgroundColor: [
          "#EC407A",
          "#AB47BC",
          "#42A5F5",
          "#7E57C2",
          "#66BB6A",
          "#FFCA28",
          "#26A69A",
          "#461697",
          "#bb9ead",
          "#09f0e4",
          "#69c58b",
          "#9d8e88",
          "#83ddf6",
          "#2a1d1d",
          "#333333",
        ],
        data: [
          currData["Chickenshow"],
          currData["Cyberclasher"],
          currData["Gladiuz KB"],
          currData["Gufunnarock"],
          currData["Hua Hed"],
          currData["Mixed KOL"],
          currData["Boung Lengame"],
          currData["Gamer Live TV"],
          currData["Hon BoYa"],
          currData["Jai Raw"],
          currData["Julio"],
          currData["SheapGamer"],
          currData["Tanny"],
          currData["Yoshi Minburi"],
          currData["TGMT"],
        ],
      },
    ],
  });
};
