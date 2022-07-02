import React from "react";
import "./section.scss";

const Section = ({ title }) => {
  return (
    <div className="section">
      <div className="section__content">{title}</div>
      <div className="section__line"></div>
    </div>
  );
};

export default Section;
