import React from "react";

const ActionIcon = ({
  width = 16,
  height = 21,
  color = "black",
  opacity = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity}
        d="M12.6328 2.25781L9.625 9.28906H14C14.5078 9.28906 14.9766 9.60156 15.1719 10.0703C15.3281 10.5781 15.2109 11.125 14.8203 11.4766L4.82031 20.2266C4.35156 20.5781 3.72656 20.6172 3.25781 20.2656C2.78906 19.9531 2.59375 19.3281 2.82812 18.7812L5.83594 11.75H1.5C0.953125 11.75 0.484375 11.4375 0.328125 10.9688C0.132812 10.4609 0.25 9.91406 0.640625 9.5625L10.6406 0.8125C11.1094 0.460938 11.7344 0.421875 12.2031 0.773438C12.6719 1.08594 12.8672 1.71094 12.6328 2.25781Z"
        fill={color}
      />
    </svg>
  );
};

export default ActionIcon;
