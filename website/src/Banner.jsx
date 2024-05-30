import React, { useState } from "react";

const Banner = ({ setVariable, showBanner }) => {
  const [selected, setSelected] = useState("wellbeing");
  const [hovered, setHovered] = useState("");

  const categories = {
    wellbeing: [
      { key: "happy", description: "how happy are you?" },
      { key: "health", description: "how healthy are you?" },
      { key: "safety", description: "how concern about safety after dark?" },
      { key: "satisfaction", description: "how satisfied are you with life?" },
    ],
    internet: [
      { key: "netuse", description: "personal internet use, how often?" },
      { key: "netuseofc", description: "internet use, how often?" },
    ],
    relig: [
      { key: "pray", description: "how often do you pray?" },
      {
        key: "rgattend",
        description: "how often do you attend religious services?",
      },
      { key: "religiosity", description: "how religious are you?" },
    ],
    social: [
      {
        key: "socact",
        description: "how often do you take part in social activities?",
      },
      {
        key: "socmeet",
        description: "how often you meet with friends and relatives?",
      },
      {
        key: "intpers",
        description:
          "how many people you discuss intimate and personal matters?",
      },
    ],
    finstab: [
      { key: "incfeel", description: "feeling about household’s income?" },
      {
        key: "inccomp",
        description: "household's total net income, all sources (deciles)",
      },
    ],
    conservatism: [
      {
        key: "polviews",
        description: "political views, liberal to conservative scale?",
      },
      {
        key: "govtrole",
        description: "role of government in individuals’ lives?",
      },
      { key: "tradvalues", description: "importance of traditional values?" },
    ],
    trust: [
      { key: "trustpeople", description: "general trust in people" },
      { key: "trustgov", description: "trust in government" },
      { key: "trustmedia", description: "trust in media" },
    ],
  };

  const labels = {
    wellbeing: "Wellbeing",
    internet: "Internet",
    relig: "Religion",
    social: "Social",
    finstab: "Financial Stability",
    conservatism: "Conservatism",
    trust: "Trust",
  };

  const handleButtonClick = (variable) => {
    setVariable(variable);
    setSelected(variable);
  };

  const buttonClass = (variable) =>
    selected === variable
      ? "bg-yellow-300 text-blue-800 font-bold py-2 px-3 rounded shadow-md"
      : "bg-[#04349c] hover:bg-[#04349c] text-white font-bold py-2 px-3 rounded shadow-md";

  const handleMouseEnter = (category) => {
    setHovered(category);
  };

  const handleMouseLeave = () => {
    setHovered("");
  };

  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50">
      {!showBanner && (
        <div className="flex items-center text-blue-500 p-2 transition-transform duration-500 ease-in-out">
          <div className="flex items-center animate-pulse">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-sm">Categories</span>
          </div>
        </div>
      )}
      <div
        className={`bg-transparent text-white h-auto flex flex-col justify-start items-start p-2 font-bespoke font-medium space-y-4 w-40 transition-transform duration-500 ease-in-out ${
          showBanner ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {Object.keys(categories).map((category) => (
          <div
            key={category}
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full"
          >
            <button
              id={`btn-${category}`}
              className={buttonClass(category) + " w-full text-left"}
              onClick={() => handleButtonClick(category)}
            >
              {labels[category]}
            </button>
            {hovered === category && (
              <div
                className="absolute mt-2 bg-[#4f71ba] text-white rounded shadow-2xl text-left font-bespoke font-light ml-3 p-3"
                style={{
                  width: "200%",
                  maxWidth: "300px",
                  left: "100%",
                  top: "-50%",
                }}
              >
                Index based on:
                <ul className="list-disc pl-5">
                  {categories[category].map((variable) => (
                    <li key={variable.key} className="">
                      {variable.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
