import propTypes from 'prop-types';
import React from 'react';
import './AgeBar.scss';

// This rendering might be needed to be ported to SVG (and perhaps d3) if the requirements get more complicated
const AgeBar = ({ min, max, globalMin, globalMax }) => {
  const relativeMax = (max - globalMin) / (globalMax - globalMin);
  const relativeMin = (min - globalMin) / (globalMax - globalMin);
  const minPercentage = relativeMin * 100;
  const maxPercentage = relativeMax * 100;
  // The CSS clip-path property determines the extent of the visualized Age
  const clipPath = `polygon(${minPercentage}% 0%, ${minPercentage}% 100%, ${maxPercentage}% 100%, ${maxPercentage}% 0%)`;
  return (
    <div className="AgeBar">
      <div
        className="AgeBarContent"
        style={{
          clipPath,
          WebkitClipPath: clipPath,
        }}
      />
      <div className="Numbers">
        <div className="Number" style={{ left: `${relativeMin * 100}%` }}>
          {Math.round(min)}
        </div>
        {// Corner-case: min and max are equal
        max !== min && (
          <div className="Number" style={{ left: `${relativeMax * 100}%` }}>
            {Math.round(max)}
          </div>
        )}
      </div>
    </div>
  );
};

AgeBar.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
  globalMin: propTypes.number,
  globalMax: propTypes.number,
};

export default AgeBar;
