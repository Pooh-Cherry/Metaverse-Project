import React from "react";

const IntegrationIcon = ({
  width = 18,
  height = 20,
  color = "white",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M3.75 0.5C4.41406 0.5 5 1.08594 5 1.75V5.5H2.5V1.75C2.5 1.08594 3.04688 0.5 3.75 0.5ZM11.25 0.5C11.9141 0.5 12.5 1.08594 12.5 1.75V5.5H10V1.75C10 1.08594 10.5469 0.5 11.25 0.5ZM1.25 6.75H13.75C14.4141 6.75 15 7.33594 15 8C15 8.70312 14.4141 9.25 13.75 9.25V10.5C13.75 13.5469 11.6016 16.0469 8.75 16.6328V19.25C8.75 19.9531 8.16406 20.5 7.5 20.5C6.79688 20.5 6.25 19.9531 6.25 19.25V16.6328C3.39844 16.0469 1.25 13.5469 1.25 10.5V9.25C0.546875 9.25 0 8.70312 0 8C0 7.33594 0.546875 6.75 1.25 6.75Z"
        fill={color}
      />
    </svg>
  );
};

export default IntegrationIcon;
