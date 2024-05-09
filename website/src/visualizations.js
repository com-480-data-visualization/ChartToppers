// visualizations.js
import * as d3 from "d3";

// Categories and colors are often used for scales in visualization functions
export const categories = [
  "Engineering",
  "Business",
  "Physical Sciences",
  "Law & Public Policy",
  "Computers & Mathematics",
  "Agriculture & Natural Resources",
  "Industrial Arts & Consumer Services",
  "Arts",
  "Health",
  "Social Science",
  "Biology & Life Science",
  "Education",
  "Humanities & Liberal Arts",
  "Psychology & Social Work",
  "Communications & Journalism",
  "Interdisciplinary",
];

// Color palette for categories
const colors = [
  "#ffcc00",
  "#ff6666",
  "#cc0066",
  "#66cccc",
  "#f688bb",
  "#65587f",
  "#baf1a1",
  "#333333",
  "#75b79e",
  "#66cccc",
  "#9de3d0",
  "#f1935c",
  "#0c7b93",
  "#eab0d9",
  "#baf1a1",
  "#9399ff",
];

// Scales defined globally within the module, initialized empty
let salarySizeScale, categoryColorScale, salaryXScale;

// Function to initialize scales, call this from your setup function in your React component
export function createScales(dataset) {
  salarySizeScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d.Median))
    .range([5, 35]);

  categoryColorScale = d3.scaleOrdinal().domain(categories).range(colors);

  salaryXScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d.Median))
    .range([100, 900]); // Assuming a margin left of 100 and svg width of 1000
}

export function drawInitial(svgElement) {
  let svg = d3.select(svgElement);

  // Assume you add an initial set of elements or setup the canvas
  svg
    .append("g")
    .attr("class", "initial-setup")
    .append("text")
    .text("Initial Visualization Setup")
    .attr("x", 150)
    .attr("y", 100);
}

export function draw1(svgElement) {
  let svg = d3.select(svgElement);

  // Clean up necessary parts or set up for this specific drawing
  clean(svg, "isFirst");

  // Example operation: changing circles' radius and color
  svg
    .selectAll("circle")
    .transition()
    .duration(500)
    .attr("r", (d) => salarySizeScale(d.Median))
    .attr("fill", (d) => categoryColorScale(d.Category));
}

export function draw2(svgElement) {
  let svg = d3.select(svgElement);

  // Another visualization setup or transition
  clean(svg, "none"); // Assuming 'none' cleans everything not needed

  // More operations similar to draw1 or different
  svg.selectAll("circle").transition().duration(300).attr("fill", "blue"); // Example change
}

// Clean function to hide or reset certain elements based on the chart type
export function clean(svg, chartType) {
  if (chartType === "isFirst") {
    svg.selectAll(".not-first").style("display", "none");
  } else {
    svg.selectAll("*").style("display", null);
  }
}
