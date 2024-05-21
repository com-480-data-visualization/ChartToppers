import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/figure_3.csv?url";

const GraphTest = () => {
  const d3Container = useRef(null);
  const [variable, setVariable] = useState("stress");
  const [data, setData] = useState([]);
  const [means, setMeans] = useState({ meanMen: 0, meanWomen: 0 });
  const [selectedYear, setSelectedYear] = useState("2020");

  // Fetch and parse the CSV data
  useEffect(() => {
    d3.csv(dataUrl).then((data) => {
      // Process data here, filter by year 2002
      const processedData = data
        .filter((d) => d.year === selectedYear && d.country !== "AGGREGATE")
        .map((d) => ({
          country: d.country,
          blueValue: +d[`${variable}_men`],
          yellowValue: +d[`${variable}_woman`],
          difference: Math.abs(+d[`${variable}_woman`] - +d[`${variable}_men`]), // Calculate difference
        }))
        .sort((a, b) => b.difference - a.difference); // Sort by difference

      setData(processedData);

      // Calculate the means
      const aggregateData = data.find(
        (d) => d.country === "AGGREGATE" && d.year === selectedYear
      );
      if (aggregateData) {
        setMeans({
          meanMen: +aggregateData[`${variable}_men`],
          meanWomen: +aggregateData[`${variable}_woman`],
        });
      }
    });
  }, [variable, selectedYear]);

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

      const transitionDuration = 750;

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

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
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "2");

      svg
        .selectAll("path")
        .exit()
        .transition()
        .duration(transitionDuration)
        .style("opacity", 0)
        .remove();

      // Add lines between blue and yellow points for each country
      data.forEach((d) => {
        svg
          .append("path")
          .datum([
            { country: d.country, value: d.blueValue },
            { country: d.country, value: d.yellowValue },
          ])
          .attr(
            "d",
            d3
              .line()
              .x((d) => xScale(d.value))
              .y((d) => yScale(d.country))
          )
          .attr("stroke", "black")
          .attr("fill", "none")
          .style("opacity", 0)
          .transition()
          .duration(transitionDuration)
          .style("opacity", 1);
      });

      svg
        .append("line")
        .attr("x1", xScale(means.meanMen))
        .attr("x2", xScale(means.meanMen))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "purple")
        .attr("stroke-width", 3); // Thicker line without dashes

      svg
        .append("line")
        .attr("x1", xScale(means.meanWomen))
        .attr("x2", xScale(means.meanWomen))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "orange")
        .attr("stroke-width", 3); // Thicker line without dashes

      // Blue dots selection
      const blueDots = svg.selectAll(".dot.blue").data(data, (d) => d.country);

      // Exit
      blueDots
        .exit()
        .transition()
        .duration(transitionDuration)
        .attr("cx", xScale(0))
        .style("opacity", 0)
        .remove();

      // Enter
      blueDots
        .enter()
        .append("circle")
        .attr("class", "dot blue")
        .attr("cx", (d) => xScale(d.blueValue))
        .attr("cy", (d) => yScale(d.country))
        .attr("r", 10)
        .attr("fill", "#613C8E")
        .style("opacity", 0)
        .transition()
        .duration(transitionDuration)
        .style("opacity", 1);

      const yellowDots = svg
        .selectAll(".dot.yellow")
        .data(data, (d) => d.country);

      // Exit
      yellowDots
        .exit()
        .transition()
        .duration(transitionDuration)
        .attr("cx", xScale(0))
        .style("opacity", 0)
        .remove();

      // Enter
      yellowDots
        .enter()
        .append("circle")
        .attr("class", "dot yellow")
        .attr("cx", (d) => xScale(d.yellowValue))
        .attr("cy", (d) => yScale(d.country))
        .attr("r", 10)
        .attr("fill", "#f39a59")
        .style("opacity", 0)
        .transition()
        .duration(transitionDuration)
        .style("opacity", 1);
    }
  }, [data, means]);

  return (
    <div className="flex-col justify-center">
      <svg ref={d3Container} />
      <div className="flex gap-x-3 mb-4">
        {[
          "stress",
          "media",
          "internet",
          "relig",
          "social",
          "finvul",
          "ideological",
          "trust",
        ].map((v) => (
          <button
            key={v}
            onClick={() => setVariable(v)}
            className="text-white font-bold py-2 px-4 rounded"
            style={{ backgroundColor: "#555" }}
          >
            {v.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GraphTest;
