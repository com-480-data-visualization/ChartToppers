import React from "react";
import Example from "./Example"; // Assuming Example.js is correctly set up
import MapComponent from "./MapComponent"; // Import the MapComponent
import "./App.css"; // Ensure App.css is correctly imported
import GraphComponent from "./GraphComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 class="text-5xl w-96">
          How Are European Views on Politics and Society Changing?
        </h1>
        <div class=" text-base w-3/4 mt-10">
          <p>
            Across Europe, a quiet change is brewing. Inspired by an Economist
            article on the growing divide between young men and women, this
            project dives into the European Social Survey (ESS) to explore how
            social norms and political attitudes vary by generation and gender.
          </p>
          <p>
            We'll be looking beyond just education and politics, examining
            everyday habits like media consumption and life situations like
            financial stress to see if they create these differences. Our goal?
            To create an accessible and informative visualization that sheds
            light on these trends, sparking a conversation about where European
            society might be headed.
          </p>
        </div>
      </header>
      <div className="map-container">
        <MapComponent /> {/* This adds the map to your application */}
      </div>
      <div className="component-container">
        <GraphComponent />{" "}
        {/* So here we can add components, parts of the website, visualizations like this */}
      </div>
    </div>
  );
}

export default App;
