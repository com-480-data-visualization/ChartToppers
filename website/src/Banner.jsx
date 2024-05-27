import React from "react";

const Banner = ({ setVariable }) => {
  return (
    <div className="bg-gray-800 text-white fixed top-0 w-full flex justify-around items-center p-4 z-50">
      <button
        id="btn-1"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("wellbeing")}
      >
        Wellbeing
      </button>
      <button
        id="btn-2"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("internet")}
      >
        Internet
      </button>
      <button
        id="btn-3"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("relig")}
      >
        Religion
      </button>
      <button
        id="btn-4"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("social")}
      >
        Social ?
      </button>
      <button
        id="btn-5"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("finstab")}
      >
        Financial Stability
      </button>
      <button
        id="btn-6"
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("conservatism")}
      >
        Conservatism
      </button>
      <button
        id="btn-7"
        className=" bg-lime-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setVariable("trust")}
      >
        Trust
      </button>
    </div>
  );
};

export default Banner;
