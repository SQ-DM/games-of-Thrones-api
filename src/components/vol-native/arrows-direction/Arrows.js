import React from "react";
import "./Arrows.css";

const Arrows = (props) => {
  const showArrows = props.direction ? (
    <i className="arrow down"></i>
  ) : (
    <i className="arrow up"></i>
  );
  return <>{showArrows}</>;
};

export default Arrows;
