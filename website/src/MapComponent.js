import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3-geo';
import { json } from 'd3-fetch';

const initialCountryData = {
    "Austria": 30,
    "Belgium": 25,
    "Bulgaria": 40,
    "Croatia": 20,
    "Cyprus": 15,
    "Czech Republic": 35,
    "Denmark": 50,
    "Estonia": 45,
    "Finland": 55,
    "France": 33,
    "Germany": 48,
    "Greece": 18,
    "Hungary": 28,
    "Ireland": 25,
    "Italy": 40,
    "Latvia": 22,
    "Lithuania": 30,
    "Luxembourg": 40,
    "Malta": 10,
    "Netherlands": 42,
    "Poland": 38,
    "Portugal": 45,
    "Romania": 15,
    "Slovakia": 27,
    "Slovenia": 32,
    "Spain": 37,
    "Sweden": 50,
    "United Kingdom": 35
};

// List of countries to be assigned the purplish color scale
const menDominancyCountries = ["Germany", "France", "United Kingdom", "Italy", "Spain", "Poland"];

// List of years for the timeline
const years = [2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020];

const colors = {
    media_consumption: "#F8AD1A",
    religious_activity: "#F6810C",
    financial_vulnerability: "#E34D20",
    mental_stress: "#AA2243",
    loneliness: "#6C0D59",
    education: "#3F0059",
};

const getRandomValues = () => {
    const newValues = {};
    Object.keys(initialCountryData).forEach(country => {
        newValues[country] = Math.floor(Math.random() * 56); // Random values between 0 and 55
    });
    return newValues;
};

const MapComponent = () => {
    const ref = useRef();
    const [selectedYear, setSelectedYear] = useState(2020);
    const [variable, setVariable] = useState('media_consumption');
    const [countryData, setCountryData] = useState(initialCountryData);

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', 1000)
            .attr('height', 700);

        const g = svg.append('g');

        const projection = geoMercator()
            .center([20, 52]) // Approximate center of Europe
            .scale(800) // Adjusted scale for zoom in
            .translate([600, 350]); // Adjusted translate for right shift

        const path = geoPath().projection(projection);

        const womenColorScale = d3.scaleSequential(d3.interpolateOranges)
            .domain([0, 55]); // Adjust the domain based on your data range

        const menColorScale = d3.scaleSequential(d3.interpolatePurples)
            .domain([0, 55]); // Adjust the domain based on your data range

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background', '#fff')
            .style('border', '1px solid #ccc')
            .style('padding', '10px')
            .style('border-radius', '4px')
            .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.5)');

        json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
            const paths = g.selectAll('path')
                .data(data.features)
                .enter().append('path')
                .attr('d', path)
                .attr('stroke', 'white')
                .attr('stroke-width', 1.5)
                .on('mouseover', function(event, d) {
                    d3.select(this).attr('fill', '#6e6e6e');
                    const countryName = d.properties.name;
                    const value = countryData[countryName];
                    tooltip.html(`<strong>${countryName}</strong><br>Value: ${value}`)
                        .style('visibility', 'visible');
                })
                .on('mousemove', function(event) {
                    tooltip.style('top', (event.pageY - 10) + 'px')
                        .style('left', (event.pageX + 10) + 'px');
                })
                .on('mouseout', function(event, d) {
                    const countryName = d.properties.name;
                    const value = countryData[countryName];
                    if (menDominancyCountries.includes(countryName)) {
                        d3.select(this).attr('fill', value ? menColorScale(value) : '#cccccc');
                    } else {
                        d3.select(this).attr('fill', value ? womenColorScale(value) : '#cccccc');
                    }
                    tooltip.style('visibility', 'hidden');
                });

            g.selectAll('text')
                .data(data.features)
                .enter()
                .append('text')
                .attr('x', d => path.centroid(d)[0])
                .attr('y', d => path.centroid(d)[1])
                .text(d => d.properties.name)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('font-size', 11)
                .style('fill', 'black');

            // Add legend frame
            const legendFrame = svg.append('g')
                .attr('transform', 'translate(730, 600)') // Position at bottom-right corner
                .attr('class', 'legend-frame');

            legendFrame.append('rect')
                .attr('width', 250)
                .attr('height', 90)
                .attr('fill', '#f0f0f0') // Light grey background
                .attr('stroke', 'black')
                .attr('stroke-width', 1.5);

            // Add legend inside frame
            const legend = legendFrame.append('g')
                .attr('transform', 'translate(10, 10)');

            const legendData = [
                { label: 'Women Dominancy', colors: [ '#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'] }, // Adjust colors to match your scale
                { label: 'Men Dominancy', colors: [ '#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'] }   // Adjust colors to match your scale
            ];

            legend.selectAll('g')
                .data(legendData)
                .enter()
                .append('g')
                .each(function(d, i) {
                    const g = d3.select(this);
                    g.selectAll('rect')
                        .data(d.colors)
                        .enter()
                        .append('rect')
                        .attr('x', (color, j) => j * 20)
                        .attr('y', i * 25)
                        .attr('width', 20)
                        .attr('height', 20)
                        .style('fill', color => color);

                    g.append('text')
                        .attr('x', d.colors.length * 20 + 5)
                        .attr('y', i * 25 + 15)
                        .attr('dy', '.35em')
                        .text(d.label)
                        .style('font-size', 12)
                        .style('fill', 'black');
                });

            const updateMapColors = () => {
                paths.attr('fill', d => {
                    const countryName = d.properties.name;
                    const value = countryData[countryName];
                    if (menDominancyCountries.includes(countryName)) {
                        return value ? menColorScale(value) : '#cccccc';
                    } else {
                        return value ? womenColorScale(value) : '#cccccc';
                    }
                });
            };

            updateMapColors();
        });

    }, [selectedYear]);

    useEffect(() => {
        const svg = d3.select("#timeline-svg");
        svg.selectAll("*").remove(); // Clear previous content

        const timeline = svg.append('g')
            .attr('transform', 'translate(50, 25)'); // Adjusted position

        // Add timeline line
        timeline.append('line')
            .attr('x1', 0)
            .attr('y1', 10)
            .attr('x2', 800)
            .attr('y2', 10)
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        // Add years to the timeline
        const yearGroups = timeline.selectAll('g.year-group')
            .data(years)
            .enter()
            .append('g')
            .attr('class', 'year-group')
            .attr('transform', (d, i) => `translate(${i * 80 + 40}, 0)`)
            .on('click', d => {
                setSelectedYear(d);
                setCountryData(getRandomValues());
            });

        yearGroups.append('text')
            .text(d => d)
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('font-size', 14)
            .style('font-weight', 'bold')
            .style('fill', 'black')
            .style('cursor', 'pointer');

        yearGroups.append('line')
            .attr('x1', 0)
            .attr('y1', 10)
            .attr('x2', 0)
            .attr('y2', 20)
            .attr('stroke', 'black')
            .attr('stroke-width', 2);

        // Add timeline handle
        const handle = timeline.append('circle')
            .attr('cx', 40 + (years.indexOf(selectedYear) * 80))
            .attr('cy', 10)
            .attr('r', 8)
            .attr('fill', 'black')
            .call(d3.drag().on('drag', function(event) {
                const yearIndex = Math.max(0, Math.min(9, Math.round((event.x - 40) / 80)));
                setSelectedYear(years[yearIndex]);
                setCountryData(getRandomValues());
                handle.attr('cx', 40 + yearIndex * 80);
            }));

        // Update the handle position when the selected year changes
        handle.attr('cx', 40 + (years.indexOf(selectedYear) * 80));
    }, [selectedYear]);

    useEffect(() => {
        const svg = d3.select(ref.current);
        const womenColorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 55]);
        const menColorScale = d3.scaleSequential(d3.interpolatePurples).domain([0, 55]);

        // Update map colors whenever the country data changes
        svg.selectAll('path')
            .attr('fill', d => {
                const countryName = d.properties.name;
                const value = countryData[countryName];
                if (menDominancyCountries.includes(countryName)) {
                    return value ? menColorScale(value) : '#cccccc';
                } else {
                    return value ? womenColorScale(value) : '#cccccc';
                }
            });
    }, [countryData]);

    return (
        <div>
            <div className="flex gap-x-3 mb-4">
                {Object.keys(colors).map((varName) => (
                    <button
                        key={varName}
                        style={{ backgroundColor: `${colors[varName]}`, color: "white" }}
                        className="text-white font-bold py-2 px-4 rounded"
                        onClick={() => setVariable(varName)}
                    >
                        {varName.replace("_", " ")}
                    </button>
                ))}
            </div>
            <svg ref={ref} />
            <div className="flex justify-center mt-4">
                <svg id="timeline-svg" width="900" height="50"></svg>
            </div>
        </div>
    );
}

export default MapComponent;
