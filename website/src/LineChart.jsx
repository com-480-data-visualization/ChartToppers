import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/figure_1_bar.csv?url";

const LineChart = ({ variable }) => {
  const [data, setData] = useState(null);
  const [values, setValues] = useState([]);
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

  const [text, setText] = useState(buttonTexts["wellbeing"]);

  useEffect(() => {
    d3.csv(dataUrl, d3.autoType)
      .then((csv_data) => setData(csv_data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (data !== null) {
      const years = [...new Set(data.map((item) => item.year))];
      const newValues = years.map((year) => ({
        year: year,
        generations: [1, 2, 3, 4].map((gen) => {
          const row = data.find((d) => d.year === year && d.generation === gen);
          return row ? row[variable] : null;
        }),
      }));
      setValues(newValues);
    }
  }, [data, variable]);

  useEffect(() => {
    setText(buttonTexts[variable]);
  }, [variable]);

  useEffect(() => {
    if (values.length > 0) {
      const svg = d3.select(chartRef.current);
      svg.selectAll("*").remove(); // Clear previous content

      const margin = { top: 20, right: 30, bottom: 40, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

      const x = d3
        .scaleLinear()
        .domain(d3.extent(values, (d) => d.year))
        .range([0, width]);

      const y = d3.scaleLinear().domain([1, 6]).range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y(d.value));

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      g.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

      const colors = ["#cda6ac", "#bc8990", "#ab6b74", "#89565d"];

      [1, 2, 3, 4].forEach((gen, i) => {
        const genData = values.map((d) => ({
          year: d.year,
          value: d.generations[i],
        }));

        let solidSegments = [];
        let dottedSegments = [];
        let currentSegment = [];
        let isSolid = true;

        genData.forEach((d, idx) => {
          if (d.value !== null) {
            currentSegment.push(d);
          } else {
            if (currentSegment.length > 0) {
              if (isSolid) {
                solidSegments.push(currentSegment);
              } else {
                dottedSegments.push(currentSegment);
              }
              currentSegment = [];
            }
            isSolid = false;
          }

          if (
            idx < genData.length - 1 &&
            d.value !== null &&
            genData[idx + 1].value === null
          ) {
            isSolid = false;
          }

          if (
            idx < genData.length - 1 &&
            d.value === null &&
            genData[idx + 1].value !== null
          ) {
            currentSegment.push(d, genData[idx + 1]);
            dottedSegments.push(currentSegment);
            currentSegment = [];
            isSolid = true;
          }
        });

        if (currentSegment.length > 0) {
          if (isSolid) {
            solidSegments.push(currentSegment);
          } else {
            dottedSegments.push(currentSegment);
          }
        }

        solidSegments.forEach((segment) => {
          g.append("path")
            .datum(segment)
            .attr("fill", "none")
            .attr("stroke", colors[i])
            .attr("stroke-width", 5)
            .attr("d", line);
        });

        dottedSegments.forEach((segment) => {
          g.append("path")
            .datum(segment)
            .attr("fill", "none")
            .attr("stroke", colors[i])
            .attr("stroke-width", 5)
            .attr("d", line);
        });
      });
    }
  }, [values]);

  return (
    <div className="flex w-full ml-10">
      <div className="flex flex-col">
        <p className="mb-4">{text}</p>
        <svg ref={chartRef} width="960" height="550"></svg>
      </div>
    </div>
  );
};

export default LineChart;
