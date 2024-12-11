import React from "react";

const RightVectorIcon = ({
  width = 11,
  height = 19,
  color = "black",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M10.1094 8.64062C10.6172 9.10938 10.6172 9.92969 10.1094 10.3984L2.60938 17.8984C2.14062 18.4062 1.32031 18.4062 0.851562 17.8984C0.34375 17.4297 0.34375 16.6094 0.851562 16.1406L7.45312 9.5L0.851562 2.89844C0.34375 2.42969 0.34375 1.60938 0.851562 1.14062C1.32031 0.632812 2.14062 0.632812 2.60938 1.14062L10.1094 8.64062Z"
        fill="black"
      />
    </svg>
  );
};

export default RightVectorIcon;
