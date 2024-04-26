import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphComponent = () => {
  const d3Container = useRef(null);
  
  // Fake dataset
  const dataset = [
    { country: 'Germany', blueValue: 3.4, yellowValue: 2.1 },
    { country: 'France', blueValue: 1.2, yellowValue: 5.6 },
    { country: 'Italy', blueValue: 4.5, yellowValue: 3.9 },
    { country: 'Spain', blueValue: 5.2, yellowValue: 2.3 },
    { country: 'England', blueValue: 4.8, yellowValue: 4.1 },
    { country: 'Netherlands', blueValue: 2.9, yellowValue: 1.7 },
    { country: 'Belgium', blueValue: 3.8, yellowValue: 5.1 },
    { country: 'Austria', blueValue: 1.5, yellowValue: 6.0 },
    { country: 'Switzerland', blueValue: 4.2, yellowValue: 2.8 },
    { country: 'Portugal', blueValue: 2.1, yellowValue: 4.4 },
    { country: 'Sweden', blueValue: 5.5, yellowValue: 3.2 },
    { country: 'Denmark', blueValue: 1.9, yellowValue: 1.1 },
    { country: 'Norway', blueValue: 4.7, yellowValue: 3.5 },
    { country: 'Finland', blueValue: 2.4, yellowValue: 5.8 },
    { country: 'Iceland', blueValue: 3.1, yellowValue: 4.9 },
    ];

    useEffect(() => {
        if (d3Container.current) {
          const margin = { top: 20, right: 30, bottom: 40, left: 100 };
          const width = 960 - margin.left - margin.right;
          const height = 600 - margin.top - margin.bottom; // Adjust height for more spacing
    
          // Remove old svg elements
          d3.select(d3Container.current).selectAll('*').remove();
    
          // Create SVG element
          const svg = d3.select(d3Container.current)
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);
    
          // Create scales
          const xScale = d3.scaleLinear().domain([0, 6]).range([0, width]);
          const yScale = d3.scalePoint().domain(dataset.map(data => data.country)).range([0, height]).padding(1); // Increase padding for more space
    
          // Add x-axis
          svg.append('g')
             .attr('transform', `translate(0,${height})`)
             .call(d3.axisBottom(xScale).tickSize(-height).tickValues([1, 2, 3, 4, 5, 6]));
    
          // Add y-axis
          svg.append('g').call(d3.axisLeft(yScale));
    
          // Add grey vertical grid lines
          svg.selectAll('.grid-line')
             .data(xScale.ticks(6))
             .enter().append('line')
             .attr('class', 'grid-line')
             .attr('x1', d => xScale(d))
             .attr('x2', d => xScale(d))
             .attr('y1', 0)
             .attr('y2', height)
             .attr('stroke', 'light_grey')
             .attr('stroke-dasharray', '2');
    
          // Function to draw lines between points
          const line = d3.line()
                         .x(d => xScale(d.value))
                         .y(d => yScale(d.country));
    
          // Add lines between blue and yellow points
          dataset.forEach((data) => {
            svg.append('path')
               .datum([{ country: data.country, value: data.blueValue }, { country: data.country, value: data.yellowValue }])
               .attr('class', 'line')
               .attr('d', line)
               .attr('stroke', 'black')
               .attr('stroke-width', 2)
               .attr('fill', 'none');
          });
    
          // Add points for blue values
          svg.selectAll('.dot.blue')
             .data(dataset)
             .enter().append('circle')
             .attr('class', 'dot blue')
             .attr('cx', d => xScale(d.blueValue))
             .attr('cy', d => yScale(d.country))
             .attr('r', 10)
             .attr('fill', 'blue');
    
          // Add points for yellow values
          svg.selectAll('.dot.yellow')
             .data(dataset)
             .enter().append('circle')
             .attr('class', 'dot yellow')
             .attr('cx', d => xScale(d.yellowValue))
             .attr('cy', d => yScale(d.country))
             .attr('r', 10)
             .attr('fill', 'yellow');
        }
      }, [dataset]); // Redraw graph when dataset changes
    
      return (
        <svg ref={d3Container} />
      );
    };

export default GraphComponent;
