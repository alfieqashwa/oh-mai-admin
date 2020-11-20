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

import {
  createTotalChart,
  createDailyChart,
} from "components/chart/maindashboard/flatchart";

import THDashboard from "pages/thbuy2077/dashboard";

export default function Dashboard() {
  return <THDashboard />;
}
