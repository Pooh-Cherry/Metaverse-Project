import React from "react";

const DropdownArrowIcon = ({
  width = 18,
  height = 11,
  color = "black",
  opacity = 1,
  rotate = 0,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        transform={`rotate(${rotate}, 9, 5)`}
        d="M9.89844 0.601562L17.3984 8.10156C17.9063 8.57031 17.9063 9.39062 17.3984 9.85937C16.9297 10.3672 16.1094 10.3672 15.6406 9.85937L9 3.25781L2.39844 9.85937C1.92969 10.3672 1.10938 10.3672 0.640626 9.85937C0.132813 9.39062 0.132813 8.57031 0.640626 8.10156L8.14063 0.601562C8.60938 0.0937491 9.42969 0.0937492 9.89844 0.601562Z"
        fill={color}
      />
    </svg>
  );
};

export default DropdownArrowIcon;
