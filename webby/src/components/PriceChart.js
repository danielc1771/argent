import React from "react";
let ZingChart = require("zingchart-react").core;

function parseData(data) {
  let transformedData = data.map(x => {
    return [new Date(x.timestamp).getTime(), +x.price];
  });
  return transformedData;
}
function drawChart(parsedData) {
  console.log(parsedData);
  let config = {
    type: "line",
    backgroundColor: "#f9fdff",
    title: {
      text: "Price History"
    },
    plot: {
      tooltip: {
        visible: false
      }
    },
    scaleX: {
      lineColor: "#E3E3E5",
      transform: {
        type: "date",
        all: "%M %d %Y"
      }
    },
    crosshairX: {
      lineColor: "none",
      plotLabel: {
        borderRadius: "3px",
        multiple: true,
        text: "$%v - %kl"
      },
      scaleLabel: {
        visible: false
      }
    },
    marker: {
      visible: false
    },
    series: [{ text: "Price", values: parsedData }]
  };
  return <ZingChart id="price-chart" height="500" width="100%" data={config} />;
}
function PriceChart(props) {
  let parsedData = parseData(props.data);
  return (
    <div>
      <div style={{ marginTop: "2em" }} id="price-chart" />
      {drawChart(parsedData)}
      <br />
    </div>
  );
}

export default PriceChart;
