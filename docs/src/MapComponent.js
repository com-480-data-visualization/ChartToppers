import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3-geo';
import { json } from 'd3-fetch';

const MapComponent = () => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', 800)
            .attr('height', 600)
            .append('g');

        const projection = geoMercator()
            .center([20, 52]) // Approximate center of Europe
            .scale(600)
            .translate([400, 300]);

        const path = geoPath().projection(projection);

        json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
            svg.selectAll('path')
                .data(data.features)
                .enter().append('path')
                .attr('fill', '#cccccc')
                .attr('d', path)
                .attr('stroke', 'white')
                .attr('stroke-width', 1.5)
                .on('mouseover', function(event, d) {
                    d3.select(this).attr('fill', '#6e6e6e');
                })
                .on('mouseout', function(event, d) {
                    d3.select(this).attr('fill', '#cccccc');
                });

            svg.selectAll('text')
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
        });

    }, []);

    return <svg ref={ref} />;
}

export default MapComponent;
