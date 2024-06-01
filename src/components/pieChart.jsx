import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
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

const processData = (data) => {
  const eventTypeCounts = {};

  data.forEach((entry) => {
    const eventType = entry.event_type;
    if (eventTypeCounts[eventType]) {
      eventTypeCounts[eventType] += 1;
    } else {
      eventTypeCounts[eventType] = 1;
    }
  });

  return Object.keys(eventTypeCounts).map((key, index) => ({
    id: key,
    label: key,
    value: eventTypeCounts[key],
    color: darkModeColors[index % darkModeColors.length], // Use colors from the darkModeColors array
  }));
};

const MyPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(processData(data));
  }, []);

  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ datum: "data.color" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#ffffff"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#ffffff"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        enableArcLinkLabels={false}
        enableArcLabels
        arcLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        theme={{
          tooltip: {
            container: {
              background: "#333", // Dark background for tooltips
              color: "#fff", // White text for tooltips
              fontSize: "14px",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
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
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#ffffff",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyPieChart;
