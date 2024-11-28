import { FlowProvider } from "@contexts/FlowContext";
import React from "react";
import Flow from "../components/flows";

const FlowChart = () => {
  return (
    <>
      <FlowProvider>
        <Flow />
      </FlowProvider>
    </>
  );
};

export default FlowChart;
