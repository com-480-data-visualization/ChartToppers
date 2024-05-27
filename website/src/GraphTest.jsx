import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/figure_3_ordinal.csv?url";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const GraphTest = ({ variable }) => {
  const d3Container = useRef(null);
  const [data, setData] = useState([]);
  const [means, setMeans] = useState({ meanMen: 0, meanWomen: 0 });
  const [selectedYear, setSelectedYear] = useState("2002");

  const buttonTexts = {
    wellbeing: "Wellbeing related text.",
    internet: "Internet related text.",
    relig: "Religion related text.",
    social: "Social related text.",
    finstab: "Financial stability related text.",
    conservatism: "Conservatism related text.",
    anti_imm: "Anti-immigration related text.",
    trust: "Trust related text.",
  };

  const [text, setText] = useState(buttonTexts["wellbeing"]); // State to hold the text

  // Fetch and parse the CSV data
  useEffect(() => {
    d3.csv(dataUrl).then((data) => {
      // Process data here, filter by selected year
      const processedData = data
        .filter(
          (d) =>
            d.year === selectedYear &&
            d.country_full !== "" &&
            d[`${variable}_men`] &&
            d[`${variable}_woman`]
        )
        .map((d) => ({
          country: d.country_full,
          blueValue: +d[`${variable}_men`],
          yellowValue: +d[`${variable}_woman`],
          difference: +d[`${variable}_men`] - +d[`${variable}_woman`],
        }))
        .sort((a, b) => b.difference - a.difference);

      const noData = processedData.length === 0;

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

      // Check for no data condition and handle
      if (noData) {
        d3.select(d3Container.current).selectAll("circle").attr("fill", "grey");

        d3.select(d3Container.current)
          .selectAll("line")
          .attr("stroke", "grey")
          .attr("opacity", 0.3);

        d3.select(d3Container.current)
          .selectAll(".mean-line-text")
          .attr("fill", "grey")
          .attr("opacity", 0.3);

        d3.select(d3Container.current)
          .selectAll("circle")
          .attr("fill", "grey")
          .attr("opacity", 0.5)
          .on("mouseover", null) // Disable the tooltip
          .on("mouseout", null); // Disable the tooltip
      }
    });
  }, [variable, selectedYear]);

  // Create the graph and update it when the data changes
  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const margin = { top: 40, right: 30, bottom: 40, left: 100 };
      const width = 960 - margin.left - margin.right;
      const height = 650 - margin.top - margin.bottom;

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

      // Add the tooltip div
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#f9f9f9")
        .style("padding", "5px")
        .style("border", "1px solid #d3d3d3")
        .style("border-radius", "5px")
        .style("opacity", 0);

      const showTooltip = (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `Country: ${d.country}<br/>Men: ${d.blueValue}<br/>Women: ${d.yellowValue}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");

        // Highlight the dots and line
        d3.selectAll(`.dot-${d.country}`)
          .attr("stroke", "black")
          .attr("stroke-width", 2);

        d3.select(`.line-${d.country}`).attr("stroke-width", 3);
      };

      const hideTooltip = (event, d) => {
        tooltip.transition().duration(500).style("opacity", 0);

        // Remove highlight from dots and line
        d3.selectAll(`.dot-${d.country}`).attr("stroke", "none");

        d3.select(`.line-${d.country}`).attr("stroke-width", 1);
      };

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
          .attr("class", `line-${d.country}`)
          .attr("stroke", "black")
          .attr("fill", "none")
          .attr("stroke-width", 1)
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
        .append("text")
        .attr("class", "mean-line-text")
        .attr("x", xScale(means.meanMen))
        .attr("y", -28) // Position above the line
        .attr("text-anchor", "middle")
        .attr("fill", "purple")
        .text(`Men: ${means.meanMen.toFixed(2)}`);

      svg
        .append("line")
        .attr("x1", xScale(means.meanWomen))
        .attr("x2", xScale(means.meanWomen))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "orange")
        .attr("stroke-width", 3); // Thicker line without dashes

      svg
        .append("text")
        .attr("class", "mean-line-text")
        .attr("x", xScale(means.meanWomen))
        .attr("y", -8) // Position above the line
        .attr("text-anchor", "middle")
        .attr("fill", "orange")
        .text(`Women: ${means.meanWomen.toFixed(2)}`);

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
        .attr("class", (d) => `dot blue dot-${d.country}`)
        .attr("cx", (d) => xScale(d.blueValue))
        .attr("cy", (d) => yScale(d.country))
        .attr("r", 10)
        .attr("fill", "#613C8E")
        .style("opacity", 0)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip)
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
        .attr("class", (d) => `dot yellow dot-${d.country}`)
        .attr("cx", (d) => xScale(d.yellowValue))
        .attr("cy", (d) => yScale(d.country))
        .attr("r", 10)
        .attr("fill", "#f39a59")
        .style("opacity", 0)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip)
        .transition()
        .duration(transitionDuration)
        .style("opacity", 1);
    }
  }, [data, means]);

  useEffect(() => {
    setText(buttonTexts[variable]);
  }, [variable]);

  return (
    <div className="flex-col justify-center">
      <svg ref={d3Container} />

      <div
        className="slider-container"
        style={{ width: `${960 - 100 - 30}px`, margin: "0 auto" }}
      >
        <Slider
          min={2002}
          max={2020}
          step={2}
          marks={{
            2002: "2002",
            2004: "2004",
            2006: "2006",
            2008: "2008",
            2010: "2010",
            2012: "2012",
            2014: "2014",
            2016: "2016",
            2018: "2018",
            2020: "2020",
          }}
          defaultValue={2002}
          onChange={(value) => setSelectedYear(value.toString())}
        />
      </div>
      <p className="mt-12">{text}</p>
    </div>
  );
};

export default GraphTest;
