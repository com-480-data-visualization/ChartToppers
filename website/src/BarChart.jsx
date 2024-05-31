import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dataUrl from "./data/figure_1_bar.csv?url";

const BarChart = ({ variable }) => {
  const [data, setData] = useState(null);
  const [values, setValues] = useState([]); // State to hold processed data
  const chartRef = useRef(null);

  const buttonTexts = {
    wellbeing: "Throughout the past two decades, wellbeing (as measured by self-reported health, happiness, safety, and life satisfaction) and age have been negatively correlated. Even so, wellbeing has remained high relative to the other ESS indices we explore, and has even experienced a small increase since 2010. This increase was sustained for respondents aged 40 and above and, in 2020, saw a dip among younger respondents.",
    internet: "Perhaps unsurprisingly, internet use has risen dramatically since 2002. Younger respondents saw their fastest usage increase in the aughts and have effectively topped the scales since 2016. Only the oldest respondents have not yet reported extremely frequent usage, though their uptake in the past two decades has been steady.",
    relig: "Religious activity (as measured by levels of self-reported prayer and religious attendance) has seen a small but unmistakable decrease in average level since 2002. This decrease is seen across all age groups. While the oldest respondents report the largest decrease over time, the positive correlation between age and religious activity means the oldest respondents’ status as the most religious cohort is unthreatened across time.",
    social: "There are two salient observations about respondents’ social activity (as measured by engagement in social activities and meetings with friends): (1) age and social participation are negatively correlated and (2) self-reported social activity has remained stable over time. The only cohort for which social activity may be trending downward is the youngest – though data from after the covid-era final survey may reflect a temporary dip.  ",
    finstab: "Financial stability, as measured by self-reported income levels and feelings about income levels, is one of the few indices that exhibits a sustained level shift during the measured time range. Specifically, all age groups see a boost in perceived financial stability between the 2012 and 2014 ESS rounds. This could be related to the quantitative easing from the ECB (note the ‘2014’ round collected data between 2014 and 2015) and emergence from the austerity of the early 2010s. Separately, most cohorts report similar levels of financial stability to one another in any given year; only the oldest cohort, which reports more financial vulnerability, stands apart.",
    conservatism: "One of the more surprising observations across all views present in this figure is that Europe does not report any noticeable trends at all in self-reported levels of conservatism. Neither age cohort nor time intra-age-cohort exhibit a relationship with the index. In one sense, this pours cold water over the notion that Europe has been becoming more conservative since the mid-2010s (or, indeed, any sweeping statements about the average European’s political view). That said, it’s important to remember that this a self-reported metric, and that respondents may wish to be perceived as more moderate than they really are. ",
    trust: "Trust in the legal system, police, and parliament saw a drawn-out if minor dip across all age cohorts between 2002 and 2012. From the 2014 round and onward, this dip was swiftly reversed. While the youngest cohort reached new highs in trust in the later period, other generations reached but did not surpass levels of trust seen when the ESS was launched.",
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


    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(128, 128, 128, 0.9)") // Gray transparent background
      .style("color", "white") // White text
      .style("border", "1px solid #fff") // White border
      .style("padding", "10px")
      .style("border-radius", "4px")
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
