import moment from "moment";

export const createDouChart = (currData, filter, setData, version) => {
  var chartLabels = ["SG", "MY", "TW", "HK"];

  var keys = Object.keys(currData[0]);

  var finalData = [];
  console.log(keys);
  if (version == 0) {
    chartLabels = ["SG", "MY", "TW", "HK"];

    var newKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc") || key.includes("ps4") || key.includes("xbox"))
        newKeys.push(key);
    });
    console.log(newKeys);

    var currSG = 0;
    var currMY = 0;
    var currTW = 0;
    var currHK = 0;
    currData.forEach((element) => {
      for (var i = 0; i < 21; i++) {
        currSG += parseInt(element[newKeys[i]]);
      }
      for (var i = 21; i < 51; i++) {
        currMY += parseInt(element[newKeys[i]]);
      }
      for (var i = 51; i < 67; i++) {
        currTW += parseInt(element[newKeys[i]]);
      }
      for (var i = 67; i < 73; i++) {
        currHK += parseInt(element[newKeys[i]]);
      }
    });

    finalData = [currSG, currMY, currTW, currHK];
  } else if (version == 1) {
    chartLabels = ["SG", "MY", "TW", "HK"];

    var newKeys = [];
    keys.forEach((key) => {
      if (key.includes("pc") || key.includes("ps4") || key.includes("xbox"))
        newKeys.push(key);
    });
    console.log(newKeys);

    var currSG = 0;
    var currMY = 0;
    var currTW = 0;
    var currHK = 0;
    currData.forEach((element) => {
      for (var i = 0; i < 21; i++) {
        var key = newKeys[i];
        if (key.includes("pc")) currSG += parseInt(element[key]) * 69 * 0.74;
        else if (key.includes("ps4"))
          currSG += parseInt(element[key]) * 79 * 0.74;
        else if (key.includes("xbox"))
          currSG += parseInt(element[key]) * 79 * 0.74;
      }
      for (var i = 21; i < 51; i++) {
        var key = newKeys[i];
        if (key.includes("pc"))
          currMY += parseInt(element[key]) * 219 * 0.24309;
        else if (key.includes("ps4"))
          currMY += parseInt(element[key]) * 259 * 0.24309;
        else if (key.includes("xbox"))
          currMY += parseInt(element[key]) * 259 * 0.24309;
      }
      for (var i = 51; i < 67; i++) {
        var key = newKeys[i];
        if (key.includes("pc")) currTW += parseInt(element[key]) * 1690 * 0.04;
        else if (key.includes("ps4"))
          currTW += parseInt(element[key]) * 1890 * 0.04;
        else if (key.includes("xbox"))
          currTW += parseInt(element[key]) * 1890 * 0.04;
      }
      for (var i = 67; i < 73; i++) {
        var key = newKeys[i];
        if (key.includes("pc")) currHK += parseInt(element[key]) * 146 * 0.13;
        else if (key.includes("ps4"))
          currHK += parseInt(element[key]) * 249 * 0.13;
        else if (key.includes("xbox"))
          currHK += parseInt(element[key]) * 249 * 0.13;
      }
    });

    finalData = [currSG, currMY, currTW, currHK];
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
        } else if (filter == "SG") {
          if (index < 7) currPC += parseInt(element[key]);
        } else if (filter == "MY") {
          if (index >= 7 && index < 17) currPC += parseInt(element[key]);
        } else if (filter == "TW") {
          if (index >= 17 && index < 27) currPC += parseInt(element[key]);
        } else if (filter == "HK") {
          if (index >= 27 && index < 29) currPC += parseInt(element[key]);
        } else {
          if (key.includes(filter)) currPC += parseInt(element[key]);
        }
      });
      psKeys.forEach((key, index) => {
        if (filter == "ALL") {
          currPS += parseInt(element[key]);
        } else if (filter == "SG") {
          if (index < 7) currPS += parseInt(element[key]);
        } else if (filter == "MY") {
          if (index >= 7 && index < 17) currPS += parseInt(element[key]);
        } else if (filter == "TW") {
          if (index >= 17 && index < 20) currPS += parseInt(element[key]);
        } else if (filter == "HK") {
          if (index >= 20 && index < 22) currPS += parseInt(element[key]);
        } else {
          if (key.includes(filter)) currPS += parseInt(element[key]);
        }
      });

      xboxKeys.forEach((key, index) => {
        if (filter == "ALL") {
          currXBOX += parseInt(element[key]);
        } else if (filter == "SG") {
          if (index < 7) currXBOX += parseInt(element[key]);
        } else if (filter == "MY") {
          if (index >= 7 && index < 17) currXBOX += parseInt(element[key]);
        } else if (filter == "TW") {
          if (index >= 17 && index < 20) currXBOX += parseInt(element[key]);
        } else if (filter == "HK") {
          if (index >= 20 && index < 22) currXBOX += parseInt(element[key]);
        } else {
          if (key.includes(filter)) currXBOX += parseInt(element[key]);
        }
      });
    });
    finalData = [currPC, currPS, currXBOX];
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
        } else if (filter == "SG") {
          if (index < 7) currPC += parseInt(element[key]) * 69 * 0.74;
        } else if (filter == "MY") {
          if (index >= 7 && index < 17)
            currPC += parseInt(element[key]) * 219 * 0.24309;
        } else if (filter == "TW") {
          if (index >= 17 && index < 27)
            currPC += parseInt(element[key]) * 1690 * 0.04;
        } else if (filter == "HK") {
          if (index >= 27 && index < 29)
            currPC += parseInt(element[key]) * 146 * 0.13;
        } else {
          if (key.includes(filter)) {
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
          }
        }
      });
      psKeys.forEach((key, index) => {
        if (filter == "ALL") {
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
        } else if (filter == "SG") {
          if (index < 7) currPS += parseInt(element[key]) * 79 * 0.74;
        } else if (filter == "MY") {
          if (index >= 7 && index < 17)
            currPS += parseInt(element[key]) * 259 * 0.24309;
        } else if (filter == "TW") {
          if (index >= 17 && index < 20)
            currPS += parseInt(element[key]) * 1890 * 0.04;
        } else if (filter == "HK") {
          if (index >= 20 && index < 22)
            currPS += parseInt(element[key]) * 249 * 0.13;
        } else {
          if (key.includes(filter)) {
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
          }
        }
      });

      xboxKeys.forEach((key, index) => {
        if (filter == "ALL") {
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
        } else if (filter == "SG") {
          if (index < 7) currXBOX += parseInt(element[key]) * 79 * 0.74;
        } else if (filter == "MY") {
          if (index >= 7 && index < 17)
            currXBOX += parseInt(element[key]) * 259 * 0.24309;
        } else if (filter == "TW") {
          if (index >= 17 && index < 20)
            currXBOX += parseInt(element[key]) * 1890 * 0.04;
        } else if (filter == "HK") {
          if (index >= 20 && index < 22)
            currXBOX += parseInt(element[key]) * 249 * 0.13;
        } else {
          if (key.includes(filter)) {
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
          }
        }
      });
    });
    finalData = [currPC, currPS, currXBOX];
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
