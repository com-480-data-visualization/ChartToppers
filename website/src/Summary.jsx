import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Summary = ({ variable }) => {
  return (
    <div className="summary-section w-3/4 mb-24 mx-auto">
      <h2 className="text-3xl w-full text-center font-bespoke font-medium">Summary of Categories</h2>
      <div className="categories-container grid grid-cols-4 gap-4 mt-10">
        <div className="category-box bg-yellow-200   p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Wellbeing</h3>
          <p>Exploring the overall happiness and life satisfaction of individuals.</p>
        </div>
        <div className="category-box bg-[#04349c] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Internet</h3>
          <p>Understanding internet usage patterns and its impact on daily life.</p>
        </div>
        <div className="category-box bg-yellow-200   p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Religion</h3>
          <p>Analyzing the role of religion in modern society.</p>
        </div>
        <div className="category-box bg-[#04349c] text-white p-6 rounded ">
          <h3 className="text-xl font-bespoke font-medium">Social</h3>
          <p>Examining social interactions and community involvement.</p>
        </div>
      </div>
      <div className="categories-container grid grid-cols-3 gap-4 mt-10 text-black">
        <div className="category-box bg-yellow-200 p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Financial Stability</h3>
          <p>Assessing financial health and stability of households.</p>
        </div>
        <div className="category-box bg-[#04349c] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Conservatism</h3>
          <p>Investigating political conservatism and its influence on policies.</p>
        </div>
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Trust</h3>
          <p>Measuring trust in institutions and interpersonal trust.</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
