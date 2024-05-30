import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/figure_1_bar.csv?url";

const BarChart = ({ variable }) => {
  const [data, setData] = useState(null);
  const [values, setValues] = useState([]); // State to hold processed data
  const chartRef = useRef(null);

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
        generations: [1, 2, 3, 4, 5].map((gen) => {
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
    setText(buttonTexts[variable]);
  }, [variable]);

  useEffect(() => {
    if (!values.length) return; // Do nothing if values are not set

    const svg = d3.select(chartRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x0 = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(values.map((d) => d.year));

    const x1 = d3
      .scaleBand()
      .padding(0.05)
      .domain(["generation1", "generation2", "generation3", "generation4"])
      .rangeRound([0, x0.bandwidth()]);

    const y = d3.scaleLinear().rangeRound([height, 0]).domain([1, 6]);

    const z = d3
      .scaleOrdinal()
      .range(["#8bb3f5", "#3d81ee", "#3167be", "#254d8f"]);

    const xAxis = d3.axisBottom(x0);
    const yAxis = d3.axisLeft(y);

    // Set up the axes if they're not already present
    svg
      .selectAll(".axis")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "x axis");
    svg
      .selectAll(".y.axis")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "y axis");

    // Transition the Axis
    svg
      .select(".x.axis")
      .attr("transform", `translate(${margin.left},${height})`)
      .transition()
      .duration(1000)
      .call(xAxis);

    svg
      .select(".y.axis")
      .attr("transform", `translate(${margin.left})`)
      .transition()
      .duration(1000)
      .call(yAxis);

    // Add event listeners to x-axis labels for hover effects
    svg
      .selectAll(".x.axis .tick")
      .on("mouseover", function (event, year) {
        // Highlight bars of the hovered year
        svg
          .selectAll("rect")
          .attr("opacity", (d) => (d.year === year ? 1 : 0.3));
      })
      .on("mouseout", function () {
        // Reset all bars to initial opacity
        svg.selectAll("rect").attr("opacity", 1);
      });

    // Define the tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "10px")
      .style("display", "none");

    // Mapping generation to age
    const generation_to_age = {
      generation1: "<25",
      generation2: "25-39",
      generation3: "40-59",
      generation4: "60+",
    };

    // Bind data to groups for each year
    const yearGroups = svg
      .selectAll("g.year-group")
      .data(values, (d) => d.year);

    // Enter new groups
    const yearGroupsEnter = yearGroups
      .enter()
      .append("g")
      .attr("class", "year-group")
      .attr("transform", (d) => `translate(${x0(d.year) + margin.left},0)`);

    // Update existing groups
    yearGroups
      .transition()
      .duration(4000)
      .attr("transform", (d) => `translate(${x0(d.year) + margin.left},0)`);

    yearGroups.exit().remove();

    // Bind data to rectangles within each group
    const bars = yearGroups
      .merge(yearGroupsEnter)
      .selectAll("rect")
      .data((d) =>
        d.generations.map((value, index) => ({
          year: d.year,
          generation: `generation${index + 1}`,
          age: generation_to_age[`generation${index + 1}`],
          value,
        }))
      );

    // Enter new bars
    bars
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.generation))
      .attr("width", x1.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", (d) => z(d.generation))
      .attr("opacity", 1) // Set initial opacity to 1
      .on("mouseover", function (event, d) {
        tooltip
          .style("display", "block")
          .html(`Year: ${d.year}<br>Age: ${d.age}<br>Value: ${d.value}`);
        // Highlight the hovered bar's generation
        svg.selectAll("rect").attr("opacity", function (rectData) {
          return rectData.generation === d.generation ? 1 : 0.3;
        });
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
        // Reset all bars to initial opacity
        svg.selectAll("rect").attr("opacity", 1);
      })
      .merge(bars) // Update existing bars
      .transition()
      .duration(1000)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value));

    bars
      .exit()
      .transition()
      .duration(1000)
      .attr("y", height)
      .attr("height", 0)
      .remove();

    // Legend setup
    const legend = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(["generation1", "generation2", "generation3", "generation4"])
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(-50,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text((d) => generation_to_age[d]);
  }, [values, variable]);

  return (
    <div className="flex w-full ml-10">
      <div className="flex flex-col">
        <p className="mb-4 font-bespoke font-light">{text}</p>
        <svg ref={chartRef} width="960" height="550"></svg>
      </div>
    </div>
  );
};

export default BarChart;
