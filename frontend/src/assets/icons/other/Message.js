import React from "react";

const MessageIcon = ({ width = 18, height = 19, color = "black" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 0.25H15.75C16.9805 0.25 18 1.26953 18 2.5V12.625C18 13.8906 16.9805 14.875 15.75 14.875H10.8633L6.50391 18.1445C6.32812 18.2852 6.11719 18.2852 5.90625 18.2148C5.73047 18.1094 5.625 17.9336 5.625 17.6875V14.875H2.25C0.984375 14.875 0 13.8906 0 12.625V2.5C0 1.26953 0.984375 0.25 2.25 0.25Z"
        fill={color}
      />
    </svg>
  );
};

export default MessageIcon;
