import React from 'react';
import Example from './Example'; // Assuming Example.js is correctly set up
import MapComponent from './MapComponent'; // Import the MapComponent

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Example /> {/* So here we can add components, parts of the website, visualizations like this */}
      <MapComponent /> {/* This adds the map to your application */}
    </div>
  );
}

export default App;