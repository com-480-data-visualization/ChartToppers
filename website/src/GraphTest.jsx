import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/fake_survey_data_extended.csv?url";

const GraphTest = () => {
  const d3Container = useRef(null);
  const [variable, setVariable] = useState("media_consumption");
  const [data, setData] = useState([]);

  // Fetch and parse the CSV data
  useEffect(() => {
    d3.csv(dataUrl).then((data) => {
      // Process data here, filter by year 2002
      const processedData = data
        .filter(d => d.year === "2002")
        .map(d => ({
          country: d.Country,
          blueValue: +d[`${variable}_men`],
          yellowValue: +d[`${variable}_women`]
        }));
      setData(processedData);
    });
  }, [variable]);

  // Create the graph and update it when the data changes
  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const margin = { top: 20, right: 30, bottom: 40, left: 100 };
      const width = 960 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      // Remove old svg elements
      d3.select(d3Container.current).selectAll("*").remove();

      // Declare image
      const svg = d3
        .select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create scales and the axes
      const xScale = d3.scaleLinear().domain([1, 6]).range([1, width]);
      const yScale = d3
        .scalePoint()
        .domain(data.map((d) => d.country))
        .range([0, height])
        .padding(1);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(-height).tickValues([1, 2, 3, 4, 5, 6]));

      svg.append("g").call(d3.axisLeft(yScale));

      svg
        .selectAll(".grid-line")
        .data(xScale.ticks(6))
        .enter()
        .append("line")
        .attr("class", "grid-line")
        .attr("x1", (d) => xScale(d))
        .attr("x2", (d) => xScale(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "lightgrey")
        .attr("stroke-dasharray", "2");

      // Add lines between blue and yellow points for each country
      data.forEach((d) => {
        svg.append("path")
          .datum([{ country: d.country, value: d.blueValue }, { country: d.country, value: d.yellowValue }])
          .attr("d", d3.line()
            .x(d => xScale(d.value))
            .y(d => yScale(d.country))
          )
          .attr("stroke", "black")
          .attr("fill", "none");
      });

      // Add blue dots
      svg.selectAll(".dot.blue")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot blue")
        .attr("cx", d => xScale(d.blueValue))
        .attr("cy", d => yScale(d.country))
        .attr("r", 10)
        .attr("fill", "blue");

      // Add yellow dots
      svg.selectAll(".dot.yellow")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot yellow")
        .attr("cx", d => xScale(d.yellowValue))
        .attr("cy", d => yScale(d.country))
        .attr("r", 10)
        .attr("fill", "yellow");
    }
  }, [data]);

  return (
    <div className="flex-col justify-center">
      <svg ref={d3Container} />
      <div className="flex gap-x-3 mb-4">
        {["media_consumption", "religious_activity", "financial_vulnerability", "mental_stress", "loneliness", "education"].map(v => (
          <button key={v} onClick={() => setVariable(v)} className="text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: "#555" }}>
            {v.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GraphTest;