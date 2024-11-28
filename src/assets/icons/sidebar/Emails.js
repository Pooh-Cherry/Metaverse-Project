import React from "react";

const EmailsIcon = ({ width = 24, height = 25, color = "#E2E8F0" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      color={color}
      viewBox="0 0 24 24"
      aria-label="Email Icon"
    >
      {/* Envelope Outline */}
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        ry="2"
        fill="#f0f0f0"
        stroke="#333"
        strokeWidth="1"
      />
      {/* Email Flap */}
      <polygon
        points="2,4 12,13 22,4"
        fill="#cccccc"
        stroke="#333"
        strokeWidth="1"
      />
      {/* Bottom Line */}
      <line x1="2" y1="20" x2="22" y2="20" stroke="#333" strokeWidth="1" />
      {/* Text (Optional, for accessibility) */}
      <text
        x="12"
        y="18"
        fontSize="2"
        textAnchor="middle"
        fill="black"
        fontFamily="Arial, sans-serif"
      >
        Email
      </text>
    </svg>
  );
};

export default EmailsIcon;
