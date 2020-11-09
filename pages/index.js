import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Dashboard() {
  const carservice = null;

  const [tasks, setTasks] = useState([]);
  const [city, setCity] = useState(null);
  const [cars, setCars] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [lineData, setLineData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "#007be5",
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        borderColor: "#20d077",
      },
    ],
  });
  const [cities, setCities] = useState([
    { label: "New York", value: { id: 1, name: "New York", code: "NY" } },
    { label: "Rome", value: { id: 2, name: "Rome", code: "RM" } },
    { label: "London", value: { id: 3, name: "London", code: "LDN" } },
    { label: "Istanbul", value: { id: 4, name: "Istanbul", code: "IST" } },
    { label: "Paris", value: { id: 5, name: "Paris", code: "PRS" } },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "All Day Event",
      start: "2017-02-01",
    },
    {
      id: 2,
      title: "Long Event",
      start: "2017-02-07",
      end: "2017-02-10",
    },
    {
      id: 3,
      title: "Repeating Event",
      start: "2017-02-09T16:00:00",
    },
    {
      id: 4,
      title: "Repeating Event",
      start: "2017-02-16T16:00:00",
    },
    {
      id: 5,
      title: "Conference",
      start: "2017-02-11",
      end: "2017-02-13",
    },
    {
      id: 6,
      title: "Meeting",
      start: "2017-02-12T10:30:00",
      end: "2017-02-12T12:30:00",
    },
    {
      id: 7,
      title: "Lunch",
      start: "2017-02-12T12:00:00",
    },
    {
      id: 8,
      title: "Meeting",
      start: "2017-02-12T14:30:00",
    },
    {
      id: 9,
      title: "Happy Hour",
      start: "2017-02-12T17:30:00",
    },
    {
      id: 10,
      title: "Dinner",
      start: "2017-02-12T20:00:00",
    },
    {
      id: 11,
      title: "Birthday Party",
      start: "2017-02-13T07:00:00",
    },
    {
      id: 12,
      title: "Click for Google",
      url: "http://google.com/",
      start: "2017-02-28",
    },
  ]);

  const [totalThaiNum, setTotalThaiNum] = useState(0);

  React.useEffect(() => {
    (async function getTotal() {
      await fetch("https://api.buy2077.co/countorders", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTotalThaiNum(data.total);
        });
    })();
  }, []);

  const onTaskChange = (e) => {
    let selectedTasks = [...tasks];
    if (e.checked) selectedTasks.push(e.value);
    else selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

    setTasks(selectedTasks);
  };

  const onCityChange = (e) => {
    setCity(e.value);
  };

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-lg-6">
        <div className="card summary">
          <span className="title">th.buy2077.co Sales</span>
          <span className="detail">Number of purchases</span>
          <span className="count purchases">{totalThaiNum}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <div className="card summary">
          <span className="title">Revenue</span>
          <span className="detail">Income for today</span>
          <span className="count revenue">$0</span>
        </div>
      </div>
    </div>
  );
}
