import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/fake_survey_data_test.csv?url";

const BarChart = () => {
  const [variable, setVariable] = useState("media_consumption");
  const [data, setData] = useState(null);
  const [values, setValues] = useState([]); // State to hold processed data
  const chartRef = useRef(null);

  const colors = {
    media_consumption: "#F8AD1A",
    religious_activity: "#F6810C",
    financial_vulnerability: "#E34D20",
    mental_stress: "#AA2243",
    loneliness: "#6C0D59",
    education: "#3F0059",
  };

  useEffect(() => {
    d3.csv(dataUrl)
      .then((csv_data) => setData(csv_data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (data !== null) {
      const years = [...new Set(data.map((item) => item.year))];
      const newValues = years.map((year) => ({
        year: year,
        generations: [1, 2, 3, 4].map((gen) => {
          const row = data.find(
            (d) => d.year === year && d.generation === gen.toString()
          );
          return row ? Number(row[variable]) : null;
        }),
      }));
      setValues(newValues);
    }
  }, [data, variable]);

  useEffect(() => {
    if (!values.length) return; // Do nothing if values are not set
  
    const svg = d3.select(chartRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    const x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(values.map(d => d.year));
  
    const x1 = d3.scaleBand()
      .padding(0.05)
      .domain(["generation1", "generation2", "generation3", "generation4"])
      .rangeRound([0, x0.bandwidth()]);
  
    const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(values, d => d3.max(d.generations))]);
  
    const z = d3
      .scaleOrdinal()
      .range(["#7b6888", "#6b486b", "#a05d56", "#d0743c"]);
  
    const xAxis = d3.axisBottom(x0);
    const yAxis = d3.axisLeft(y);
  
    // Set up the axes if they're not already present
    svg.selectAll(".axis").data([0]).enter().append("g").attr("class", "x axis");
    svg.selectAll(".y.axis").data([0]).enter().append("g").attr("class", "y axis");
  
    // Transition the Axis
    svg.select(".x.axis")
      .attr("transform", `translate(${margin.left},${height})`)
      .transition()
      .duration(1000)
      .call(xAxis);
  
    svg.select(".y.axis")
      .attr("transform", `translate(${margin.left})`)
      .transition()
      .duration(1000)
      .call(yAxis);
  
    // Bind data to groups for each year
    const yearGroups = svg.selectAll("g.year-group")
      .data(values, d => d.year);
  
    // Enter new groups
    const yearGroupsEnter = yearGroups.enter().append("g")
      .attr("class", "year-group")
      .attr("transform", d => `translate(${x0(d.year) + margin.left},0)`);
  
    // Update existing groups
    yearGroups.transition()
      .duration(4000)
      .attr("transform", d => `translate(${x0(d.year) + margin.left},0)`);
  
    yearGroups.exit().remove();
  
    // Bind data to rectangles within each group
    const bars = yearGroups.merge(yearGroupsEnter).selectAll("rect")
      .data(d => d.generations.map((value, index) => ({ index, value })));
  
    // Enter new bars
    bars.enter().append("rect")
      .attr("x", d => x1(`generation${d.index + 1}`))
      .attr("width", x1.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", (d) => z(d.index))
      .merge(bars) // Update existing bars
      .transition()
      .duration(1000)
      .attr("y", d => y(d.value))
      .attr("height", d => height - y(d.value));
  
    bars.exit().transition().duration(1000)
      .attr("y", height)
      .attr("height", 0)
      .remove();
  
  }, [values, variable]);
  
  return (
    <div className="flex-col justify-center">
      <div className="flex gap-x-3 mb-4">
        {Object.keys(colors).map((variable) => (
          <button
            key={variable}
            style={{ backgroundColor: `${colors[variable]}`, color: "white" }}
            className="text-white font-bold py-2 px-4 rounded"
            onClick={() => setVariable(variable)}
          >
            {variable.replace("_", " ")}
          </button>
        ))}
      </div>
      <svg ref={chartRef} width="960" height="550"></svg>
    </div>
  );
};

export default BarChart;
