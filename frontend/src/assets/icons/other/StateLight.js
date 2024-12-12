import React from "react";

const StateLightIcon = ({
  width = 5,
  height = 5,
  color = "#0066FF",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity={opacity} cx="2.5" cy="2.5" r="2.5" fill={color} />
    </svg>
  );
};

export default StateLightIcon;
