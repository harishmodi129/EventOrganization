import "./App.css";
import React, { useState, useEffect } from "react";

import { curveCardinal } from "d3-shape";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";

function App() {
  const [dataCollection, setDataCollection] = useState([]);

  const graphData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/getdata");
      setDataCollection(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  console.log(dataCollection);

  useEffect(() => {
    graphData();
  }, []);

  const processDataForPieChart = (data) => {
    const categoryCount = data.reduce((acc, item) => {
      const category = item?.alert?.category;
      if (acc[category]) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});
    return Object.keys(categoryCount).map((key) => ({
      name: key,
      value: categoryCount[key],
    }));
  };

  const pieChartData = processDataForPieChart(dataCollection);

  const cardinal = curveCardinal.tension(0.2);

  return (
    <>
      <div className="App">
        <h1 style={{ color: "white" }}>Line chart Exmaple</h1>
        <div style={{ width: "100%", height: "100vh" }}>
          {dataCollection && dataCollection.length > 0 && (
            <ResponsiveContainer width="60%" height="80%">
              <LineChart
                width={800}
                height={600}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                data={dataCollection}
              >
                <Line
                  type="linear"
                  dataKey="flow_id"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <XAxis dataKey="flow_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid type="linear" />

                <Line type="linear" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div style={{ width: "100%", height: "100vh", background: "black" }}>
        <h2 style={{ color: "white" }}>pie chart</h2>
        {pieChartData && pieChartData.length > 0 && (
          <ResponsiveContainer width="60%" height="80%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                cx="60%"
                cy="60%"
                fill="#8884d8"
                outerRadius={150}
                data={pieChartData}
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div style={{ width: "100%", height: "100vh", background: "black" }}>
        <h2 style={{ color: "white" }}>Area chart </h2>
        <ResponsiveContainer width="60%" height="80%">
          <AreaChart
            width={500}
            height={400}
            data={dataCollection}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="src_port" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="src_port"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
            <Area
              type={cardinal}
              dataKey="src_port"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "black",
          padding: "1rem",
        }}
      >
        <h2 style={{ color: "white" }}> Tiny area chart</h2>
        <ResponsiveContainer width="80%" height="70%">
          <AreaChart
            width={200}
            height={60}
            data={dataCollection}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <Area
              type="monotone"
              dataKey="src_port"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default App;
