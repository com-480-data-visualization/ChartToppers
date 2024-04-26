import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Example() {
    const d3Container = useRef(null);

    useEffect(() => {
        if (d3Container.current) {
            // Sample data
            const data = [2, 4, 8, 10, 15, 20, 25];

            // Set dimensions and margins of the graph
            const margin = { top: 20, right: 30, bottom: 40, left: 90 },
                  width = 460 - margin.left - margin.right,
                  height = 400 - margin.top - margin.bottom;

            // Append the svg object to the div called 'd3Container'
            const svg = d3.select(d3Container.current)
                          .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform", `translate(${margin.left},${margin.top})`);

            // X axis
            const x = d3.scaleLinear()
                        .domain([0, 30])
                        .range([ 0, width]);
            svg.append("g")
               .attr("transform", `translate(0,${height})`)
               .call(d3.axisBottom(x));

            // Y axis
            const y = d3.scaleBand()
                        .range([ 0, height ])
                        .domain(data.map((d, i) => i))
                        .padding(.1);
            svg.append("g")
               .call(d3.axisLeft(y));

            // Bars
            svg.selectAll("myRect")
               .data(data)
               .enter()
               .append("rect")
               .attr("x", x(0) )
               .attr("y", (d, i) => y(i))
               .attr("width", (d) => x(d))
               .attr("height", y.bandwidth())
               .attr("fill", "#69b3a2");
        }
    }, []); // Empty dependency array means this effect will only run once (like componentDidMount in classes)

    return (
        <div>
            <p>This is another component.</p>
            <div ref={d3Container} />
        </div>
    );
}

export default Example;
