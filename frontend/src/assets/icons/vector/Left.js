import React from "react";

const LeftVectorIcon = ({
  width = 12,
  height = 19,
  color = "#94A3B8",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M1.35156 8.64062L8.85156 1.14062C9.32031 0.632812 10.1406 0.632812 10.6094 1.14062C11.1172 1.60938 11.1172 2.42969 10.6094 2.89844L4.00781 9.5L10.6094 16.1406C11.1172 16.6094 11.1172 17.4297 10.6094 17.8984C10.1406 18.4062 9.32031 18.4062 8.85156 17.8984L1.35156 10.3984C0.84375 9.92969 0.84375 9.10938 1.35156 8.64062Z"
        fill={color}
      />
    </svg>
  );
};

export default LeftVectorIcon;
