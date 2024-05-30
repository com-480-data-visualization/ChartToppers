import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { geoMercator, geoPath } from "d3-geo";
import { csv } from "d3-fetch";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import dataUrl from "./data/figure_2_choropleth.csv?url";
import europeJson from "./data/europe.geojson?url";
import ordinalDataUrl from "./data/figure_3_ordinal.csv?url";
import "rc-slider/assets/index.css";
import "./slider.css"; // Create and import a custom CSS file for slider styling

const years = [2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020];

const categories = [
  "wellbeing_color",
  "media_color",
  "internet_color",
  "relig_color",
  "social_color",
  "finstab_color",
  "conservatism_color",
  "trust_color",
];
const colors = {
  wellbeing_color: "#F8AD1A",
  media_color: "#F6810C",
  internet_color: "#E34D20",
  relig_color: "#AA2243",
  social_color: "#6C0D59",
  finstab_color: "#3F0059",
  conservatism_color: "#1E90FF",
  trust_color: "#32CD32",
};
const ageGroups = ["<25", "25-39", "40-59", "60+", "AGGREGATE"];

const displayGroups = {
  "<25": "<25",
  "25-39": "25-39",
  "40-59": "40-59",
  "60+": "60+",
  AGGREGATE: "All population",
};

const MapComponent = ({ variable }) => {
  const ref = useRef();
  const [selectedYear, setSelectedYear] = useState(2002);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("AGGREGATE");
  const [data, setData] = useState(null);
  const [ordinalData, setOrdinalData] = useState(null);
  const [filteredData, setFilteredData] = useState({});

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
    csv(dataUrl)
      .then((csvData) => {
        console.log("CSV Data Loaded: ", csvData);
        setData(csvData);
      })
      .catch((err) => console.error(err));

    csv(ordinalDataUrl)
      .then((csvData) => {
        console.log("Ordinal Data Loaded: ", csvData);
        setOrdinalData(csvData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (data !== null) {
      const filtered = data.filter(
        (d) =>
          +d.essround_yr === selectedYear && d.age_group === selectedAgeGroup
      );
      const dataMap = {};
      filtered.forEach((d) => {
        const countryName = d.country;
        if (countryName) {
          dataMap[countryName] = {
            [`${variable}_color`]: +d[`${variable}_color`],
            [`${variable}_men`]: +d[`${variable}_men`],
            [`${variable}_woman`]: +d[`${variable}_woman`],
          };
        }
      });
      setFilteredData(dataMap);
    }
  }, [selectedYear, selectedAgeGroup, variable, data]);

  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 1200).attr("height", 800);

    const g = svg.append("g");

    const projection = geoMercator()
      .center([20, 52])
      .scale(800)
      .translate([600, 350]);

    const path = geoPath().projection(projection);

    const womenColorScale = d3
      .scaleSequential()
      .domain([1, 7])
      .interpolator(
        d3.interpolateRgbBasis([
          "#fff5eb",
          "#fee6ce",
          "#fdd0a2",
          "#fdae6b",
          "#fd8d3c",
          "#f16913",
          "#d94801",
        ])
      );

    const menColorScale = d3
      .scaleSequential()
      .domain([1, 7])
      .interpolator(
        d3.interpolateRgbBasis([
          "#dadaeb",
          "#bcbddc",
          "#9e9ac8",
          "#807dba",
          "#6a51a3",
          "#54278f",
          "#3f007d",
        ])
      );

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(51, 51, 51, 0.8)") // Dark background with transparency
      .style("color", "#fff") // White text
      .style("border", "1px solid #fff") // White border
      .style("padding", "10px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.5)");

    d3.json(europeJson).then((geoData) => {
      svg.selectAll("path").remove();
      svg.selectAll("text").remove();
      const paths = g
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", (d) => {
          const countryName = d.properties.name;
          return filteredData[countryName] ? "white" : "none"; // Set border color based on data availability
        })
        .attr("stroke-width", (d) => {
          const countryName = d.properties.name;
          return filteredData[countryName] ? 1 : 0; // Set border width based on data availability
        })
        .on("mouseover", function (event, d) {
          d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 3);
          const countryName = d.properties.name;
          const countryData = filteredData[countryName];
          if (countryData) {
            tooltip
              .html(
                `<strong>${countryName}</strong><br>
                  Men: ${countryData[`${variable}_men`]}<br>
                  Women: ${countryData[`${variable}_woman`]}`
              )
              .style("visibility", "visible");

            createLineChart(countryName);
          }
          d3.select(`#text-${countryName}`).style("visibility", "visible");
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function (event, d) {
          updateMapColors();
          tooltip.style("visibility", "hidden");
          tooltip.selectAll("svg").remove();
          d3.select(`#text-${d.properties.name}`).style(
            "visibility",
            filteredData[d.properties.name] ? "visible" : "hidden"
          );
          d3.select(this)
            .attr("stroke", filteredData[d.properties.name] ? "white" : "none")
            .attr("stroke-width", filteredData[d.properties.name] ? 1 : 0);
        });

      g.selectAll("text")
        .data(geoData.features)
        .enter()
        .append("text")
        .attr("id", (d) => `text-${d.properties.name}`)
        .attr("x", (d) => path.centroid(d)[0])
        .attr("y", (d) => path.centroid(d)[1])
        .text((d) => d.properties.name)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", 12)
        .style("fill", "#000")
        .style("stroke", "white")
        .style("stroke-width", "0.05px")
        .style("visibility", (d) =>
          filteredData[d.properties.name] ? "visible" : "hidden"
        ); // Make country names visible if data is available

      svg.select(".legend-frame").remove();

      const legendFrame = svg
        .append("g")
        .attr("transform", "translate(690, 775)")
        .attr("class", "legend-frame");

      const defs = svg.append("defs");

      const gradient = defs
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      const legendColors = [
        "#7f2704",
        "#a63603",
        "#d94801",
        "#f16913",
        "#fd8d3c",
        "#fdae6b",
        "#fdd0a2",
        "#dadaeb",
        "#bcbddc",
        "#9e9ac8",
        "#807dba",
        "#6a51a3",
        "#54278f",
        "#3f007d",
      ];

      legendColors.forEach((color, i) => {
        gradient
          .append("stop")
          .attr("offset", `${(i / (legendColors.length - 1)) * 100}%`)
          .attr("stop-color", color);
      });

      legendFrame
        .append("rect")
        .attr("width", 500)
        .attr("height", 20)
        .attr("fill", "url(#legend-gradient)")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

      legendFrame
        .append("text")
        .attr("x", 200)
        .attr("y", 10)
        .attr("dy", ".35em")
        .text("Gender differential")
        .style("font-size", 14)
        .style("fill", "black")
        .style("font-weight", "bold");

      const updateMapColors = () => {
        paths.attr("fill", (d) => {
          const countryName = d.properties.name;
          const countryData = filteredData[countryName];
          if (countryData) {
            const colorValue = countryData[`${variable}_color`];
            if (colorValue >= 1 && colorValue <= 7) {
              return menColorScale(8 - colorValue); // Invert scale for men: 7 becomes 1 (dark purple)
            } else if (colorValue >= 8 && colorValue <= 14) {
              return womenColorScale(colorValue - 7); // Shift scale for women: 8 becomes 1 (dark orange)
            }
          }
          return "rgba(204, 204, 204, 0.5)"; // More transparent color for countries without data
        });
      };

      updateMapColors();
    });

    const createLineChart = (countryName) => {
      if (!ordinalData) return;

      const countryData = ordinalData.filter(
        (d) => d.country_full === countryName
      );

      if (countryData.length === 0) return;

      const width = 180;
      const height = 100;
      const margin = { top: 10, right: 25, bottom: 35, left: 30 };

      const svg = tooltip
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scalePoint().domain(years).range([0, width]);

      const yScale = d3.scaleLinear().domain([1, 6]).range([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat(d3.format(""))
            .ticks(years.length)
            .tickSize(2)
        ) // Smaller x axis size
        .selectAll("text")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end"); // Rotate x-axis labels

      svg.append("g").call(d3.axisLeft(yScale).ticks(5).tickSize(2)); //  y axis size

      const menLine = d3
        .line()
        .x((d) => xScale(+d.year))
        .y((d) => yScale(+d[`${variable}_men`]));

      const womenLine = d3
        .line()
        .x((d) => xScale(+d.year))
        .y((d) => yScale(+d[`${variable}_woman`]));

      svg
        .append("path")
        .datum(countryData)
        .attr("fill", "none")
        .attr("stroke", "#54278f")
        .attr("stroke-width", 1.5)
        .attr("d", menLine);

      svg
        .append("path")
        .datum(countryData)
        .attr("fill", "none")
        .attr("stroke", "#f16913")
        .attr("stroke-width", 1.5)
        .attr("d", womenLine);

      svg
        .selectAll("circle.men")
        .data(countryData)
        .enter()
        .append("circle")
        .attr("class", "men")
        .attr("cx", (d) => xScale(+d.year))
        .attr("cy", (d) => yScale(+d[`${variable}_men`]))
        .attr("r", 3)
        .attr("fill", "#54278f");

      svg
        .selectAll("circle.women")
        .data(countryData)
        .enter()
        .append("circle")
        .attr("class", "women")
        .attr("cx", (d) => xScale(+d.year))
        .attr("cy", (d) => yScale(+d[`${variable}_woman`]))
        .attr("r", 3)
        .attr("fill", "#f16913");
    };
  }, [filteredData, ordinalData, variable]);

  useEffect(() => {
    setText(buttonTexts[variable]);
  }, [variable]);

  return (
    <div>
      <p className="mb-12 font-bespoke font-light">{text}</p>
      <svg ref={ref} />
      <div className="flex">
        <select
          onChange={(e) => setSelectedAgeGroup(e.target.value)}
          value={selectedAgeGroup}
          className="text-black font-bold py-2 px-4 rounded bg-blue-300 mt-4 shadow-sm"
        >
          {ageGroups.map((ageGroup) => (
            <option key={ageGroup} value={ageGroup}>
              {displayGroups[ageGroup]}
            </option>
          ))}
        </select>
        <div
          className="slider-container"
          style={{ width: "960px", margin: "0 auto", marginTop: "20px" }}
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
            onChange={(value) => setSelectedYear(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
