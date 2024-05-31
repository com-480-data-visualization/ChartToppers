import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


const Summary = ({ variable }) => {
  return (
    <div className="summary-section w-3/4 mb-24 mx-auto">
      <h2 className="text-3xl w-full text-center font-bespoke font-medium">Highlights</h2>
      <div className="categories-container grid grid-cols-4 gap-4 mt-10">
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Wellbeing</h3>
          <p>Wellbeing levels have shown resilience over two decades, with notable increases among older Europeans contrasted by recent declines among the youth.</p>
        </div>
        <div className="category-box bg-[#04349c] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Internet</h3>
          <p>Internet usage has surged across all demographics, reaching near parity between genders by 2020, especially in Northern and Eastern Europe.</p>
        </div>
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Religion</h3>
          <p>Religious activity has consistently declined across Europe, yet remains deeply gendered, with women persistently more devout than men.</p>
        </div>
        <div className="category-box bg-[#04349c] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Social</h3>
          <p>Social activities display minimal gender discrepancies, though regional variations suggest a complex interplay of social behaviors across Europe.</p>
        </div>
      </div>
      <div className="categories-container grid grid-cols-3 gap-4 mt-10 text-black">
        <div className="category-box bg-yellow-200 p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Financial Stability</h3>
          <p>Financial stability perceptions have improved post-2012, revealing subtle yet significant shifts without a clear correlation to gender disparities.</p>
        </div>
        <div className="category-box bg-[#04349c] text-white p-6 rounded">
          <h3 className="text-xl font-bespoke font-medium">Conservatism</h3>
          <p>Despite general stability in self-reported conservatism, the last decade has seen a subtle but steady expansion in gender differences, particularly in specific European countries.</p>
        </div>
        <div className="category-box bg-yellow-200 p-6 rounded text-black">
          <h3 className="text-xl font-bespoke font-medium">Trust</h3>
          <p>Trust in institutions has recovered from a mid-range dip, with Eastern Europe showing a more pronounced and stable gender gap favoring women's higher trust levels.</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
