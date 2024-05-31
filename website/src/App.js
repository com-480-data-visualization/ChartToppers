import { useEffect, useRef, useState } from "react";
import Example from "./Example";
import "./App.css";
import Banner from "./Banner";
import BarChart from "./BarChart";
import GraphTest from "./GraphTest";
import MapComponent from "./MapComponent";
import "./fonts.css"; // Import the custom font CSS file
import Summary from "./Summary";

function App() {
  const [variable, setVariable] = useState("wellbeing");
  const [showBanner, setShowBanner] = useState(false);
  const [theme, setTheme] = useState("light");
  const headerRef = useRef(null);

  const handleMouseMove = (e) => {
    const screenWidth = window.innerWidth;
    if (e.clientX < screenWidth / 5) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <Banner setVariable={setVariable} showBanner={showBanner} />
      <button onClick={toggleTheme} className="theme-toggle">
        Night Mode
      </button>
      <header
        ref={headerRef}
        className={`App-header p-6 ${
          theme === "light"
            ? "bg-gradient-to-b from-yellow-300 via-yellow-100 to-white"
            : "bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"
        }`}
      >
        <p
          className={`font-bespoke font-regular mx-8 mt-10 text-7xl w-3/4 ${
            theme === "light" ? "text-[#00006e]" : "text-yellow-100"
          }`}
        >
          How Are European Views on Politics and Society Changing?
        </p>
        <div className="description">
          <p
            className={`font-bespoke font-light text-justify text-2xl mt-10 ${
              theme === "light" ? "text-[#00006e]" : "text-yellow-100"
            }`}
          >
            Inspired by an Economist article on the growing divide between young
            men and women, this project dives into the European Social Survey
            (ESS) to explore how beliefs, behavior, and life outcomes vary by
            generation and gender.
          </p>
          <p
            className={`font-bespoke font-light mt-4 text-justify text-2xl ${
              theme === "light" ? "text-[#00006e]" : "text-yellow-100"
            }`}
          >
            We'll be probing for trends in everything from religious activity to
            financial stability. Our goal? To create accessible and informative
            visualizations that distill a sprawling survey into valuable
            insights – and hopefully spark a conversation about European
            society’s future along the way. Throughout this page, we visualize
            average indices representing seven different categories concerning the lives of
            Europeans. Navigate your curser to the left to see possibilities.
            Each category’s average index is created by scaling responses for a set of
            ESS questions between 1 (low) and 6 (high) before aggregating
            by gender, age, and/or year. Hover over a category to see the set of
            survey questions that inform a category's average index.
          </p>
        </div>
      </header>

      <section className="section">
        <h2 className="text-3xl w-full text-center font-bespoke font-medium">
          Setting the Stage: Exploring European Preferences by Age Group
        </h2>
        <p className="w-3/4 mt-10 text-container font-bespoke font-light text-justify">
          We begin with a Europe-wide snapshot. The bar chart below displays the
          average level of a chosen category’s index for four different age
          groups over time. It should help you orient yourself with overall
          trends before exploring differences between men and women.
        </p>
        <BarChart variable={variable} />
      </section>

      <section className="section">
        <h2 className="text-3xl w-full text-center font-bespoke font-medium">
          Zooming In: Gender Comparison Within European Nations
        </h2>
        <p className="w-3/4 mt-10 text-container font-bespoke font-light text-justify">
          Next, we zoom in to see how men and women compare across Europe. This
          choropleth uses color to show where women or men report higher levels
          of a chosen category’s index. The darker the shade of blue, the higher
          the category’s index is for men relative to women (vice versa for
          orange and women relative to men). At the bottom, you can select an
          age group and drag the year slider to slice the index in different
          ways. Hover over a country to see a detailed breakdown by year.
        </p>
        <div id="map">
          <MapComponent variable={variable} />
        </div>
      </section>

      <section className="section">
        <h2 className="text-3xl w-full text-center font-bespoke font-medium">
          Ranking the Gender Divide Across Europe
        </h2>
        <p className="text-base w-3/4 mt-10 text-container font-bespoke font-light text-justify">
          Our final view lets you compare countries side-by-side and observe 
          averages by gender over time. It ranks countries based on the chosen 
          category's gender gap in a specific year. Hover over a dot to see the 
          country’s exact index values and how the gender gap breaks down by age group.
        </p>
        <GraphTest variable={variable} />
      </section>
      <p className="text-lg w-3/4 mt-10 text-center font-bespoke font-light"><br></br><br></br><br></br>We hope you enjoyed this study of Europeans male, female, young, and old! <br></br><br></br>Remember to select another category on the left and continue investigating!</p>
      <section className="App-header">
        <Summary />
      </section>
    </div>
  );
}

export default App;
