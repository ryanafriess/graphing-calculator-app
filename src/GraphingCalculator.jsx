import React, { useState } from "react";
import Plot from "react-plotly.js";
import nerdamer from "nerdamer/all";

const GraphingCalculator = () => {
  const [expression, setExpression] = useState("");
  const [data, setData] = useState([]);
  const [minValue, setMinValue] = useState("-10");
  const [maxValue, setMaxValue] = useState("10")

  const plotGraph = () => {
    try {
    const xValues = Array.from({ length: 200 }, (_, i) => parseFloat(minValue) + (i * (parseFloat(maxValue) - parseFloat(minValue))) / 199);          
      const parsedFunction = nerdamer(expression).buildFunction(["x"]);
      const yValues = xValues.map((x) => parsedFunction(x));

      setData([{ x: xValues, y: yValues, type: "scatter", mode: "lines", marker: { color: "blue" } }]);
    } catch (error) {
      alert("Invalid function error");
    }
  };

  return (
    <div className="p-4 text-center">
      <h1>Graphing Calculator</h1>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter function"
        className="border p-2"
      />
      <button onClick={plotGraph} className="bg-blue-500 text-white p-2 ml-2">
        Plot
      </button>
      <br></br>
      <input
        type="number"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        placeholder="Enter min value"
        className="border p-2 ml-2"
      />
      <input
        type="number"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        placeholder="Enter max value"
        className="border p-2 ml-2"
      />
      
      {/* <Plot data={data} layout={{ title: "Graph", xaxis: { range: [parseFloat(minValue), parseFloat(maxValue)] }, yaxis: { range: [-10, 10] } }} /> */}
      <Plot data={data} layout={{ title: "Graph", xaxis: { range: [parseFloat(minValue), parseFloat(maxValue)] }, yaxis: { range: [-10, 10] } }} />

    </div>
  );
};

export default GraphingCalculator;
