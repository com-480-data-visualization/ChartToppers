import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3-geo';
import { csv } from 'd3-fetch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import dataUrl from './data/figure_2_choropleth.csv?url';

const years = [2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020];
const categories = ['wellbeing_color', 'media_color', 'internet_color', 'relig_color', 'social_color', 'finstab_color', 'conservatism_color', 'trust_color'];
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

const countryNameMapping = {
    "Albania": "Albania",
    "Austria": "Austria",
    "Belgium": "Belgium",
    "Bulgaria": "Bulgaria",
    "Croatia": "Croatia",
    "Cyprus": "Cyprus",
    "Czechia": "Czech Republic",
    "Denmark": "Denmark",
    "Estonia": "Estonia",
    "Finland": "Finland",
    "France": "France",
    "Germany": "Germany",
    "Greece": "Greece",
    "Hungary": "Hungary",
    "Iceland": "Iceland",
    "Ireland": "Ireland",
    "Israel": "Israel",
    "Italy": "Italy",
    "Kosovo": "Kosovo",
    "Latvia": "Latvia",
    "Lithuania": "Lithuania",
    "Luxembourg": "Luxembourg",
    "Montenegro": "Montenegro",
    "Netherlands": "Netherlands",
    "North Macedonia": "Macedonia",
    "Norway": "Norway",
    "Poland": "Poland",
    "Portugal": "Portugal",
    "Romania": "Romania",
    "Russian Federation": "Russia",
    "Serbia": "Serbia",
    "Slovakia": "Slovakia",
    "Slovenia": "Slovenia",
    "Spain": "Spain",
    "Sweden": "Sweden",
    "Switzerland": "Switzerland",
    "Turkey": "Turkey",
    "Ukraine": "Ukraine",
    "United Kingdom": "United Kingdom",
    "Bosnia and Herzegovina": "Bosnia and Herzegovina",
    "Moldova": "Moldova",
    "Tunisia": "Tunisia",
    "Georgia": "Georgia",
    "Armenia": "Armenia",
    "Lebanon": "Lebanon",
    "Republic of Serbia": "Serbia",
    "United Kingdom" : "England"
};

const MapComponent = ({variable}) => {
    const ref = useRef();
    const [selectedYear, setSelectedYear] = useState(2002);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('AGGREGATE');
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState({});

    useEffect(() => {
        csv(dataUrl)
            .then(csvData => {
                console.log("CSV Data Loaded: ", csvData);
                setData(csvData);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (data !== null) {
            const filtered = data.filter(d => +d.essround_yr === selectedYear && d.age_group === selectedAgeGroup);
            console.log("Filtered Data: ", filtered);
            const dataMap = {};
            filtered.forEach(d => {
                const countryName = countryNameMapping[d.country];
                if (countryName) {
                    dataMap[countryName] = {
                        wellbeing_color: +d.wellbeing_color,
                        wellbeing_men: +d.wellbeing_men,
                        wellbeing_woman: +d.wellbeing_woman,
                        media_color: +d.media_color,
                        media_men: +d.media_men,
                        media_woman: +d.media_woman,
                        internet_color: +d.internet_color,
                        internet_men: +d.internet_men,
                        internet_woman: +d.internet_woman,
                        relig_color: +d.relig_color,
                        relig_men: +d.relig_men,
                        relig_woman: +d.relig_woman,
                        social_color: +d.social_color,
                        social_men: +d.social_men,
                        social_woman: +d.social_woman,
                        finstab_color: +d.finstab_color,
                        finstab_men: +d.finstab_men,
                        finstab_woman: +d.finstab_woman,
                        conservatism_color: +d.conservatism_color,
                        conservatism_men: +d.conservatism_men,
                        conservatism_woman: +d.conservatism_woman,
                        trust_color: +d.trust_color,
                        trust_men: +d.trust_men,
                        trust_woman: +d.trust_woman,
                    };
                }
            });
            setFilteredData(dataMap);
        }
    }, [selectedYear, selectedAgeGroup, variable, data]);

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', 1200)
            .attr('height', 800);

        const g = svg.append('g');

        const projection = geoMercator()
            .center([20, 52])
            .scale(800)
            .translate([600, 350]);

        const path = geoPath().projection(projection);

        const womenColorScale = d3.scaleSequential()
            .domain([1, 7])
            .interpolator(d3.interpolateRgbBasis(['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801']));

        const menColorScale = d3.scaleSequential()
            .domain([1, 7])
            .interpolator(d3.interpolateRgbBasis(['#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d']));

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background', '#fff')
            .style('border', '1px solid #ccc')
            .style('padding', '10px')
            .style('border-radius', '4px')
            .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.5)');

        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(geoData => {
            const paths = g.selectAll('path')
                .data(geoData.features)
                .enter().append('path')
                .attr('d', path)
                .attr('stroke', 'white')
                .attr('stroke-width', 1.5)
                .on('mouseover', function(event, d) {
                    d3.select(this).attr('fill', '#6e6e6e');
                    const countryName = d.properties.name;
                    const countryData = filteredData[countryName];
                    if (countryData) {
                        tooltip.html(`<strong>${countryName}</strong><br>
                            ${variable} Men: ${countryData[`${variable}_men`]}<br>
                            ${variable} Women: ${countryData[`${variable}_woman`]}`)
                            .style('visibility', 'visible');
                    }
                })
                .on('mousemove', function(event) {
                    tooltip.style('top', (event.pageY - 10) + 'px')
                        .style('left', (event.pageX + 10) + 'px');
                })
                .on('mouseout', function(event, d) {
                    updateMapColors(); 
                    tooltip.style('visibility', 'hidden');
                });

            g.selectAll('text')
                .data(geoData.features)
                .enter()
                .append('text')
                .attr('x', d => path.centroid(d)[0])
                .attr('y', d => path.centroid(d)[1])
                .text(d => d.properties.name)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('font-size', 11)
                .style('fill', 'black');

            // Clear previous legend if it exists
            svg.select('.legend-frame').remove();

            const legendFrame = svg.append('g')
                .attr('transform', 'translate(900, 700)')
                .attr('class', 'legend-frame');

            legendFrame.append('rect')
                .attr('width', 250)
                .attr('height', 90)
                .attr('fill', '#f0f0f0')
                .attr('stroke', 'black')
                .attr('stroke-width', 1.5);

            const legend = legendFrame.append('g')
                .attr('transform', 'translate(10, 10)');

            const legendData = [
                { label: 'Women', colors: ['#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'] },
                { label: 'Men', colors: ['#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'] }
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
                    const countryData = filteredData[countryName];
                    if (countryData) {
                        const colorValue = countryData[`${variable}_color`];
                        if (colorValue >= 1 && colorValue <= 7) {
                            return menColorScale(8 - colorValue); // Invert scale for men: 7 becomes 1 (dark purple)
                        } else if (colorValue >= 8 && colorValue <= 14) {
                            return womenColorScale(colorValue - 7); // Shift scale for women: 8 becomes 1 (dark orange)
                        }
                    }
                    return '#cccccc'; // Default color for countries without data
                });
            };

            updateMapColors();
        });

    }, [selectedYear, selectedAgeGroup, variable, filteredData]);

    return (
        <div>
            <div className="flex gap-x-3 mb-4">
                <select
                    onChange={(e) => setSelectedAgeGroup(e.target.value)}
                    value={selectedAgeGroup}
                    className="text-white font-bold py-2 px-4 rounded bg-gray-600"
                >
                    {ageGroups.map(ageGroup => (
                        <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                    ))}
                </select>
            </div>
            <svg ref={ref} />
            <div className="slider-container" style={{ width: '960px', margin: '0 auto', marginTop: '20px' }}>
                <Slider
                    min={2002}
                    max={2020}
                    step={2}
                    marks={{
                        2002: '2002',
                        2004: '2004',
                        2006: '2006',
                        2008: '2008',
                        2010: '2010',
                        2012: '2012',
                        2014: '2014',
                        2016: '2016',
                        2018: '2018',
                        2020: '2020'
                    }}
                    defaultValue={2002}
                    onChange={(value) => setSelectedYear(value)}
                />
            </div>
        </div>
    );
}

export default MapComponent;
