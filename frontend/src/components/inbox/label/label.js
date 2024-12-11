import React from "react";

const InboxLabel = ({
  backgroundColor = "#0066FF",
  textColor = "white",
  content = "",
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      className="rounded px-1 font-semibold text-xs"
    >
      {content}
    </div>
  );
};

export default InboxLabel;
