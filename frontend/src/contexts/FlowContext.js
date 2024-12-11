import React, { createContext, useCallback, useContext, useState } from "react";
import { useEdgesState, useNodesState } from "@xyflow/react";

const FlowContext = createContext();

const initialEdges = [
  { id: "1", source: "start", target: "welcome" },
  { id: "2", source: "start", target: "fallback" },
  { id: "3", source: "start", target: "contact_us" },
  { id: "4", source: "start", target: "faq" },
];
const initTriggers = {
  start: "",
  contact_us: "",
  faq: "",
  welcome: "",
  fallback: "",
};

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [menuOpen, setMenuOpen] = useState(null);
  const [type, setType] = useState("");
  const [trigger, setTrigger] = useState(initTriggers);
  const [contents, setContents] = useState({});

  const handleRemoteNode = useCallback(
    (id) => {
      const _nodes = nodes.filter((item) => item.id !== id);
      const _edges = edges.filter(
        (item) => item.source !== id && item.target !== id,
      );
      setNodes(_nodes);
      setEdges(_edges);
      setTrigger({ ...trigger, [id]: "" });
    },
    [nodes, edges, trigger, setNodes, setEdges],
  );

  return (
    <FlowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        trigger,
        setTrigger,
        contents,
        setContents,
        menuOpen,
        setMenuOpen,
        type,
        setType,
        handleRemoteNode,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => useContext(FlowContext);
