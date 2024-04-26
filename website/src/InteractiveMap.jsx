import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const InteractiveMap = () => {
    const [mapData, setMapData] = useState(null);
    const mapRef = useRef();

    useEffect(() => {
        fetch('europe.topojson')
            .then(response => response.json())
            .then(topojsonData => {
                setMapData(feature(topojsonData, topojsonData.objects.countries));
            })
            .catch(error => console.error('Error loading the map data: ', error));
    }, []);

    useEffect(() => {
        if (!mapData) return;

        const svg = d3.select(mapRef.current);
        const projection = geoMercator().scale(700).center([20, 60]);
        const pathGenerator = geoPath().projection(projection);

        svg.selectAll('.country')
            .data(mapData.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', 'grey')
            .attr('stroke', 'white');

    }, [mapData]);

    return( 
    <div>
        <svg ref={mapRef} style={{ width: '100%', height: 'auto' }}></svg>
        <p>This is an interactive map</p>
    </div>
    
    );
};

export default InteractiveMap;
