import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  useEffect(() => {
    d3.select('#chart').selectAll('*').remove();
    const data = [
        { year: 2002, generation1: 4, generation2: 2, generation3: 5, generation4: 1 },
        { year: 2004, generation1: 3, generation2: 6, generation3: 1, generation4: 4 },
        { year: 2006, generation1: 5, generation2: 1, generation3: 3, generation4: 2 },
        { year: 2008, generation1: 2, generation2: 4, generation3: 6, generation4: 5 },
        { year: 2010, generation1: 1, generation2: 3, generation3: 2, generation4: 6 },
        { year: 2012, generation1: 6, generation2: 5, generation3: 4, generation4: 3 },
        { year: 2014, generation1: 4, generation2: 1, generation3: 2, generation4: 5 },
        { year: 2016, generation1: 3, generation2: 2, generation3: 6, generation4: 1 },
        { year: 2018, generation1: 5, generation2: 2, generation3: 4, generation4: 3 },
        { year: 2020, generation1: 2, generation2: 6, generation3: 1, generation4: 5 },
      ];

    // Set up SVG
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(data.map(d => d.year));

    const x1 = d3.scaleBand()
      .padding(0.05)
      .domain(['generation1', 'generation2', 'generation3', 'generation4'])
      .rangeRound([0, x0.bandwidth()]);

    const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, 6]);

    const z = d3.scaleOrdinal()
      .range(['#7b6888', '#6b486b', '#a05d56', '#d0743c']);

    // Draw the bars
    svg.append('g')
      .selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('transform', d => `translate(${x0(d.year)},0)`)
      .selectAll('rect')
      .data(d => ['generation1', 'generation2', 'generation3', 'generation4'].map(key => ({ key, value: d[key] })))
      .enter().append('rect')
        .attr('x', d => x1(d.key))
        .attr('y', d => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', d => z(d.key));

    // Add axes
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Scores');

    // Add legend
    const legend = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(['generation1', 'generation2', 'generation3', 'generation4'].slice().reverse())
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d);

  }, []);

  return <div id="chart" />;
};

export default BarChart;
