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
      var str = moment(element.order_datetime);

      var today = moment();
      if (today.isSame(str, "day")) {
        currentPrice += element.price;
      }
    });
    setPrice(currentPrice);
  }
}

/**
 * Initialize bar chart with our data
 * @param {*} setChartAllData function to set the labels and datasets of the bar chart
 * @param {*} data sql data for manipulation
 */
export const initBarChart = (setChartAllData, data) => {
  var allDates = {};
  var chartData = [];
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
      };
    }

    // update the sale number of days which have sales
    data.forEach((element) => {
      var dateString = moment(element.order_datetime).format("DD-MM-YYYY");
      if (element.order_status == "successful") allDates[dateString].sales++;
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

export let chartOptions = {
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
          beginAtZero: true,
        },
      },
    ],
  },
};
