import { useEffect, useRef, useState } from "react";
import Example from "./Example"; 
import "./App.css"; 
import Banner from "./Banner";
import BarChart from "./BarChart";
import GraphTest from "./GraphTest";
import MapComponent from "./MapComponent"; 
import './fonts.css'; // Import the custom font CSS file

function App() {

  const [variable, setVariable] = useState("wellbeing");

  return (
    <div className="App">
      <Banner setVariable={setVariable} />
      <header className="App-header bg-gradient-to-b from-yellow-300 via-yellow-100 to-white p-6">
        <p className="font-bespoke font-regular mx-8 mt-20 text-7xl w-3/4 text-[#00006e]">
          How Are European Views on Politics and Society Changing?
        </p>
        <div className="description">
          <p className="font-bespoke font-light text-[#00006e]">
            Across Europe, a quiet change is brewing. Inspired by an Economist
            article on the growing divide between young men and women, this
            project dives into the European Social Survey (ESS) to explore how
            social norms and political attitudes vary by generation and gender.
          </p>
          <p className="font-bespoke font-light mt-6 text-[#00006e]">
            We'll be looking beyond just education and politics, examining
            everyday habits like media consumption and life situations like
            financial stress to see if they create these differences. Our goal?
            To create an accessible and informative visualization that sheds
            light on these trends, sparking a conversation about where European
            society might be headed.
          </p>
        </div>
      </header>

      <section className="section">
        <h2 className="text-3xl w-96 ml-7 mt-5 font-bespoke font-medium">
          1. Bar Chart: Setting the Stage
        </h2>
        <p className="text-base w-3/4 mt-10 text-container font-bespoke font-light">
          Our journey starts with a Europe-wide snapshot. This bar chart shows
          average levels of a chosen variable (like trust in institutions) for
          four different age groups over time. This helps you get a feel for
          overall trends before we explore how these trends differ for men and
          women.
        </p>
        <div >
          <BarChart variable={variable} />
        </div>
      </section>

      <section className="section">
        <h2 className="text-3xl w-96 ml-7 mt-5 font-bespoke font-medium">
          2. Gender Divide Across Europe
        </h2>
        <p className="text-base w-3/4 mt-10 text-container font-bespoke font-light">
          Next, we zoom in to see how men and women compare across Europe. This
          heatmap uses color to show where women or men report higher levels of a
          chosen variable, like political participation. You can select an age
          group and drag the year slider to see how these differences change over
          time. Hover over a country to see a detailed breakdown by year.
        </p>
        <div id="map" className="component-container">
          <MapComponent variable={variable}/>
        </div>
      </section>

      <section className="section">
        <h2 className="text-3xl w-96 ml-7 mt-5 font-bespoke font-medium">
          3. Ranking the Gender Divide
        </h2>
        <p className="text-base w-3/4 mt-10 text-container font-bespoke font-light">
          This final view lets you compare countries side-by-side. It shows a
          ranked list of European nations based on the chosen variable's gender
          gap in a specific year. Hover over a country to see the exact numbers
          and how the gap breaks down by age group. This lets you see which
          countries have the biggest differences in, for example, media
          consumption habits between men and women.
        </p>
        <div>
          <GraphTest variable={variable} />
        </div>
      </section>
    </div>
  );
}

export default App;
