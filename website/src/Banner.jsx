import React, { useState } from "react";

const Banner = ({ setVariable }) => {
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
      ? "bg-white text-blue-800 font-bold py-2 px-10 rounded border-2 border-white shadow-md"
      : "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-10  rounded shadow-md";

  const handleMouseEnter = (category) => {
    setHovered(category);
  };

  const handleMouseLeave = () => {
    setHovered("");
  };

  return (
    <div className="bg-[#00006e] text-white fixed top-0 w-full flex justify-around items-center p-4 z-50 font-bespoke font-medium">
      {Object.keys(categories).map((category) => (
        <div
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <button
            id={`btn-${category}`}
            className={buttonClass(category)}
            onClick={() => handleButtonClick(category)}
          >
            {labels[category]}
          </button>
          {hovered === category && (
            <div
              className="absolute mt-4 bg-white text-black rounded shadow-lg text-left pl-3 p-2 font-bespoke font-light"
              style={{
                width:
                  category === "wellbeing" || category === "trust"
                    ? "150%"
                    : "200%",
                maxWidth: "300px",
                left:
                  category === "trust"
                    ? "auto"
                    : category === "wellbeing"
                    ? "0"
                    : "50%",
                right: category === "trust" ? "0" : "auto",
                transform:
                  category === "wellbeing"
                    ? "none"
                    : category === "trust"
                    ? "none"
                    : "translateX(-50%)",
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
  );
};

export default Banner;
