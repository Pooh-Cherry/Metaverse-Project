import React from "react";

const SalesIcon = ({
  width = 20,
  height = 19,
  color = "black",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M2.125 0.25H17.875C18.2969 0.25 18.7188 0.53125 18.8945 0.953125C19.0703 1.375 18.9648 1.86719 18.6484 2.18359L11.125 9.74219V16H13.375C13.9727 16 14.5 16.5273 14.5 17.125C14.5 17.7578 13.9727 18.25 13.375 18.25H10H6.625C5.99219 18.25 5.5 17.7578 5.5 17.125C5.5 16.5273 5.99219 16 6.625 16H8.875V9.74219L1.31641 2.18359C1 1.86719 0.894531 1.375 1.07031 0.953125C1.24609 0.53125 1.66797 0.25 2.125 0.25ZM7.08203 4.75H12.8828L15.1328 2.5H4.83203L7.08203 4.75Z"
        fill={color}
      />
    </svg>
  );
};

export default SalesIcon;
