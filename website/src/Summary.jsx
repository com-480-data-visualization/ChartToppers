import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


const Summary = ({ variable }) => {
  return (
    <div className="summary-section w-3/4 mb-24 mx-auto">
      <h2 className="text-3xl w-full text-center font-bespoke font-medium">Highlights</h2>
      <div className="categories-container grid grid-cols-4 gap-4 mt-10">
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Wellbeing</h3>
          <p>Wellbeing levels have shown resilience across all age cohorts over two decades - as has the higher rate of wellbeing among men relative to women.</p>
        </div>
        <div className="category-box bg-[#365db0] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Internet</h3>
          <p>Internet usage has surged across all demographics, reaching near parity between genders by 2020, especially in Northern and Eastern Europe.</p>
        </div>
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Religion</h3>
          <p>Religious activity has slowly declined across Europe, yet remains deeply gendered, with women persistently more devout than men.</p>
        </div>
        <div className="category-box bg-[#365db0] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Social</h3>
          <p>Social activities display minimal gender discrepancies, though where gender gaps do exist, the largest gaps are typically reserved for countries where men report more social activity than women.</p>
        </div>
      </div>
      <div className="categories-container grid grid-cols-3 gap-4 mt-10 text-black">
        <div className="category-box bg-yellow-200 p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Financial Stability</h3>
          <p>Financial stability perceptions have improved post-2012, revealing a significant shift without a clear correlation to gender disparities.</p>
        </div>
        <div className="category-box bg-[#365db0] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Conservatism</h3>
          <p>Despite stability in aggregate self-reported conservatism, the last few years have seen a sudden expansion in gender differences as women align with conservatism less.</p>
        </div>
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Trust</h3>
          <p>There was a time when higher trust in institutions among men relative to women implied a country’s higher trust in institutions overall. That time is no more.</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
