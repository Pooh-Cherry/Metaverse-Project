import React from "react";

const InboxIcon = ({ width = 20, height = 20, color = "white" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4609 1.72656L19.8438 11.4141C19.9219 11.8047 20 12.2344 20 12.625V16.375C20 17.4297 19.1406 18.25 18.125 18.25H1.875C0.820312 18.25 0 17.4297 0 16.375V12.625C0 12.2344 0.0390625 11.8047 0.117188 11.4141L2.5 1.6875C2.65625 1.14062 3.16406 0.75 3.75 0.75H16.25C16.7969 0.75 17.3047 1.14062 17.4609 1.72656ZM13.75 13.25L15 10.75H17.1484L15.2734 3.25H4.72656L2.8125 10.75H5L6.25 13.25H13.75Z"
        fill={color}
      />
    </svg>
  );
};

export default InboxIcon;
