import React from "react";

const VhistoryIcon = ({
  width = 20,
  height = 21,
  color = "black",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M2.92969 3.42969C4.72656 1.63281 7.22656 0.5 10 0.5C15.5078 0.5 20 4.99219 20 10.5C20 16.0469 15.5078 20.5 10 20.5C7.85156 20.5 5.89844 19.8359 4.25781 18.7422C3.71094 18.3125 3.55469 17.5312 3.94531 16.9844C4.33594 16.3984 5.11719 16.2812 5.70312 16.6719C6.91406 17.5312 8.39844 18 10 18C14.1406 18 17.5 14.6406 17.5 10.5C17.5 6.35938 14.1406 3 10 3C7.92969 3 6.05469 3.85938 4.6875 5.22656L5.89844 6.39844C6.48438 7.02344 6.05469 8 5.23438 8H0.9375C0.390625 8 0 7.60938 0 7.0625V2.76562C0 1.94531 0.976562 1.51562 1.60156 2.10156L2.92969 3.42969ZM10 5.5H9.96094C10.5078 5.5 10.8984 5.92969 10.8984 6.4375V10.1484L13.4375 12.6875C13.8281 13.0391 13.8281 13.625 13.4375 13.9766C13.0859 14.3672 12.5 14.3672 12.1484 13.9766L9.33594 11.1641C9.14062 11.0078 9.0625 10.7734 9.0625 10.5V6.4375C9.0625 5.92969 9.45312 5.5 10 5.5Z"
        fill={color}
      />
    </svg>
  );
};

export default VhistoryIcon;