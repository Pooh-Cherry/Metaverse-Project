import React from "react";

const SettingsIcon = ({ width = 25, height = 21, color = "black" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.3359 7.02344C19.4922 7.375 19.375 7.72656 19.1016 8L17.4219 9.52344C17.4609 9.83594 17.4609 10.1875 17.4609 10.5C17.4609 10.8516 17.4609 11.2031 17.4219 11.5156L19.1016 13.0391C19.375 13.2734 19.4922 13.6641 19.3359 14.0156C19.1797 14.4844 18.9844 14.9141 18.75 15.3438L18.5547 15.6562C18.2812 16.0859 18.0078 16.5156 17.6953 16.8672C17.4609 17.1797 17.0703 17.2578 16.7188 17.1406L14.5703 16.4766C14.0234 16.8672 13.4375 17.1797 12.8516 17.4531L12.3438 19.6797C12.2656 20.0312 11.9922 20.3047 11.6406 20.3828C11.0938 20.4609 10.5469 20.5 9.96094 20.5C9.41406 20.5 8.86719 20.4609 8.32031 20.3828C7.96875 20.3047 7.69531 20.0312 7.61719 19.6797L7.10938 17.4531C6.48438 17.1797 5.9375 16.8672 5.39062 16.4766L3.24219 17.1406C2.89062 17.2578 2.5 17.1797 2.26562 16.9062C1.95312 16.5156 1.67969 16.0859 1.40625 15.6562L1.21094 15.3438C0.976562 14.9141 0.78125 14.4844 0.625 14.0156C0.46875 13.6641 0.585938 13.3125 0.859375 13.0391L2.53906 11.5156C2.5 11.2031 2.5 10.8516 2.5 10.5C2.5 10.1875 2.5 9.83594 2.53906 9.52344L0.859375 8C0.585938 7.72656 0.46875 7.375 0.625 7.02344C0.78125 6.55469 0.976562 6.125 1.21094 5.69531L1.40625 5.38281C1.67969 4.95312 1.95312 4.52344 2.26562 4.13281C2.5 3.85938 2.89062 3.78125 3.24219 3.89844L5.39062 4.5625C5.9375 4.17188 6.52344 3.82031 7.10938 3.58594L7.61719 1.35938C7.69531 1.00781 7.96875 0.734375 8.32031 0.65625C8.86719 0.578125 9.41406 0.5 10 0.5C10.5469 0.5 11.0938 0.578125 11.6406 0.65625C11.9922 0.695312 12.2656 1.00781 12.3438 1.35938L12.8516 3.58594C13.4766 3.82031 14.0234 4.17188 14.5703 4.5625L16.7188 3.89844C17.0703 3.78125 17.4609 3.85938 17.6953 4.13281C18.0078 4.52344 18.2812 4.95312 18.5547 5.38281L18.75 5.69531C18.9844 6.125 19.1797 6.55469 19.375 7.02344H19.3359ZM10 13.625C11.0938 13.625 12.1094 13.0391 12.6953 12.0625C13.2422 11.125 13.2422 9.91406 12.6953 8.9375C12.1094 8 11.0938 7.375 10 7.375C8.86719 7.375 7.85156 8 7.26562 8.9375C6.71875 9.91406 6.71875 11.125 7.26562 12.0625C7.85156 13.0391 8.86719 13.625 10 13.625Z"
        fill={color}
      />
    </svg>
  );
};

export default SettingsIcon;
