import React from 'react';
import Example from './Example'; // Assuming Example.js is correctly set up
import MapComponent from './MapComponent'; // Import the MapComponent
import './App.css'; // Ensure App.css is correctly imported

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, World!</h1>
      </header>
      <div className="component-container">
        <Example /> {/* So here we can add components, parts of the website, visualizations like this */}
      </div>
      <div className="map-container">
        <MapComponent /> {/* This adds the map to your application */}
      </div>
    </div>
  );
}

export default App;
