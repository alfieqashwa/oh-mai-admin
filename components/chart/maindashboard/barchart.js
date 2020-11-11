import moment from "moment";

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
          var val = key.replace("_pc", "");
          switch (val) {
            case "jianhao":
            case "debbie":
            case "titangamers":
            case "ridwan":
            case "vincent":
            case "nocmugs":
            case "nocsocks":
              currPC += parseInt(element[key]) * 69 * 0.74;

              break;
            case "yingtze":
            case "laowu":
            case "mobhouse":
            case "flare":
            case "adibalexx":
            case "farhanmzln":
            case "spiderjal":
            case "derezedd":
            case "rezzadude":
            case "luqman":
              currPC += parseInt(element[key]) * 219 * 0.24309;

              break;
            case "貝莉莓":
            case "萊斯":
            case "老皮":
            case "超粒方":
            case "殺梗":
            case "6tan":
            case "魯蛋":
            case "館長":
            case "gooaye":
            case "達哥":
              currPC += parseInt(element[key]) * 1690 * 0.04;

              break;
            case "arhosunny":
            case "gameplayhk":
              currPC += parseInt(element[key]) * 146 * 0.13;

              break;
          }
        } else currPC += parseInt(element[key]);
      });
      pcData.push(currPC);

      var currPS = 0;
      psKeys.forEach((key) => {
        if (version == 1) {
          var val = key.replace("_ps4", "");
          switch (val) {
            case "jianhao":
            case "debbie":
            case "titangamers":
            case "ridwan":
            case "vincent":
            case "nocmugs":
            case "nocsocks":
              currPS += parseInt(element[key]) * 79 * 0.74;

              break;
            case "yingtze":
            case "laowu":
            case "mobhouse":
            case "flare":
            case "adibalexx":
            case "farhanmzln":
            case "spiderjal":
            case "derezedd":
            case "rezzadude":
            case "luqman":
              currPS += parseInt(element[key]) * 259 * 0.24309;

              break;
            case "貝莉莓":
            case "萊斯":
            case "老皮":
            case "超粒方":
            case "殺梗":
            case "6tan":
            case "魯蛋":
            case "館長":
            case "gooaye":
            case "達哥":
              currPS += parseInt(element[key]) * 1890 * 0.04;

              break;
            case "arhosunny":
            case "gameplayhk":
              currPS += parseInt(element[key]) * 249 * 0.13;

              break;
          }
        } else currPS += parseInt(element[key]);
      });
      psData.push(currPS);

      var currXBOX = 0;
      xboxKeys.forEach((key) => {
        if (version == 1) {
          var val = key.replace("_xbox", "");
          switch (val) {
            case "jianhao":
            case "debbie":
            case "titangamers":
            case "ridwan":
            case "vincent":
            case "nocmugs":
            case "nocsocks":
              currXBOX += parseInt(element[key]) * 79 * 0.74;

              break;
            case "yingtze":
            case "laowu":
            case "mobhouse":
            case "flare":
            case "adibalexx":
            case "farhanmzln":
            case "spiderjal":
            case "derezedd":
            case "rezzadude":
            case "luqman":
              currXBOX += parseInt(element[key]) * 259 * 0.24309;

              break;
            case "貝莉莓":
            case "萊斯":
            case "老皮":
            case "超粒方":
            case "殺梗":
            case "6tan":
            case "魯蛋":
            case "館長":
            case "gooaye":
            case "達哥":
              currXBOX += parseInt(element[key]) * 1890 * 0.04;

              break;
            case "arhosunny":
            case "gameplayhk":
              currXBOX += parseInt(element[key]) * 249 * 0.13;

              break;
          }
        } else currXBOX += parseInt(element[key]);
      });
      xboxData.push(currXBOX);
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

      if (version == 1) {
        switch (filter) {
          case "SG":
            currPC = currPC * 69 * 0.74;
            currPS = currPS * 79 * 0.74;
            currXBOX = currXBOX * 79 * 0.74;
            break;
          case "MY":
            currPC = currPC * 219 * 0.24309;
            currPS = currPS * 259 * 0.24309;
            currXBOX = currXBOX * 259 * 0.24309;
            break;
          case "TW":
            currPC = currPC * 1690 * 0.04;
            currPS = currPS * 1890 * 0.04;
            currXBOX = currXBOX * 1890 * 0.04;
            break;
          case "HK":
            currPC = currPC * 146 * 0.13;
            currPS = currPS * 249 * 0.13;
            currXBOX = currXBOX * 249 * 0.13;
            break;
        }
      }
      pcData.push(currPC);
      psData.push(currPS);
      xboxData.push(currXBOX);
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

      var currPC = pcKeysIndex == -1 ? 0 : element[pcKeys[pcKeysIndex]];

      var psKeysIndex = psKeys.findIndex((element) => element.includes(filter));

      var currPS = psKeysIndex == -1 ? 0 : element[psKeys[psKeysIndex]];

      var xboxKeysIndex = psKeys.findIndex((element) =>
        element.includes(filter)
      );

      var currXBOX = xboxKeysIndex == -1 ? 0 : element[xboxKeys[xboxKeysIndex]];

      if (version == 1) {
        switch (filter) {
          case "jianhao":
          case "debbie":
          case "titangamers":
          case "ridwan":
          case "vincent":
          case "nocmugs":
          case "nocsocks":
            currPC = currPC * 69 * 0.74;
            currPS = currPS * 79 * 0.74;
            currXBOX = currXBOX * 79 * 0.74;
            break;
          case "yingtze":
          case "laowu":
          case "mobhouse":
          case "flare":
          case "adibalexx":
          case "farhanmzln":
          case "spiderjal":
          case "derezedd":
          case "rezzadude":
          case "luqman":
            currPC = currPC * 219 * 0.24309;
            currPS = currPS * 259 * 0.24309;
            currXBOX = currXBOX * 259 * 0.24309;
            break;
          case "貝莉莓":
          case "萊斯":
          case "老皮":
          case "超粒方":
          case "殺梗":
          case "6tan":
          case "魯蛋":
          case "館長":
          case "gooaye":
          case "達哥":
            currPC = currPC * 1690 * 0.04;
            currPS = currPS * 1890 * 0.04;
            currXBOX = currXBOX * 1890 * 0.04;
            break;
          case "arhosunny":
          case "gameplayhk":
            currPC = currPC * 146 * 0.13;
            currPS = currPS * 249 * 0.13;
            currXBOX = currXBOX * 249 * 0.13;
            break;
        }
      }

      pcData.push(currPC);
      psData.push(currPS);
      xboxData.push(currXBOX);
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
