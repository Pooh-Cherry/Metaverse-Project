import React from "react";

const MoreIcon = ({
  width = 20,
  height = 20,
  color = "#292D32",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M15.6992 3.49805L10.5723 8.625L15.6992 13.8008C16.334 14.3867 16.334 15.4121 15.6992 15.998C15.1133 16.6328 14.0879 16.6328 13.502 15.998L8.375 10.8711L3.19922 15.998C2.61328 16.6328 1.58789 16.6328 1.00195 15.998C0.367188 15.4121 0.367188 14.3867 1.00195 13.8008L6.12891 8.625L1.00195 3.49805C0.367188 2.91211 0.367188 1.88672 1.00195 1.30078C1.58789 0.666016 2.61328 0.666016 3.19922 1.30078L8.375 6.42773L13.502 1.30078C14.0879 0.666016 15.1133 0.666016 15.6992 1.30078C16.334 1.88672 16.334 2.91211 15.6992 3.49805Z"
        fill={color}
      />
    </svg>
  );
};

export default MoreIcon;
