import React, { useState } from "react";

const Banner = ({ setVariable }) => {
  const [selected, setSelected] = useState("wellbeing");

  const handleButtonClick = (variable) => {
    setVariable(variable);
    setSelected(variable);
  };

  const buttonClass = (variable) =>
    selected === variable
      ? "bg-white text-blue-800 font-bold py-2 px-6 rounded border-2 border-white"
      : "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded border-2 border-white";

  return (
    <div className="bg-[#00006e] text-white fixed top-0 w-full flex justify-around items-center p-4 z-50">
      <button
        id="btn-1"
        className={buttonClass("wellbeing")}
        onClick={() => handleButtonClick("wellbeing")}
      >
        Wellbeing
      </button>
      <button
        id="btn-2"
        className={buttonClass("internet")}
        onClick={() => handleButtonClick("internet")}
      >
        Internet
      </button>
      <button
        id="btn-3"
        className={buttonClass("relig")}
        onClick={() => handleButtonClick("relig")}
      >
        Religion
      </button>
      <button
        id="btn-4"
        className={buttonClass("social")}
        onClick={() => handleButtonClick("social")}
      >
        Social
      </button>
      <button
        id="btn-5"
        className={buttonClass("finstab")}
        onClick={() => handleButtonClick("finstab")}
      >
        Financial Stability
      </button>
      <button
        id="btn-6"
        className={buttonClass("conservatism")}
        onClick={() => handleButtonClick("conservatism")}
      >
        Conservatism
      </button>
      <button
        id="btn-7"
        className={buttonClass("trust")}
        onClick={() => handleButtonClick("trust")}
      >
        Trust
      </button>
    </div>
  );
};

export default Banner;
