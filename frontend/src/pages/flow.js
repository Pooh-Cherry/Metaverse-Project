import React, { useState } from "react";
import { FlowProvider } from "@contexts/FlowContext";
import Flow from "../components/flows";
import RightChatbot from "../components/layouts/rightchatbot";

const FlowChart = () => {
  const [showChatbot, setShowChatbot] = useState(true);

  return (
    <div className="flex">
      <div className="flex flow-1 min-w-0 w-full">
        <FlowProvider>
          <Flow />
        </FlowProvider>
        {showChatbot && <RightChatbot onClose={() => setShowChatbot(false)} />}
      </div>
    </div>
  );
};

export default FlowChart;
