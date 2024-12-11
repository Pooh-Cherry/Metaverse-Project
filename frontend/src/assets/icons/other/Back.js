import React from "react";

const BackIcon = ({
  width = 16,
  height = 16,
  color = "black",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#212121"
      gradientcolor1="#212121"
      gradientcolor2="#212121"
    >
      <path
        opacity={opacity}
        d="M10.733 19.79a.75.75 0 0 0 1.034-1.085L5.516 12.75H20.25a.75.75 0 0 0 0-1.5H5.516l6.251-5.955a.75.75 0 0 0-1.034-1.086l-7.42 7.067a.995.995 0 0 0-.3.58.753.753 0 0 0 .001.289.995.995 0 0 0 .3.579l7.419 7.067Z"
        fill={color}
      ></path>
    </svg>
  );
};

export default BackIcon;
