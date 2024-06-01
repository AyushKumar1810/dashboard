import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { data } from "../data/data.js";

const darkModeColors = [
  "#cad2c5",
  "#84a98c",
  "#52796f",
  "#354f52",
  "#2f3e46",
  "#3f37c9",
  "#480ca8",
  "#560bad",
  "#7209b7",
  "#b5179e",
];

// Function to process data for bar chart
const processBarChartData = (data) => {
  const alertCategories = {};

  data.forEach((entry) => {
    if (entry.event_type === "alert" && entry.alert && entry.alert.category) {
      const category = entry.alert.category;
      if (alertCategories[category]) {
        alertCategories[category] += 1;
      } else {
        alertCategories[category] = 1;
      }
    }
  });

  return Object.keys(alertCategories).map((key) => ({
    category: key,
    count: alertCategories[key],
  }));
};

const MyBarChart = () => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    setBarChartData(processBarChartData(data));
  }, []);

  return (
    <div style={{ height: 400, width: "70%", margin: "auto" }}>
      <ResponsiveBar
        data={barChartData}
        keys={["count"]}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.65}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "gradient",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "#84a98c" },
              { offset: 100, color: "#354f52" },
            ],
          },
        ]}
        fill={[
          {
            match: "*",
            id: "gradient",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Category",
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Count",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        tooltip={({ id, value, color }) => (
          <strong style={{ color }}>
            {id}: {value}
          </strong>
        )}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          tooltip: {
            container: {
              background: "#333", // Dark background for tooltips
              color: "#fff", // White text for tooltips
              fontSize: "14px",
            },
          },
          axis: {
            ticks: {
              text: {
                fill: "#ffffff", // White text for axes labels in dark mode
              },
            },
            legend: {
              text: {
                fill: "#ffffff", // White text for legends in dark mode
              },
            },
          },
          labels: {
            text: {
              fill: "#ffffff", // White text for labels in dark mode
            },
          },
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyBarChart;
