import React from "react";

const DashboardIcon = ({
  width = 20,
  height = 20,
  color = "white",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M10.875 1.16406C10.875 0.8125 11.1094 0.5 11.5 0.5C16.3047 0.5 20.25 4.44531 20.25 9.25C20.25 9.60156 19.9375 9.875 19.5859 9.875H10.875V1.16406ZM0.25 11.125C0.25 6.39844 3.76562 2.49219 8.29688 1.86719C8.6875 1.78906 9 2.10156 9 2.45312V11.75L15.0938 17.8828C15.3672 18.1562 15.3281 18.5859 15.0547 18.7812C13.4922 19.875 11.6172 20.5 9.625 20.5C4.42969 20.5 0.25 16.3203 0.25 11.125ZM20.7969 11.75C21.1484 11.75 21.4609 12.0625 21.3828 12.4141C21.1094 14.6016 20.0547 16.5547 18.4922 18C18.2578 18.1953 17.9062 18.1953 17.6719 17.9609L11.5 11.75H20.7969Z"
        fill={color}
      />
    </svg>
  );
};

export default DashboardIcon;
