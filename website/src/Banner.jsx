import React, { useState } from "react";

const Banner = ({ setVariable, showBanner }) => {
  const [selected, setSelected] = useState("wellbeing");
  const [hovered, setHovered] = useState("");

  const categories = {
    wellbeing: [
      { key: "happy", description: "Are you happy?" },
      { key: "health", description: "Are you healthy?" },
      { key: "safety", description: "Are you satisfied with your life?" },
      { key: "satisfaction", description: "How safe do you feel outside after dark?" },
    ],
    internet: [
      { key: "netuse", description: "How often do you use the internet?" },
    ],
    relig: [
      { key: "pray", description: "How often do you pray?" },
      {
        key: "rgattend",
        description: "How often do you attend religious services?",
      },
      { key: "religiosity", description: "How religious are you?" },
    ],
    social: [
      {
        key: "socact",
        description: "How often do you take part in social activities relative to others your age?",
      },
      {
        key: "socmeet",
        description: "How often do you meet socially with friends, relatives, or colleagues?",
      },
    ],
    finstab: [
      { key: "incfeel", description: "How good do you feel about your income?" },
      {
        key: "inccomp",
        description: "How high is your income bracket?",
      },
    ],
    conservatism: [
      {
        key: "polviews",
        description: "How conservative are you?",
      },
    ],
    trust: [
      { key: "trustpeople", description: "How much trust do you have in in the legal system?" },
      { key: "trustgov", description: "How much trust do you have in the police?" },
      { key: "trustmedia", description: "How much trust do you have in parliament?" },
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
        <div className='flex items-center text-[#04349c] p-2 transition-transform duration-500 ease-in-out'>
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
            <span className="text-md">Categories</span>
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
