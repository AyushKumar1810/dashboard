import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { data } from "../data/data.js"; // Import data

// Define a color palette with better contrast for dark backgrounds
const colorPalette = [
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
const processBarData = (data) => {
  const protocolCounts = {};

  data.forEach((entry) => {
    const protocol = entry.proto;
    if (protocolCounts[protocol]) {
      protocolCounts[protocol] += 1;
    } else {
      protocolCounts[protocol] = 1;
    }
  });

  return Object.keys(protocolCounts).map((key) => ({
    protocol: key,
    count: protocolCounts[key],
  }));
};

const MyHorizontalBarChart = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setBarData(processBarData(data));
    }
  }, []);

  return (
    <div
      style={{
        height: 500,
        padding: "20px",
        background: "#1e1e1e",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <ResponsiveBar
        data={barData}
        keys={["count"]}
        indexBy="protocol"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colorPalette}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Count",
          legendPosition: "middle",
          legendOffset: 32,
          tickColor: "#ffffff", // White ticks for dark mode
          legendTextColor: "#ffffff", // White legend text for dark mode
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Protocol",
          legendPosition: "middle",
          legendOffset: -40,
          tickColor: "#ffffff", // White ticks for dark mode
          legendTextColor: "#ffffff", // White legend text for dark mode
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: "12px",
              background: "#222",
              color: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <strong style={{ color }}>{id}</strong>: {value}
          </div>
        )}
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
                  itemTextColor: "#ffffff", // White text on hover
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "#ffffff", // White ticks for dark mode
              },
              text: {
                fill: "#ffffff", // White text for ticks in dark mode
              },
            },
            legend: {
              text: {
                fill: "#ffffff", // White text for legend in dark mode
              },
            },
          },
          labels: {
            text: {
              fill: "#ffffff", // White text for labels in dark mode
            },
          },
          tooltip: {
            container: {
              background: "#333", // Dark background for tooltips
              color: "#fff", // White text for tooltips
              fontSize: "14px",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            },
          },
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default MyHorizontalBarChart;
