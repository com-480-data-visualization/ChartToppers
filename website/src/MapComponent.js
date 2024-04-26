import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomMapPanes = () => {
  useEffect(() => {
    const map = L.map('custom-map', {
      center: [50.1109, 10.1503], // Center the map over Europe
      zoom: 6
    });

    // Create a custom pane for labels
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';  // Allow click events to pass through to the base map

    // Basemap without labels
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap, © CartoDB'
    }).addTo(map);

    // Labels only layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap, © CartoDB',
      pane: 'labels'
    }).addTo(map);

    return () => map.remove();  // Clean up the map when the component unmounts
  }, []);

  return <div id="custom-map" style={{ height: '400px', width: '100%' }}></div>;
};

export default CustomMapPanes;
