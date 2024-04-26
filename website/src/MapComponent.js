import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([50.1109, 10.1503], 4); // Coordinates for the center of Europe and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([50.1109, 10.1503]).addTo(map);
    marker.bindPopup('<b>Hello from Europe!</b>').openPopup();

    // Cleanup on component unmount
    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
